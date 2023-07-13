/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 21:00:58
 * @LastEditTime: 2023-07-14 00:53:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\BatterryStack.tsx
 */
import React, { useState, useCallback, useMemo } from 'react';
import { Tabs, TabsProps } from 'antd';
import { DeviceDetailType } from './config';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceInfoType } from '@/components/DeviceInfo/type';
import Overview from '@/components/DeviceInfo/Overview';
import StackImg from '@/assets/image/device/stack.png';
import Stack from './components/Stack';
import Cluster from './components/Cluster';

const BatterryStack: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

  const [deviceData, setDeviceData] = useState<DeviceInfoType>();

  const onDataChange = useCallback((data) => {
    setDeviceData({ ...(data || {}), productImg: StackImg });
  }, []);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: '电池堆信息',
        children: <Stack data={deviceData} />,
      },
      {
        key: '2',
        label: '电池簇信息',
        children: <Cluster />,
      },
    ];
  }, []);

  return (
    <>
      <div className="card-wrap">
        <Overview data={deviceData} />
      </div>
      <div className="card-wrap p24 my24">
        <Tabs items={tabItems} />
      </div>
      <div className="card-wrap p24">
        <DeviceInfo id={id} onChange={onDataChange} />
      </div>
    </>
  );
};

export default BatterryStack;
