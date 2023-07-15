/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:43:38
 * @LastEditTime: 2023-07-14 14:43:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Ems\index.tsx
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Tabs, TabsProps } from 'antd';
import { DeviceDetailType } from '../config';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceDataType } from '@/services/equipment';
import Overview from '@/components/DeviceInfo/Overview';
import StackImg from '@/assets/image/device/stack.png';
import Run from './Run';
import { getChildEquipment } from '@/services/equipment';
import useSubscribe from '@/pages/screen/useSubscribe';
import Setting from '@/components/ScreenDialog/EnergyDialog/setting';

const Ems: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

  const [equipmentIds, setEquipmentIds] = useState<string[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceDataType>();
  const realTimeData = useSubscribe(equipmentIds, true);

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}), productImg: StackImg });
    getChildEquipment({ parentId: value?.deviceId }).then(({ data }) => {
      setEquipmentIds(data?.map?.((item: DeviceDataType) => item?.deviceId) || []);
    });
  }, []);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: '运行数据',
        children: <Run id={id} realTimeData={realTimeData} />,
      },
      {
        key: '2',
        label: '远程控制',
        children: <Setting id={id} settingData={realTimeData} isLineLabel showBattery={false} />,
      },
    ];
  }, [realTimeData]);

  return (
    <>
      <div className="card-wrap">
        <Overview data={deviceData} />
      </div>
      <div className="card-wrap px24 pb24 my24">
        <Tabs items={tabItems} />
      </div>
      <div className="card-wrap p24">
        <DeviceInfo id={id} onChange={onDataChange} />
      </div>
    </>
  );
};

export default Ems;
