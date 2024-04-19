/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-05 09:11:33
 * @LastEditTime: 2024-04-19 11:48:17
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\Entity\ChargeMaster\index.tsx
 */

import React from 'react';
import { EntityType } from '../../type';
import Model from '../../Model';
import { ConfigType } from '../../type';
import { formatMessage } from '@/utils';
import { DeviceProductTypeEnum } from '@/utils/dictionary';
import ChargeImg from '@/assets/image/station/charge-master/charge.png';
import EnvironmentImg from '@/assets/image/station/charge-2gun/environment.png';
import EnvironmentLineImg from '@/assets/image/station/charge-master/environment-line.png';
import PowerImg from '@/assets/image/station/charge-2gun/power.png';
import PowerLineImg from '@/assets/image/station/charge-master/power-line.png';

const configs: ConfigType[] = [
  {
    label: formatMessage({
      id: 'device.chargingModuleInformation',
      defaultMessage: '充电模块信息',
    }),
    productTypeId: DeviceProductTypeEnum.ChargeMaster,
    position: { top: 70, left: 71 },
    icon: EnvironmentImg,
    line: EnvironmentLineImg,
    linePosition: { top: 22, left: 110 },
    data: [],
  },
  {
    label: formatMessage({
      id: 'device.powerDistributionUnitInformation',
      defaultMessage: '功率分配单元信息',
    }),
    productTypeId: DeviceProductTypeEnum.ChargeMaster,
    position: { top: 180, left: 71 },
    icon: EnvironmentImg,
    line: EnvironmentLineImg,
    linePosition: { top: 22, left: 110 },
    data: [],
  },
  {
    label: formatMessage({ id: 'device.hostStatusInformation', defaultMessage: '主机状态信息' }),
    productTypeId: DeviceProductTypeEnum.ChargeMaster,
    position: { top: 60, left: 712 },
    icon: PowerImg,
    line: PowerLineImg,
    linePosition: { top: 22, left: -149 },
    data: [
      { field: 'mworkMode' },
      { field: 'mWorkStatus' },
      { field: 'malarmStatus' },
      { field: 'mt1' },
      { field: 'mt2' },
      { field: 'mh' },
      { field: 'Pa' },
      { field: 'Pb' },
      { field: 'Pc' },
      { field: 'Ptotal' },
    ],
  },
];

const ChargeMaster: React.FC<EntityType> = (props) => {
  const { ...restProps } = props;

  return (
    <>
      <Model
        modelStyle={{
          height: '300px',
          backgroundImage: `url(${ChargeImg})`,
          backgroundSize: '22%',
        }}
        configs={configs}
        {...restProps}
      ></Model>
    </>
  );
};

export default ChargeMaster;
