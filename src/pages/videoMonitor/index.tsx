/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-15 11:01:38
 * @LastEditTime: 2024-05-16 09:23:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\videoMonitor\index.tsx
 */

import React, { memo, useEffect, useRef } from 'react';
import styles from './index.less';
import { formatMessage, parseToObj } from '@/utils';
import { getVideoMonitorData, getVideoMonitorToken } from '@/services/station';
import { useRequest } from 'umi';
import { useLocation } from '@/hooks';
import { VideoFactoryEnum } from '@/utils/dictionary';
import { message, Spin } from 'antd';
import { HkyfConfig } from '@/types';

const VideoMonitor: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const location = useLocation<{ id: number }>();
  const { run, loading } = useRequest(getVideoMonitorData, {
    manual: true,
  });
  const { run: runGetToken, loading: loadingGetToken } = useRequest(getVideoMonitorToken, {
    manual: true,
  });

  useEffect(() => {
    if (location.query?.id) {
      run({ siteId: location.query?.id }).then((data) => {
        if (data.monitorStatus == '1') {
          if (data.jumpMethod == '1') {
            if (data?.factoryId) {
              runGetToken({ factoryId: data.factoryId }).then((tokenData) => {
                if (tokenData.authorization) {
                  if (data?.code == VideoFactoryEnum.HKYF) {
                    const config: HkyfConfig = parseToObj(data?.config || '');
                    const { SSOUrl, productCode, path } = config;

                    const content = [];
                    if (!SSOUrl) {
                      content.push('SSOUrl');
                    }
                    if (!productCode) {
                      content.push(
                        formatMessage({ id: 'siteManage.1013', defaultMessage: '项目编码' }),
                      );
                    }
                    if (!path) {
                      content.push(
                        formatMessage({ id: 'siteManage.1014', defaultMessage: '路由' }),
                      );
                    }
                    if (content.length) {
                      message.error(
                        formatMessage({ id: 'common.1004', defaultMessage: '请配置' }) +
                          '：' +
                          content.join('，'),
                      );
                      return;
                    }

                    if (iframeRef.current && SSOUrl && productCode && path) {
                      iframeRef.current.src = SSOUrl;
                      iframeRef.current.onload = () => {
                        const urlLocation = new URL(SSOUrl || '');
                        iframeRef.current?.contentWindow?.postMessage(
                          {
                            type: 'settings',
                            data: {
                              token: tokenData.authorization,
                              path,
                              loginUrl: window.location.origin + '/user/login',
                              crumbs: [
                                formatMessage({
                                  id: 'menu.siteMonitor.overview',
                                  defaultMessage: '站点概览',
                                }),
                                formatMessage({
                                  id: 'videoMonitor.1002',
                                  defaultMessage: '站点概览',
                                }),
                              ],
                              productCode,
                              // showMenu: true,
                            },
                          },
                          urlLocation.origin,
                        );
                      };
                    }
                  } else {
                    message.error(
                      formatMessage({
                        id: 'videoMonitor.1001',
                        defaultMessage: '厂家暂未对接，请检查配置！',
                      }),
                    );
                  }
                } else {
                  message.error(
                    formatMessage({
                      id: 'common.1005',
                      defaultMessage: '令牌获取失败，请重试！',
                    }),
                  );
                }
              });
            } else {
              message.error(
                formatMessage({
                  id: 'videoMonitor.1001',
                  defaultMessage: '厂家暂未对接，请检查配置！',
                }),
              );
            }
          } else {
            window.location.href = data.url || '';
          }
        } else {
          message.error(
            formatMessage({
              id: 'videoMonitor.1001',
              defaultMessage: '视频监控未启用',
            }),
          );
        }
      });
    }
  }, [location.query?.id]);

  return (
    <>
      <div className={styles.container}>
        <iframe ref={iframeRef} className={styles.iframe} frameBorder="0" allowFullScreen={true} />
        {(loading || loadingGetToken) && (
          <div className={styles.loading}>
            <Spin size="large" />
          </div>
        )}
      </div>
    </>
  );
};

export default memo(VideoMonitor);
