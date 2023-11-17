/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-16 11:14:24
 * @LastEditTime: 2023-11-16 11:46:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\PvEnergy\index.tsx
 */

import React, { useEffect } from 'react';
import { DeviceRealTimeType } from '../config';
import PvEnergyMachine from '@/components/Device/PvEnergyMachine';
import { useRequest, useModel } from 'umi';
import { getGroupList } from '../../../pages/site-monitor/Energy/service';

const PvEnergy: React.FC<Omit<DeviceRealTimeType, 'id' | 'productId'>> = (props) => {
  const { deviceData } = props;

  return (
    <>
      <PvEnergyMachine deviceData={deviceData} />
    </>
  );
};

export default PvEnergy;
