/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-05 09:11:33
 * @LastEditTime: 2024-03-16 13:49:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\Entity\Charge2Gun\index.tsx
 */

import React from 'react';
import { EntityType } from '../../type';
import Model from '../../Model';
import { ConfigType } from '../../type';
import { formatMessage } from '@/utils';
import { DeviceProductTypeEnum } from '@/utils/dictionary';
import ChargeImg from '@/assets/image/station/charge-2gun/charge.png';
import DoorImg from '@/assets/image/station/energy/door.png';
import DoorLineImg from '@/assets/image/station/charge-2gun/door-line.png';
import GunImg from '@/assets/image/station/charge-2gun/gun.png';
import GunALine from '@/assets/image/station/charge-2gun/gun-a-line.png';
import GunBLine from '@/assets/image/station/charge-2gun/gun-b-line.png';
import EnvironmentImg from '@/assets/image/station/charge-2gun/environment.png';
import EnvironmentLineImg from '@/assets/image/station/charge-2gun/environment-line.png';
import RunImg from '@/assets/image/station/charge-2gun/run.png';
import RunLineImg from '@/assets/image/station/charge-2gun/run-line.png';
import PowerImg from '@/assets/image/station/charge-2gun/power.png';
import PowerLineImg from '@/assets/image/station/charge-2gun/power-line.png';

const configs: ConfigType[] = [
  {
    label: '',
    productTypeId: DeviceProductTypeEnum.DCChargePile,
    dataProductTypeIds: [DeviceProductTypeEnum.ChargeGun],
    showLabel: false,
    position: { top: 65, left: 2 },
    icon: DoorImg,
    line: DoorLineImg,
    linePosition: { top: 22, left: 142 },
    data: [
      {
        field: 'glocstu',
      },
    ],
  },
  {
    label: formatMessage(
      { id: 'device.gunSentence', defaultMessage: '枪' },
      {
        name: 'A',
      },
    ),
    productTypeId: DeviceProductTypeEnum.ChargeGun,
    fixValue: '1',
    position: { top: 207, left: 2 },
    icon: GunImg,
    line: GunALine,
    linePosition: { top: 22, left: 71 },
    data: [
      { field: 'gworkmode' },
      { field: 'WorkStatus' },
      { field: 'galarmStatus' },
      { field: 'gp' },
      { field: 'gcu' },
      { field: 'gci' },
      { field: 'gcapacity' },
      { field: 'gxqu' },
      { field: 'gxqi' },
      { field: 'SOC' },
      { field: 'gst' },
    ],
  },
  {
    label: formatMessage({
      id: 'device.chargingModuleInformation',
      defaultMessage: '充电模块信息',
    }),
    productTypeId: DeviceProductTypeEnum.ChargeMaster,
    position: { top: 516, left: 2 },
    icon: EnvironmentImg,
    line: EnvironmentLineImg,
    linePosition: { top: 22, left: 120 },
    data: [],
  },
  {
    label: formatMessage({
      id: 'device.powerDistributionUnitInformation',
      defaultMessage: '功率分配单元信息',
    }),
    productTypeId: DeviceProductTypeEnum.ChargeMaster,
    position: { top: 590, left: 2 },
    icon: EnvironmentImg,
    line: EnvironmentLineImg,
    linePosition: { top: 22, left: 120 },
    data: [],
  },
  {
    label: '',
    showLabel: false,
    productTypeId: DeviceProductTypeEnum.DCChargePile,
    position: { top: 65, left: 754 },
    icon: RunImg,
    line: RunLineImg,
    linePosition: { top: 22, left: -222 },
    data: [{ field: 'trunst' }],
  },
  {
    label: formatMessage(
      { id: 'device.gunSentence', defaultMessage: '枪' },
      {
        name: 'B',
      },
    ),
    productTypeId: DeviceProductTypeEnum.ChargeGun,
    fixValue: '2',
    position: { top: 204, left: 754 },
    icon: GunImg,
    line: GunBLine,
    linePosition: { top: 26, left: -156 },
    data: [
      { field: 'gworkmode' },
      { field: 'WorkStatus' },
      { field: 'galarmStatus' },
      { field: 'gp' },
      { field: 'gcu' },
      { field: 'gci' },
      { field: 'gcapacity' },
      { field: 'gxqu' },
      { field: 'gxqi' },
      { field: 'SOC' },
      { field: 'gst' },
    ],
  },
  {
    label: formatMessage({ id: 'device.hostStatusInformation', defaultMessage: '主机状态信息' }),
    productTypeId: DeviceProductTypeEnum.ChargeMaster,
    position: { top: 520, left: 754 },
    icon: PowerImg,
    line: PowerLineImg,
    linePosition: { top: 22, left: -222 },
    data: [
      { field: 'mworkMode' },
      { field: 'mWorkStatus' },
      { field: 'WorkStatus' },
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

const Charge2Gun: React.FC<EntityType> = (props) => {
  const { ...restProps } = props;

  return (
    <>
      <Model
        modelStyle={{
          backgroundImage: `url(${ChargeImg})`,
          backgroundSize: '36%',
        }}
        configs={configs}
        {...restProps}
      ></Model>
    </>
  );
};

export default Charge2Gun;
