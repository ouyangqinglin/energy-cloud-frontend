/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-14 11:31:33
 * @LastEditTime: 2024-03-14 14:03:57
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\Entity\WindPvFirewood\Front\index.tsx
 */

import React from 'react';
import { EntityType } from '../../../type';
import Model from '../../../Model';
import { ConfigType } from '../../../type';
import { formatMessage } from '@/utils';
import { DeviceProductTypeEnum } from '@/utils/dictionary';
import Energy from '@/assets/image/station/fgc-energy/energy.png';
import PcsImg from '@/assets/image/station/energy/pcs.png';
import PcsLineImg from '@/assets/image/station/fgc-energy/pcs-line.png';
import FireFightImg from '@/assets/image/station/energy/fire-fight.png';
import FireFightLineImg from '@/assets/image/station/fgc-energy/firefight-line.png';
import MeterImg from '@/assets/image/station/fgc-energy/meter.png';
import MeterLineImg from '@/assets/image/station/fgc-energy/meter-line.png';
import DoorImg from '@/assets/image/station/energy/door.png';
import DoorLineImg from '@/assets/image/station/fgc-energy/door-line.png';
import EmsImg from '@/assets/image/station/energy/ems.png';
import EmsLineImg from '@/assets/image/station/fgc-energy/ems-line.png';

const configs: ConfigType[] = [
  {
    label: formatMessage({ id: 'device.inventer', defaultMessage: '逆变器' }),
    productTypeId: DeviceProductTypeEnum.Pcs,
    position: { top: 6, left: 80 },
    icon: PcsImg,
    line: PcsLineImg,
    linePosition: { top: 22, left: 92 },
    data: [{ field: 'a' }, { field: 'b' }, { field: 'c' }],
  },
  {
    label: formatMessage({ id: 'device.fireFight', defaultMessage: '消防' }),
    productTypeId: DeviceProductTypeEnum.FireFight,
    position: { top: 138, left: 80 },
    icon: FireFightImg,
    line: FireFightLineImg,
    linePosition: { top: 22, left: 76 },
    data: [{ field: 'a' }, { field: 'b' }],
  },
  {
    label: formatMessage({ id: 'device.ammeter', defaultMessage: '电表' }),
    productTypeId: DeviceProductTypeEnum.EnergyElectricMeter,
    position: { top: 238, left: 80 },
    icon: MeterImg,
    line: MeterLineImg,
    linePosition: { top: 22, left: 76 },
    data: [{ field: 'a' }, { field: 'b' }, { field: 'c' }],
  },
  {
    label: '',
    productTypeId: DeviceProductTypeEnum.BatteryCluster,
    showLabel: false,
    position: { top: 6, left: 734 },
    icon: DoorImg,
    line: DoorLineImg,
    linePosition: { top: 22, left: -160 },
    data: [{ field: 'a' }],
  },
  {
    label: 'EMS',
    productTypeId: DeviceProductTypeEnum.Ems,
    position: { top: 80, left: 734 },
    icon: EmsImg,
    line: EmsLineImg,
    linePosition: { top: 22, left: -160 },
    data: [{ field: 'systemOperatingMode' }, { field: 'systemWorkingStatus' }],
  },
];

const Front: React.FC<EntityType> = (props) => {
  const { ...restProps } = props;

  return (
    <>
      <Model
        modelStyle={{
          height: '300px',
          backgroundImage: `url(${Energy})`,
          backgroundSize: '22%',
        }}
        configs={configs}
        {...restProps}
      ></Model>
    </>
  );
};

export default Front;
