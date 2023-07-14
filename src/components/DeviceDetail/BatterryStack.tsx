/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 21:00:58
 * @LastEditTime: 2023-07-14 11:53:53
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
import { getChildEquipment } from '@/services/equipment';
import useSubscribe from '@/pages/screen/useSubscribe';

const BatterryStack: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

  const [equipmentIds, setEquipmentIds] = useState<string[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceInfoType>();
  const realTimeData = useSubscribe(equipmentIds, true);

  const onDataChange = useCallback((value: DeviceInfoType) => {
    setDeviceData({ ...(value || {}), productImg: StackImg });
    getChildEquipment({ parentId: value?.deviceId }).then(({ data }) => {
      setEquipmentIds(data?.map?.((item: DeviceInfoType) => item?.deviceId) || []);
    });
  }, []);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: '电池堆信息',
        children: <Stack realTimeData={realTimeData} />,
      },
      {
        key: '2',
        label: '电池簇信息',
        children: <Cluster data={deviceData} realTimeData={realTimeData} />,
      },
    ];
  }, [realTimeData]);

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
