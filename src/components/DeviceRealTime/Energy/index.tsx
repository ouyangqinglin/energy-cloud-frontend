/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:47:38
 * @LastEditTime: 2024-01-06 10:31:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Energy\index.tsx
 */
import React from 'react';
import { DeviceRealTimeType } from '../config';
import EnergyInfo from '@/components/EnergyInfo';

const Energy: React.FC<Omit<DeviceRealTimeType, 'id' | 'productId'>> = (props) => {
  const { deviceData } = props;

  return (
    <>
      <EnergyInfo deviceData={deviceData} />
    </>
  );
};

export default Energy;
