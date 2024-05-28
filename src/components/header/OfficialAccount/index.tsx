/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-04-01 14:40:45
 * @LastEditTime: 2024-04-01 16:16:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\header\App\index.tsx
 */

import { YTOfficialAccount } from '@/components/YTIcons';
import { Popover } from 'antd';
import React, { memo, useRef } from 'react';
import styles from './index.less';
import { formatMessage } from '@/utils';
import account_code from '@/assets/image/account_code.png';
import { useModel } from 'umi';

const OfficialAccount: React.FC = () => {
  const showRef = useRef(false);
  const { initialState } = useModel('@@initialState');
  const appDownloadQr = initialState?.currentUser?.systemInfo?.officialAccountsQr || account_code;

  const content = (
    <>
      <div className={`tx-center ${styles.qrcode}`}>
        <img src={appDownloadQr} className={styles.qrcodeImg} />
        <div className="mt12">
          {formatMessage({ id: 'system.scanOfficialAccount', defaultMessage: '扫码关注公众号' })}
        </div>
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
          <YTOfficialAccount />
        </div>
      </Popover>
    </>
  );
};

export default memo(OfficialAccount);
