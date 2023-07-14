/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-07-14 15:04:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\EnergyConverter\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceInfoType } from '@/components/DeviceInfo/type';
import { getChildEquipment } from '@/services/equipment';
import useSubscribe from '@/pages/screen/useSubscribe';
import AirImg from '@/assets/image/device/air.png';
import Detail from '@/components/Detail';
import Label from '@/components/DeviceInfo/Label';
import { controlItems, statusItems } from './config';

const Air: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

  const [equipmentIds, setEquipmentIds] = useState<string[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceInfoType>();
  const realTimeData = useSubscribe(equipmentIds, true);

  const onDataChange = useCallback((value: DeviceInfoType) => {
    setDeviceData({ ...(value || {}), productImg: AirImg });
    getChildEquipment({ parentId: value?.deviceId }).then(({ data }) => {
      setEquipmentIds(data?.map?.((item: DeviceInfoType) => item?.deviceId) || []);
    });
  }, []);

  return (
    <>
      <div className="card-wrap">
        <Overview data={deviceData} />
      </div>
      <div className="card-wrap p24 my24">
        <Label title="控制信息" />
        <Detail items={controlItems} data={realTimeData} />
        <Label title="状态信息" />
        <Detail items={statusItems} data={realTimeData} />
      </div>
      <div className="card-wrap p24">
        <DeviceInfo id={id} onChange={onDataChange} />
      </div>
    </>
  );
};

export default Air;
