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
import QRCode from 'qrcodejs2';
import styles from './index.less';
import { formatMessage } from '@/utils';

const App: React.FC = () => {

  const qrcodeRef = useRef<HTMLDivElement>(null);
  const showRef = useRef(false);

  const content = <>
    <div className={`tx-center ${styles.qrcode}`}>
      <div ref={qrcodeRef} />
      <div className='mt12'>{formatMessage({ id: 'system.scanApp', defaultMessage: '扫码下载永泰新能源App' })}</div>
    </div>
  </>;

  const onOpenChange = (visible: boolean) => {
    if (visible && !showRef.current) {
      new QRCode(qrcodeRef.current, {
        width: 160,
        height: 160,
        text: window.location.origin + '/download/app',
      });
      showRef.current = true;
    }
  };

  return <>
    <Popover
      content={content}
      placement='bottom'
      onOpenChange={onOpenChange}
    >
      <div className='head-icon'>
        <YTAppOutlined />
      </div>
    </Popover>
  </>;
};

export default memo(App);