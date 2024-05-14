/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-14 15:53:50
 * @LastEditTime: 2024-05-14 18:00:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\VideoMonitor\helper.ts
 */

import { HkyfConfig } from '@/types';
import { isUrl } from '@/utils/reg';
import { message } from 'antd';
import { formatMessage, parseToObj } from '@/utils';
import { getAccessToken as requesttAccessToken } from './service';

const getAccessToken = (appKey?: string, secretKey?: string) => {
  const hkAccessToken = parseToObj(localStorage.getItem('hkAccessToken'));

  requesttAccessToken({
    client_id: appKey,
    client_secret: secretKey,
  }).then((res) => {
    if (res.access_token) {
      localStorage.setItem('hkAccessToken', JSON.stringify(res));
    } else {
      message.error(formatMessage({ id: 'common.1005', defaultMessage: '令牌获取失败，请重试！' }));
    }
  });
};

export const openHkyf = (config: HkyfConfig) => {
  const { SSOUrl, userId, appKey, secretKey } = config;

  const content = [];
  if (!SSOUrl) {
    content.push('SSOUrl');
  }
  if (!userId) {
    content.push(formatMessage({ id: 'siteManage.1011', defaultMessage: '用户ID' }));
  }
  if (!appKey) {
    content.push('App Key');
  }
  if (!secretKey) {
    content.push('Secret Key');
  }
  if (content.length) {
    message.error(
      formatMessage({ id: 'common.1004', defaultMessage: '请配置' }) + '：' + content.join('，'),
    );
    return;
  }
  if (!isUrl(SSOUrl)) {
    message.error(formatMessage({ id: 'common.1003', defaultMessage: 'Url格式错误' }));
    return;
  }

  getAccessToken();
};
