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
import FireFightImg from '@/assets/image/station/energy/fire-fight.png';
import FireFightLineImg from '@/assets/image/station/energy/fire-fight-line.png';
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
  bwattAirWorkFormat,
  systemRunFormat,
  systemOperatingModeFormat,
  earlyWarningFormat,
  faultFireFightFormat,
  openCloseFormat,
} from '@/utils/format';
import { DeviceTypeEnum } from '@/utils/dictionary';
import { DetailItem } from '@/components/Detail';

const energyPowerFormat = (value: number, data: any) => {
  return (
    <span>
      {powerFormat(value)}({chargeFormat(data.CADI)})
    </span>
  );
};

export type ConfigType = {
  label: string;
  showLabel?: false;
  productIds?: DeviceTypeEnum[];
  position: {
    top: number;
    left: number;
  };
  icon: string;
  line: string;
  linePosition: {
    top: number;
    left: number;
  };
  data: DetailItem[];
};

export const airItem: ConfigType = {
  label: '空调',
  productIds: [DeviceTypeEnum.Air],
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
};

export const bwattAirItem: ConfigType = {
  label: '空调',
  productIds: [DeviceTypeEnum.BWattAir, DeviceTypeEnum.YTEnergyAir],
  position: { top: 51, left: 14 },
  icon: AirImg,
  line: AirLineImg,
  linePosition: { top: 11, left: 82 },
  data: [
    {
      label: '运行状态：',
      field: 'AirConditioningUnitOperationStatus',
      format: bwattAirWorkFormat,
    },
    { label: '室内温度：', field: 'IndoorTemperature', format: tempFormat },
    { label: '湿度：', field: 'Humidity', format: wetFormat },
  ],
};

export const emsItem: ConfigType = {
  label: 'EMS',
  productIds: [DeviceTypeEnum.Ems, DeviceTypeEnum.BWattEms, DeviceTypeEnum.YTEnergyEms],
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
};

export const ytEmsItem: ConfigType = {
  label: 'EMS',
  productIds: [DeviceTypeEnum.Ems, DeviceTypeEnum.BWattEms, DeviceTypeEnum.YTEnergyEms],
  position: { top: 302, left: 14 },
  icon: EmsImg,
  line: EmsLineImg,
  linePosition: { top: 11, left: 75 },
  data: [
    {
      label: '工作状态：',
      field: 'systemWorkingStatus',
      format: systemRunFormat,
    },
    {
      label: '工作模式：',
      field: 'systemOperatingMode',
      format: systemOperatingModeFormat,
    },
  ],
};

export const doorConfigs: ConfigType[] = [
  {
    label: '储能仓门',
    showLabel: false,
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
];

export const bmsConfig: ConfigType[] = [
  {
    label: '电池堆',
    productIds: [
      DeviceTypeEnum.BatteryStack,
      DeviceTypeEnum.BWattBatteryStack,
      DeviceTypeEnum.YTEnergyBatteryStack,
    ],
    position: { top: 450, left: 14 },
    icon: StackImg,
    line: StackLineImg,
    linePosition: { top: -74, left: 85 },
    data: [{ label: 'SoC：', field: 'SOC', format: percentageFormat }],
  },
];

export const fireFightConfig: ConfigType[] = [
  {
    label: '消防信息',
    productIds: [DeviceTypeEnum.FirFight],
    position: { top: 40, left: 802 },
    icon: FireFightImg,
    line: FireFightLineImg,
    linePosition: { top: 10, left: -110 },
    data: [
      { label: '预警等级：', field: 'SOC', format: earlyWarningFormat },
      { label: '故障类型：', field: 'SOC', format: faultFireFightFormat },
      { label: '了阀门状态：', field: 'SOC', format: openCloseFormat },
    ],
  },
];

export const peakConfig: ConfigType[] = [
  {
    label: '单体极值信息',
    productIds: [
      DeviceTypeEnum.BatteryStack,
      DeviceTypeEnum.BWattBatteryStack,
      DeviceTypeEnum.YTEnergyBatteryStack,
    ],
    position: { top: 185, left: 802 },
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

export const pcsConfig: ConfigType[] = [
  {
    label: 'PCS',
    productIds: [DeviceTypeEnum.Pcs, DeviceTypeEnum.BWattPcs, DeviceTypeEnum.YTEnergyPcs],
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
];
