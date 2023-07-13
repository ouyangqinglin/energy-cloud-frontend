/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 21:46:44
 * @LastEditTime: 2023-07-13 22:07:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceInfo\Overview.tsx
 */
import React from 'react';
import { DeviceInfoType } from './type';
import Detail from '../Detail';
import type { DetailItem } from '../Detail';
import { onlineFormat } from '@/utils/format';
import styles from './index.less';

export type OverviewProps = {
  data?: DeviceInfoType;
};

const Overview: React.FC<OverviewProps> = (props) => {
  const { data } = props;

  const equipInfoItems: DetailItem[] = [
    { label: '通信', field: 'status', format: onlineFormat },
    { label: 'alarm', field: 'a' },
    { label: '最近上线时间', field: 'sessionStartTime' },
  ];

  return (
    <>
      <div className={styles.overview}>
        <label className={`${styles.title} mb16`}>{data?.name}</label>
        <Detail items={equipInfoItems} data={data} />
      </div>
    </>
  );
};

export default Overview;
