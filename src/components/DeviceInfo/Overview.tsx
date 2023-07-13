/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 21:46:44
 * @LastEditTime: 2023-07-13 23:53:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceInfo\Overview.tsx
 */
import React from 'react';
import { ProField } from '@ant-design/pro-components';
import { DeviceInfoType } from './type';
import Detail from '../Detail';
import type { DetailItem } from '../Detail';
import { onlineStatus } from '@/utils/dictionary';
import styles from './index.less';

export type OverviewProps = {
  data?: DeviceInfoType;
};

const Overview: React.FC<OverviewProps> = (props) => {
  const { data } = props;

  const equipInfoItems: DetailItem[] = [
    {
      label: '通信',
      field: 'status',
      format: (value) => <ProField text={value} mode="read" valueEnum={onlineStatus} />,
    },
    { label: '告警', field: 'a' },
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
