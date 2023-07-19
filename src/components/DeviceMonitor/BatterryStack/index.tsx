/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 21:00:58
 * @LastEditTime: 2023-07-15 10:29:28
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\BatterryStack\index.tsx
 */
import React, { useState, useCallback, useMemo } from 'react';
import { Tabs, TabsProps } from 'antd';
import { DeviceDetailType } from '../config';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceDataType } from '@/services/equipment';
import Overview from '@/components/DeviceInfo/Overview';
import StackImg from '@/assets/image/device/stack.png';
import Stack from './Stack';
import Cluster from './Cluster';
import useSubscribe from '@/pages/screen/useSubscribe';
import Page from '@/layouts/Page';

const BatterryStack: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

  const [deviceData, setDeviceData] = useState<DeviceDataType>();
  const realTimeData = useSubscribe(id, true);

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}), productImg: StackImg });
  }, []);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: '电池堆信息',
        children: <Stack id={id} data={deviceData} realTimeData={realTimeData} />,
      },
      {
        key: '2',
        label: '电池簇信息',
        children: <Cluster id={id} data={deviceData} />,
      },
    ];
  }, [id, deviceData, realTimeData]);

  return (
    <>
      <Page
        top={<Overview data={deviceData} />}
        bottom={<DeviceInfo id={id} onChange={onDataChange} />}
      >
        <Tabs items={tabItems} />
      </Page>
    </>
  );
};

export default BatterryStack;
