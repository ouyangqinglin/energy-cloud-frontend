/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 21:46:44
 * @LastEditTime: 2023-07-26 16:08:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceInfo\Overview.tsx
 */
import React from 'react';
import { useBoolean } from 'ahooks';
import { ProField } from '@ant-design/pro-components';
import { DeviceDataType } from '@/services/equipment';
import Detail from '../Detail';
import type { DetailItem } from '../Detail';
import { onlineStatus, deviceAlarmStatus } from '@/utils/dictionary';
import styles from './index.less';
import { Button } from 'antd';
import Dialog from '@/components/Dialog';
import { deviceAlarmStatusFormat, onlineStatusFormat } from '@/utils/format';

export type OverviewProps = {
  data?: DeviceDataType;
  introImg?: string;
};

const Overview: React.FC<OverviewProps> = (props) => {
  const { data, introImg } = props;

  const [openIntro, { setFalse, setTrue }] = useBoolean(false);

  const equipInfoItems: DetailItem[] = [
    {
      label: '通信',
      field: 'status',
      format: onlineStatusFormat,
    },
    {
      label: '告警',
      field: 'alarmStatus',
      format: (value) => {
        return (
          <>
            {deviceAlarmStatusFormat(value)}
            {data?.alarmCount}
          </>
        );
      },
    },
    { label: '最近上线时间', field: 'sessionStartTime' },
  ];

  return (
    <>
      <div className={`${styles.overview}`} style={{ backgroundImage: `url(${data?.productImg})` }}>
        <Detail.Label className="mb16" title={data?.name} showLine={false}>
          {introImg && (
            <Button className="pr0" type="link" onClick={setTrue}>
              产品介绍
            </Button>
          )}
        </Detail.Label>
        <Detail items={equipInfoItems} data={data} />
      </div>
      <Dialog title="产品介绍" open={openIntro} onCancel={setFalse} footer={null}>
        <img className="w-full" src={introImg} />
      </Dialog>
    </>
  );
};

export default Overview;
