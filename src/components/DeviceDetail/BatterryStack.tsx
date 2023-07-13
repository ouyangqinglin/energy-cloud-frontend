/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 21:00:58
 * @LastEditTime: 2023-07-13 21:00:59
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\BatterryStack.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from './config';
import DeviceInfo from '@/components/DeviceInfo';
import type { DeviceType } from '@/components/EquipInfo/type';

const BatterryStack: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

  const [deviceData, setDeviceData] = useState<DeviceType>();

  const onDataChange = useCallback((data) => {
    setDeviceData(data);
  }, []);

  return (
    <>
      <div className="card-wrap"></div>
      <div className="card-wrap">
        <DeviceInfo id={id} onChange={onDataChange} />
      </div>
    </>
  );
};

export default BatterryStack;
