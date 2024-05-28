/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-04-01 14:40:45
 * @LastEditTime: 2024-04-01 16:16:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\header\App\index.tsx
 */

import { YTAppOutlined } from '@/components/YTIcons';
import { Popover } from 'antd';
import React, { memo, useRef } from 'react';
import styles from './index.less';
import { formatMessage } from '@/utils';
import app_code from '@/assets/image/app_code.png';
type AppProps = {
  systemInfo: any;
};
const App: React.FC<AppProps> = (props) => {
  const { systemInfo } = props;
  const showRef = useRef(false);
  const appDownloadQr = systemInfo.appDownloadQr || app_code;
  const appDownloadDesc =
    systemInfo.appDownloadDesc ||
    formatMessage({ id: 'system.scanApp', defaultMessage: '扫码下载E智慧能源App' });

  const content = (
    <>
      <div className={`tx-center ${styles.qrcode}`}>
        <img src={appDownloadQr} className={styles.qrcodeImg} />
        <div className="mt12">{appDownloadDesc}</div>
      </div>
    </>
  );

  const onOpenChange = (visible: boolean) => {
    if (visible && !showRef.current) {
      showRef.current = true;
    }
  };

  return (
    <>
      <Popover content={content} placement="bottom" onOpenChange={onOpenChange}>
        <div className="head-icon">
          <YTAppOutlined />
        </div>
      </Popover>
    </>
  );
};

export default memo(App);
