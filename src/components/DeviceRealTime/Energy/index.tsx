/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:47:38
 * @LastEditTime: 2023-09-11 16:56:57
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Energy\index.tsx
 */
import React, { useEffect } from 'react';
import { DeviceRealTimeType } from '../config';
import EnergyInfo from '@/components/EnergyInfo';

const Energy: React.FC<Omit<DeviceRealTimeType, 'id' | 'productId'>> = (props) => {
  const { deviceData } = props;

  return (
    <>
      <div className="p24">
        <EnergyInfo deviceData={deviceData} />
      </div>
    </>
  );
};

export default Energy;
