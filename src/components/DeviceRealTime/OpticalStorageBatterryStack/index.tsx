/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:22:35
 * @LastEditTime: 2023-09-11 14:22:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\BatterryStack\index.tsx
 */
import React, { useMemo } from 'react';
import { DeviceRealTimeType } from '../config';
import { Tabs, TabsProps } from 'antd';
import Stack from './Stack';
import Cluster from './Cluster';
import { OnlineStatusEnum } from '@/utils/dictionary';
import { useSubscribe } from '@/hooks';
import { isEmpty } from '@/utils';

const BatterryStack: React.FC<DeviceRealTimeType> = (props) => {
  const { id, productId, deviceData } = props;

  const openSubscribe = useMemo(
    () => !isEmpty(deviceData?.status) && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const realTimeData = useSubscribe(id, openSubscribe);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: '电池堆信息',
        children: (
          <Stack id={id} productId={productId} data={deviceData} realTimeData={realTimeData} />
        ),
      },
      {
        key: '2',
        label: '电池簇信息',
        children: <Cluster id={id} productId={productId} data={deviceData} />,
      },
    ];
  }, [id, deviceData, realTimeData]);

  return (
    <>
      <Tabs items={tabItems} />
    </>
  );
};

export default BatterryStack;
