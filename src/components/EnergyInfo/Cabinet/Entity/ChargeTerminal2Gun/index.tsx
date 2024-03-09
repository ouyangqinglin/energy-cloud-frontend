/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-05 09:11:33
 * @LastEditTime: 2024-03-08 09:39:46
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\Entity\ChargeTerminal2Gun\index.tsx
 */

import React from 'react';
import { EntityType } from '../../type';
import Model from '../../Model';
import { ConfigType } from '../../type';
import { formatMessage } from '@/utils';
import { DeviceProductTypeEnum } from '@/utils/dictionary';
import ChargeImg from '@/assets/image/station/charge-terminal-2gun/charge.png';
import DoorImg from '@/assets/image/station/energy/door.png';
import DoorLineImg from '@/assets/image/station/charge-terminal-2gun/door-line.png';
import RunImg from '@/assets/image/station/charge-2gun/run.png';
import RunLineImg from '@/assets/image/station/charge-terminal-2gun/run-line.png';
import GunImg from '@/assets/image/station/charge-2gun/gun.png';
import GunALine from '@/assets/image/station/charge-terminal-2gun/gun-a-line.png';
import GunBLine from '@/assets/image/station/charge-terminal-2gun/gun-b-line.png';

const configs: ConfigType[] = [
  {
    label: '',
    productTypeId: DeviceProductTypeEnum.DCChargePile,
    showLabel: false,
    position: { top: 48, left: 69 },
    icon: DoorImg,
    line: DoorLineImg,
    linePosition: { top: 22, left: 142 },
    data: [
      {
        field: 'AccessControlStatus',
      },
    ],
  },
  {
    label: '',
    showLabel: false,
    productTypeId: DeviceProductTypeEnum.DCChargePile,
    position: { top: 40, left: 706 },
    icon: RunImg,
    line: RunLineImg,
    linePosition: { top: 22, left: -195 },
    data: [{ field: 'Humidity3' }],
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
    position: { top: 112, left: 69 },
    icon: GunImg,
    line: GunALine,
    linePosition: { top: 22, left: 71 },
    data: [
      { field: 'WorkStatus' },
      { field: 'gcu' },
      { field: 'gci' },
      { field: 'SOC' },
      { field: 'gst' },
    ],
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
    position: { top: 112, left: 706 },
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
];

const ChargeTerminal2Gun: React.FC<EntityType> = (props) => {
  const { ...restProps } = props;

  return (
    <>
      <Model
        modelStyle={{
          height: '410px',
          backgroundImage: `url(${ChargeImg})`,
          backgroundSize: '23%',
        }}
        configs={configs}
        {...restProps}
      ></Model>
    </>
  );
};

export default ChargeTerminal2Gun;
