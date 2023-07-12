// @ts-ignore
/* eslint-disable */
// API 更新时间：
// API 唯一标识：
import * as api from './api';
import * as login from './session';
import { ResponseCommonData, ResponsePageData } from '@/utils/request';

export const requestEmptyPage = <ResponseData = Record<string, any>>(): Promise<
  ResponsePageData<ResponseData>
> => {
  return Promise.resolve({
    code: '200',
    data: {
      list: [],
      total: 0,
    },
    msg: '',
  });
};

export const requestEmpty = <ResponseData = Record<string, any>>(): Promise<
  ResponseCommonData<ResponseData>
> => {
  return Promise.resolve({
    code: '200',
    data: {} as any,
    msg: '',
  });
};

export { api };

export default {
  api,
  login,
};
