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
import ConverterImg from '@/assets/image/device/converter.png';
import Detail from '@/components/Detail';
import Label from '@/components/DeviceInfo/Label';
import { runItems, exchargeItems, directCurrentItems, tempItems, versionItems } from './config';

const EnergyConverter: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

  const [equipmentIds, setEquipmentIds] = useState<string[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceInfoType>();
  const realTimeData = useSubscribe(equipmentIds, true);

  const onDataChange = useCallback((value: DeviceInfoType) => {
    setDeviceData({ ...(value || {}), productImg: ConverterImg });
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
        <Label title="运行状态" />
        <Detail items={runItems} data={realTimeData} />
        <Label title="交流侧信息" />
        <Detail items={exchargeItems} data={realTimeData} />
        <Label title="直流侧信息" />
        <Detail items={directCurrentItems} data={realTimeData} />
        <Label title="温度信息" />
        <Detail items={tempItems} data={realTimeData} />
        <Label title="版本信息" />
        <Detail items={versionItems} data={realTimeData} />
      </div>
      <div className="card-wrap p24">
        <DeviceInfo id={id} onChange={onDataChange} />
      </div>
    </>
  );
};

export default EnergyConverter;
