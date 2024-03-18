/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-05 09:11:33
 * @LastEditTime: 2024-03-05 17:18:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\Entity\Charge1Gun\index.tsx
 */

import React from 'react';
import { EntityType } from '../../type';
import Model from '../../Model';
import { ConfigType } from '../../type';
import { formatMessage } from '@/utils';
import { DeviceProductTypeEnum } from '@/utils/dictionary';
import ChargeImg from '@/assets/image/station/charge-1gun/charge.png';
import DoorImg from '@/assets/image/station/energy/door.png';
import DoorLineImg from '@/assets/image/station/charge-2gun/door-line.png';
import GunImg from '@/assets/image/station/charge-2gun/gun.png';
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
        field: 'g.glocstu',
      },
    ],
  },
  {
    label: formatMessage({ id: 'device.chargingGun', defaultMessage: '充电枪' }),
    productTypeId: DeviceProductTypeEnum.ChargeGun,
    position: { top: 210, left: 754 },
    icon: GunImg,
    line: GunBLine,
    linePosition: { top: 26, left: -156 },
    data: [
      { field: 'WorkStatus' },
      { field: 'gcu' },
      { field: 'gci' },
      { field: 'SOC' },
      { field: 'gst' },
    ],
  },
  {
    label: formatMessage({ id: 'device.environmentalInformation', defaultMessage: '环境信息' }),
    productTypeId: DeviceProductTypeEnum.DCChargePile,
    position: { top: 437, left: 2 },
    icon: EnvironmentImg,
    line: EnvironmentLineImg,
    linePosition: { top: 22, left: 120 },
    data: [{ field: 'mt1' }, { field: 'mt2' }, { field: 'mh' }],
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
    label: formatMessage({ id: 'device.powerInformation', defaultMessage: '功率信息' }),
    productTypeId: DeviceProductTypeEnum.DCChargePile,
    position: { top: 450, left: 754 },
    icon: PowerImg,
    line: PowerLineImg,
    linePosition: { top: 22, left: -222 },
    data: [{ field: 'Ua' }, { field: 'Ub' }, { field: 'Uc' }],
  },
];

const Charge2Gun: React.FC<EntityType> = (props) => {
  const { ...restProps } = props;

  return (
    <>
      <Model
        modelStyle={{
          backgroundImage: `url(${ChargeImg})`,
          backgroundSize: '38%',
        }}
        configs={configs}
        {...restProps}
      ></Model>
    </>
  );
};

export default Charge2Gun;
