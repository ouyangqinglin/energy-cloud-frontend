import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message, Row } from 'antd';
import React, { useState } from 'react';
import { ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang, useModel, useAliveController } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/login';
import BGImg from '@/assets/image/login-bg.png';
import styles from './index.less';
import { clearSessionToken, setSessionToken } from '@/access';
import { useLocation } from '@/hooks';
import request from '@/utils/request';
//import { getRoutersInfo } from '@/services/session';
import { getLocaleMenus, getMenus, initLocale } from '@/utils';

export type QueryParams = {
  redirect?: string;
  lang?: string;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
//获取用户权限列表
const getRoutersList = () => {
  return request('/system/menu/getRouters', {
    method: 'GET',
  });
};
const Login: React.FC = () => {
  const location = useLocation<QueryParams>();

  if (location?.query?.lang) {
    initLocale(location?.query?.lang);
  }

  const [userLoginState, setUserLoginState] = useState<any>({});
  const [type, setType] = useState<string>('account');
  const { initialState, refresh } = useModel('@@initialState');
  const { clear } = useAliveController();

  const [uuid, setUuid] = useState<string>('');

  const intl = useIntl();

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const {
        code,
        data: { access_token: accessToken, homePath = '' },
        msg,
      } = await login({ ...values, uuid });
      if (code === 200) {
        localStorage.removeItem('siteId');
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        const current = new Date();
        const expireTime = current.setTime(current.getTime() + 1000 * 12 * 60 * 60);

        setSessionToken(accessToken, accessToken, expireTime);
        message.success(defaultLoginSuccessMessage);

        let redirectPath =
          homePath || location.query?.redirect || '/site-monitor' || '/index/station';
        const routesList = await getRoutersList();
        const resList = routesList.data;
        const menus = getLocaleMenus(resList);
        const antMenus = menus && getMenus(menus);
        const hasRedirectPath = antMenus.some((item) => item.key == redirectPath);
        if (!hasRedirectPath) {
          redirectPath = antMenus?.[0]?.key || '/index';
        }

        const pathArr = redirectPath.split('?');
        await clear();
        history.push({
          pathname: pathArr[0],
          search: pathArr[1] ? '?' + pathArr[1] : '',
        });
        refresh();
        return;
      } else {
        clearSessionToken();
        // 如果失败去设置用户错误信息
        setUserLoginState({ status: 'error', type: 'account', massage: msg });
      }
    } catch (error) {
      clearSessionToken();
    }
  };
  const { status, type: loginType, massage } = userLoginState;

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${BGImg})` }}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={
            initialState?.currentUser?.systemInfo?.icon ? (
              <img alt="logo" src={initialState?.currentUser?.systemInfo?.icon} />
            ) : (
              ''
            )
          }
          title={initialState?.currentUser?.systemInfo?.title}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {status === 'error' && loginType === 'account' && <LoginMessage content={massage} />}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '请输入用户名',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '请输入密码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
              <Row />
            </>
          )}

          {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="mobile"
                placeholder={intl.formatMessage({
                  id: 'pages.login.phoneNumber.placeholder',
                  defaultMessage: '手机号',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.required"
                        defaultMessage="请输入手机号！"
                      />
                    ),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.invalid"
                        defaultMessage="手机号格式错误！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="记住密码" />
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default Login;
