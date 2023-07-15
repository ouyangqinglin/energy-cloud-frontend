/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 21:46:44
 * @LastEditTime: 2023-07-15 10:06:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceInfo\Overview.tsx
 */
import React from 'react';
import { ProField } from '@ant-design/pro-components';
import { DeviceDataType } from '@/services/equipment';
import Detail from '../Detail';
import type { DetailItem } from '../Detail';
import { onlineStatus, deviceAlarmStatus } from '@/utils/dictionary';
import styles from './index.less';

export type OverviewProps = {
  data?: DeviceDataType;
};

const Overview: React.FC<OverviewProps> = (props) => {
  const { data } = props;

  const equipInfoItems: DetailItem[] = [
    {
      label: '通信',
      field: 'status',
      format: (value) => <ProField text={value} mode="read" valueEnum={onlineStatus} />,
    },
    {
      label: '告警',
      field: 'alarmStatus',
      format: (value) => (
        <>
          <ProField text={value} mode="read" valueEnum={deviceAlarmStatus} /> {data?.alarmCount}
        </>
      ),
    },
    { label: '最近上线时间', field: 'sessionStartTime' },
  ];

  return (
    <>
      <div
        className={`p24 ${styles.overview}`}
        style={{ backgroundImage: `url(${data?.productImg})` }}
      >
        <div className={`${styles.title} mb16`}>{data?.name}</div>
        <Detail items={equipInfoItems} data={data} />
      </div>
    </>
  );
};

export default Overview;
