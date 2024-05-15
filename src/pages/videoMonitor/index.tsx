/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-15 11:01:38
 * @LastEditTime: 2024-05-15 16:01:03
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\videoMonitor\index.tsx
 */

import React, { memo, useEffect, useRef } from 'react';
import styles from './index.less';
import { formatMessage, parseToObj } from '@/utils';
import { getVideoMonitorData } from '@/services/station';
import { useRequest } from 'umi';
import { useLocation } from '@/hooks';
import { VideoFactoryEnum } from '@/utils/dictionary';
import { message } from 'antd';
import { HkyfConfig } from '@/types';

const VideoMonitor: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const location = useLocation<{ id: number }>();
  const { run } = useRequest(getVideoMonitorData, {
    manual: true,
  });

  useEffect(() => {
    if (location.query?.id) {
      run({ siteId: location.query?.id }).then((data) => {
        if (data?.code == VideoFactoryEnum.HKYF) {
          const config: HkyfConfig = parseToObj(data?.config || '');
          const { SSOUrl, productCode, path } = config;

          const content = [];
          if (!SSOUrl) {
            content.push('SSOUrl');
          }
          if (!productCode) {
            content.push(formatMessage({ id: 'siteManage.1013', defaultMessage: '项目编码' }));
          }
          if (!path) {
            content.push(formatMessage({ id: 'siteManage.1014', defaultMessage: '路由' }));
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
                    token:
                      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBdXRob3JpemF0aW9uIiwicGF5bG9hZCI6IntcImRlcGFydG1lbnRJZFwiOjIxODM5ODA5MTk0NjQsXCJleHBpcmVkXCI6MzAsXCJwcm9kdWN0Q29kZVwiOlwiZ2hkMlwiLFwicHJvamVjdElkXCI6ODIzNTUwMDI4NDU2LFwidGltZVwiOlwiMTcxNTc2MDIxOTI3NFwiLFwidHlwZVwiOjEsXCJ1c2VySWRcIjoxNzk3NDMzODYyODI0LFwidXNlck5hbWVcIjpcImxoMDUwOTM3N1wiLFwidXNlclR5cGVcIjowfSJ9.Ib0JLO3oK6BdnAIdzOKf5hlaeqoze3Mg0zUQI_BuB3il6d9b9-qlx857LzXeMy6uzRuBlILOG9mNRMAU3dAyVg',
                    path,
                    loginUrl: window.location.origin + '/user/login',
                    crumbs: [
                      formatMessage({
                        id: 'menu.siteMonitor.overview',
                        defaultMessage: '站点概览',
                      }),
                      formatMessage({ id: 'videoMonitor.1002', defaultMessage: '站点概览' }),
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
      });
    }
  }, [location.query?.id]);

  return (
    <>
      <div className={styles.container}>
        <iframe ref={iframeRef} className={styles.iframe} frameBorder="0" allowFullScreen={true} />
      </div>
    </>
  );
};

export default memo(VideoMonitor);
