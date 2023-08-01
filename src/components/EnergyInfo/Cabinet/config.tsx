import React from 'react';
import AirImg from '@/assets/image/station/energy/air.png';
import AirLineImg from '@/assets/image/station/energy/air-line.png';
import DoorImg from '@/assets/image/station/energy/door.png';
import DoorLineImg from '@/assets/image/station/energy/door-line.png';
import EmsImg from '@/assets/image/station/energy/ems.png';
import EmsLineImg from '@/assets/image/station/energy/ems-line.png';
import StackImg from '@/assets/image/station/energy/stack.png';
import StackLineImg from '@/assets/image/station/energy/stack-line.png';
import PcsImg from '@/assets/image/station/energy/pcs.png';
import PcsLineImg from '@/assets/image/station/energy/pcs-line.png';
import PackLineImg from '@/assets/image/station/energy/pack-line.png';
import {
  tempFormat,
  wetFormat,
  doorFormat,
  runFormat,
  modelFormat,
  percentageFormat,
  workFormat,
  electricModelFormat,
  voltageFormat,
  airWorkFormat,
  powerFormat,
  chargeFormat,
} from '@/utils/format';
import { DeviceTypeEnum } from '@/utils/dictionary';

const energyPowerFormat = (value: number, data: any) => {
  return (
    <span>
      {powerFormat(value)}({chargeFormat(data.CADI)})
    </span>
  );
};

export const unitItems = [
  {
    label: '空调',
    productId: DeviceTypeEnum.Air,
    position: { top: 51, left: 14 },
    icon: AirImg,
    line: AirLineImg,
    linePosition: { top: 11, left: 82 },
    data: [
      {
        label: '运行状态：',
        field: 'AirConditioningWorkingStatus',
        format: airWorkFormat,
      },
      { label: '回风温度：', field: 'ReturnAirTemperature', format: tempFormat },
      { label: '回风湿度：', field: 'ReturnAirHumidity', format: wetFormat },
    ],
  },
  {
    label: '储能仓门',
    position: { top: 203, left: 14 },
    icon: DoorImg,
    line: DoorLineImg,
    linePosition: { top: 11, left: 140 },
    data: [
      {
        label: '储能仓门：',
        field: 'AccessControlStatus',
        format: (value: number) => doorFormat(value),
      },
    ],
  },
  {
    label: 'EMS',
    productId: DeviceTypeEnum.Ems,
    position: { top: 302, left: 14 },
    icon: EmsImg,
    line: EmsLineImg,
    linePosition: { top: 11, left: 75 },
    data: [
      {
        label: '运行状态：',
        field: 'emsSysStatus',
        format: (value: number) => runFormat(value),
      },
      {
        label: '系统模式：',
        field: 'sysModel',
        format: (value: number) => modelFormat(value),
      },
    ],
  },
  {
    label: '电池堆',
    productId: DeviceTypeEnum.BatteryStack,
    position: { top: 450, left: 14 },
    icon: StackImg,
    line: StackLineImg,
    linePosition: { top: -74, left: 85 },
    data: [{ label: 'SoC：', field: 'SOC', format: percentageFormat }],
  },
  {
    label: 'PCS',
    productId: DeviceTypeEnum.Pcs,
    position: { top: 487, left: 802 },
    icon: PcsImg,
    line: PcsLineImg,
    linePosition: { top: 11, left: -233 },
    data: [
      {
        label: '工作状态：',
        field: 'WorkStatus',
        format: (value: number) => workFormat(value),
      },
      {
        label: '工作模式：',
        field: 'CurrentChargingAndDischargingModel',
        format: (value: number) => electricModelFormat(value),
      },
      { label: '储能功率：', field: 'P', format: energyPowerFormat },
    ],
  },
  {
    label: '单体极值信息',
    productId: DeviceTypeEnum.BatteryStack,
    position: { top: 175, left: 802 },
    icon: EmsImg,
    line: PackLineImg,
    linePosition: { top: 11, left: -60 },
    data: [
      { label: '最高电压：', field: 'MVVOASU', format: voltageFormat },
      { label: '编号：', field: 'MaxNOIV' },
      { label: '最低电压：', field: 'MVVOSU', format: voltageFormat },
      { label: '编号：', field: 'MNOIV' },
      { label: '最高温度：', field: 'MaximumIndividualTemperature', format: tempFormat },
      { label: '编号：', field: 'MITN' },
      { label: '最低温度：', field: 'LVOMT', format: tempFormat },
      { label: '编号：', field: 'MNOIT' },
    ],
  },
];
