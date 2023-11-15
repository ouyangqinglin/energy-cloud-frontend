/* eslint-disable @typescript-eslint/dot-notation */
/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import type {
  RequestOptionsInit,
  RequestMethod,
  ExtendOptionsWithoutResponse,
  ExtendOptionsWithResponse,
  ExtendOptionsInit,
  RequestOptionsWithResponse,
  RequestOptionsWithoutResponse,
  RequestResponse,
} from 'umi-request';
import { extend } from 'umi-request';
import { history } from 'umi';
import { message, notification } from 'antd';
import type { RequestData } from '@ant-design/pro-table';
import { clearSessionToken, getAccessToken, getRefreshToken, getTokenExpireTime } from '../access';
import { LoginPageUrl } from './utils';
import defaultSettings from '../../config/defaultSettings';
import { isEmpty } from 'lodash';
import { RequestCode } from './dictionary';
import { stringify } from 'querystring';

const codeMessage: Record<number, string> = {
  10000: '系统未知错误，请反馈给管理员',
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/** 异常处理程序 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

// 更换令牌的时间区间
const checkRegion = 5 * 60 * 1000;

export interface Init {
  (options: ExtendOptionsWithoutResponse | ExtendOptionsWithResponse | ExtendOptionsInit): void;
}

export type ResponsePageData<T> = {
  code: string;
  data: {
    list: T[];
    total: number;
  };
  msg: string;
};

export type ResponseCommonData<T> = {
  code: string;
  data: T;
  msg: string;
};

export type InferResponseData<T, U = 'common'> = U extends 'common'
  ? ResponseCommonData<T>
  : ResponsePageData<T>;

export type ResponsePromise<T = any, U = any> = Promise<T> & {
  tableThen?: () => Promise<RequestData<U>>;
};

export type CustomRequestOptions = {
  showMessage?: boolean;
};

export type RequestOptions = RequestOptionsInit & CustomRequestOptions;

interface HttpRequestType<R = false> {
  request: {
    <T = any>(url: string, options: RequestOptionsWithResponse): ResponsePromise<
      RequestResponse<T>
    >;
    <T = any>(url: string, options: RequestOptionsWithoutResponse): ResponsePromise<T>;
    <T = any>(url: string, options?: RequestOptionsInit): R extends true
      ? ResponsePromise<RequestResponse<T>>
      : ResponsePromise<T>;
  };
}

export class HttpRequest implements HttpRequestType {
  instance: RequestMethod<false> = extend({});

  init(option?: ExtendOptionsWithoutResponse | ExtendOptionsWithResponse | ExtendOptionsInit) {
    this.instance = extend({
      errorHandler, // 默认错误处理
      credentials: 'include', // 默认请求是否带上cookie
      prefix: defaultSettings.apiBasePath,
      ...(option || {}),
    });

    this.instance.interceptors.request.use((url, options) => {
      const headers = options.headers ? options.headers : [];
      headers['Accept-Language'] = localStorage.getItem('umi_locale');
      if (headers['Authorization'] === '' || headers['Authorization'] == null) {
        const expireTime = getTokenExpireTime();
        if (expireTime) {
          const left = Number(expireTime) - new Date().getTime();
          const refreshToken = getRefreshToken();
          if (left < checkRegion && refreshToken) {
            if (left < 0) {
              clearSessionToken();
              history.push(LoginPageUrl);
            }
          } else {
            const accessToken = getAccessToken();
            if (accessToken) {
              headers['Authorization'] = `Bearer ${accessToken}`;
            }
          }
        } else {
          clearSessionToken();
          history.push(LoginPageUrl);
          return {
            url: undefined,
            options: undefined,
          };
        }
        return {
          url,
          options: { ...options, headers },
        };
      } else {
        return {
          url,
          options,
        };
      }
    });

    // 响应拦截器
    this.instance.interceptors.response.use(async (response: Response, options: RequestOptions) => {
      const { status } = response;
      if (status === 200) {
        const contentType = response.headers.get('content-type');
        const isJson = contentType?.includes('application/json');
        if (isJson === true) {
          const resp = response.clone();
          const data = await resp.json();
          if (data) {
            const { code } = data;
            if (code && code !== 200) {
              if ([RequestCode.NoToken, RequestCode.TokenExpire].includes(code)) {
                const { query = {}, pathname } = history.location;
                if (pathname != LoginPageUrl) {
                  history.push({
                    pathname: LoginPageUrl,
                    search: stringify({
                      redirect: pathname + '?' + stringify(query),
                    }),
                  });
                }
              } else if (options.showMessage !== false) {
                const msg = data.msg || codeMessage[code] || codeMessage[10000];
                message.warn(`${code} ${msg}`);
              }
            }
          }
        }
      } else {
        if (options.showMessage !== false) {
          if (status !== 404) {
            const msg = codeMessage[status] || codeMessage[10000];
            message.warn(`${status} ${msg}`);
          }
        }
      }
      return response;
    });
  }

  request<T = any, U = any>(
    url: string,
    options?: (ExtendOptionsWithoutResponse | ExtendOptionsWithResponse | ExtendOptionsInit) &
      CustomRequestOptions,
  ) {
    const result = this?.instance?.<T>(url, options);
    if (result) {
      result['tableThen'] = () => {
        return result.then(({ data }: any) => {
          return {
            data: data?.list,
            total: data?.total,
            success: true,
          };
        });
      };
    }
    return result as ResponsePromise<T, U>;
  }
}

const httpRequest = new HttpRequest();
httpRequest.init();

export const get = <R, U = 'common'>(
  url: string,
  params?: object | URLSearchParams,
  options?: RequestOptionsInit,
) => {
  const composeOptions = isEmpty(params)
    ? options
    : {
        options,
        ...{ params },
      };
  return httpRequest?.instance?.get?.<InferResponseData<R, U>>(url, composeOptions);
};

export const del = <R = any, U = 'common'>(
  url: string,
  data?: any,
  options?: RequestOptionsInit,
) => {
  const composeOptions = isEmpty(data)
    ? options
    : {
        options,
        ...{ data },
      };
  return httpRequest?.instance?.delete?.<InferResponseData<R, U>>(url, composeOptions);
};

export const put = <R = any, U = 'common'>(
  url: string,
  data?: any,
  options?: RequestOptionsInit,
) => {
  const composeOptions = isEmpty(data)
    ? options
    : {
        options,
        ...{ data },
      };
  return httpRequest?.instance?.put?.<InferResponseData<R, U>>(url, composeOptions);
};

export const post = <R = any, U = 'common'>(
  url: string,
  data?: any,
  options?: RequestOptionsInit,
) => {
  const composeOptions = isEmpty(data)
    ? options
    : {
        options,
        ...{ data },
      };
  return httpRequest?.instance?.post?.<InferResponseData<R, U>>(url, composeOptions);
};

const request: HttpRequest['request'] = <T, U>(
  url: string,
  options?: (ExtendOptionsWithoutResponse | ExtendOptionsWithResponse | ExtendOptionsInit) &
    CustomRequestOptions,
) => httpRequest.request<T, U>(url, options);

export const DEFAULT_REQUEST_INTERVAL = 5 * 60 * 1000;

export default request;
