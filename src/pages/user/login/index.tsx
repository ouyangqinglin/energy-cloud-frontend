import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message, Row } from 'antd';
import React, { useState } from 'react';
import { ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/login';
import YtIcon from '@/assets/image/icon-yt.png';

import styles from './index.less';
import { clearSessionToken, setSessionToken } from '@/access';
import { MenuEnum } from './type';

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

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<any>({});
  const [type, setType] = useState<string>('account');
  const { refresh } = useModel('@@initialState');

  const [captchaCode, setCaptchaCode] = useState<string>('');
  const [uuid, setUuid] = useState<string>('');

  const intl = useIntl();

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const {
        code,
        data: {
          access_token: accessToken,
          homeMenu: { menu = MenuEnum.STATION_LIST, siteId = '1' } = {},
        },
        msg,
      } = await login({ ...values, uuid });
      if (code === 200) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        const current = new Date();
        const expireTime = current.setTime(current.getTime() + 1000 * 12 * 60 * 60);

        // TODO: 定制化开发，后续移除
        setSessionToken(accessToken, accessToken, expireTime, String(siteId));
        message.success(defaultLoginSuccessMessage);

        // const { query } = history.location;
        // const { redirect } = query as { redirect: string };
        // TODO: 定制化开发，后续移除
        let redirectPath = '/';
        if (menu === MenuEnum.SCREEN) {
          redirectPath = '/screen';
        }
        history.push({
          pathname: redirectPath,
          query: {
            siteId: String(siteId),
          },
        });

        refresh();
        return;
      } else {
        console.log('login failed');
        clearSessionToken();
        // 如果失败去设置用户错误信息
        setUserLoginState({ status: 'error', type: 'account', massage: msg });
        message.error(msg);
      }
    } catch (error) {
      clearSessionToken();
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType, massage } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={YtIcon} />}
          title="永泰光储充运营维护管理系统"
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
                  defaultMessage: '用户名',
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
                  defaultMessage: '密码',
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
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default Login;
