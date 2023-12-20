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
import LiquidDoorLineImg from '@/assets/image/station/liquid-energy/door-line.png';
import LiquidEmsLineImg from '@/assets/image/station/liquid-energy/ems-line.png';
import DehumidiferImg from '@/assets/image/station/liquid-energy/dehumidifier.png';
import DehumidiferLineImg from '@/assets/image/station/liquid-energy/dehumidifier-line.png';
import LiquidAirImg from '@/assets/image/station/liquid-energy/air.png';
import LiquidAirLineImg from '@/assets/image/station/liquid-energy/air-line.png';
import LiquidFireFightLineImg from '@/assets/image/station/liquid-energy/firefight-line.png';
import LiquidPcsLineImg from '@/assets/image/station/liquid-energy/pcs-line.png';
import LiquidBmsLineImg from '@/assets/image/station/liquid-energy/bms-line.png';
import LiquidStackLineImg from '@/assets/image/station/liquid-energy/stack-line.png';
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
import { DeviceProductTypeEnum, DeviceTypeEnum } from '@/utils/dictionary';
import { DetailItem } from '@/components/Detail';
import { formatMessage } from '@/utils';

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
  productTypeId?: DeviceProductTypeEnum;
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
  label: formatMessage({ id: 'device.airConditioner', defaultMessage: '空调' }),
  productTypeId: DeviceProductTypeEnum.Air,
  position: { top: 51, left: 2 },
  icon: AirImg,
  line: AirLineImg,
  linePosition: { top: 11, left: 94 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' }),
      field: 'AirConditioningWorkingStatus',
      format: airWorkFormat,
    },
    {
      label: formatMessage({ id: 'siteMonitor.returnAirTemperature', defaultMessage: '回风温度' }),
      field: 'ReturnAirTemperature',
      format: tempFormat,
    },
    {
      label: formatMessage({ id: 'siteMonitor.returnAirHumidity', defaultMessage: '回风湿度' }),
      field: 'ReturnAirHumidity',
      format: wetFormat,
    },
  ],
};

export const bwattAirItem: ConfigType = {
  label: formatMessage({ id: 'device.airConditioner', defaultMessage: '空调' }),
  productTypeId: DeviceProductTypeEnum.Air,
  position: { top: 51, left: 2 },
  icon: AirImg,
  line: AirLineImg,
  linePosition: { top: 11, left: 94 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' }),
      field: 'AirConditioningUnitOperationStatus',
      format: bwattAirWorkFormat,
    },
    {
      label: formatMessage({ id: 'siteMonitor.roomTemperature', defaultMessage: '室内温度' }),
      field: 'IndoorTemperature',
      format: tempFormat,
    },
    {
      label: formatMessage({ id: 'siteMonitor.humidness', defaultMessage: '湿度' }),
      field: 'Humidity',
      format: wetFormat,
    },
  ],
};

export const liquidAirItem: ConfigType = {
  label: formatMessage({ id: 'device.liquidCoolingUnit', defaultMessage: '液冷机组' }),
  productTypeId: DeviceProductTypeEnum.Air,
  position: { top: 347, left: 2 },
  icon: LiquidAirImg,
  line: LiquidAirLineImg,
  linePosition: { top: 11, left: 92 },
  data: [
    {
      label: formatMessage({ id: 'device.systemMode', defaultMessage: '系统模式' }),
      field: 'AirConditioningWorkingStatus',
      format: airWorkFormat,
    },
  ],
};

export const emsItem: ConfigType = {
  label: 'EMS',
  productTypeId: DeviceProductTypeEnum.Ems,
  position: { top: 302, left: 2 },
  icon: EmsImg,
  line: EmsLineImg,
  linePosition: { top: 11, left: 87 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' }),
      field: 'emsSysStatus',
      format: (value: number) => runFormat(value),
    },
    {
      label: formatMessage({ id: 'siteMonitor.systemModel', defaultMessage: '系统模式' }),
      field: 'sysModel',
      format: (value: number) => modelFormat(value),
    },
  ],
};

export const ytEmsItem: ConfigType = {
  label: 'EMS',
  productTypeId: DeviceProductTypeEnum.Ems,
  position: { top: 302, left: 2 },
  icon: EmsImg,
  line: EmsLineImg,
  linePosition: { top: 11, left: 87 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
      field: 'systemWorkingStatus',
      format: systemRunFormat,
    },
    {
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'systemOperatingMode',
      format: systemOperatingModeFormat,
    },
  ],
};

export const liquidEmsItem: ConfigType = {
  label: 'EMS',
  productTypeId: DeviceProductTypeEnum.Ems,
  position: { top: 177, left: 2 },
  icon: EmsImg,
  line: LiquidEmsLineImg,
  linePosition: { top: 11, left: 77 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
      field: 'systemWorkingStatus',
      format: systemRunFormat,
    },
    {
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'systemOperatingMode',
      format: systemOperatingModeFormat,
    },
  ],
};

export const dehumidifierItem: ConfigType = {
  label: formatMessage({ id: 'device.dehumidifier', defaultMessage: '除湿器' }),
  productTypeId: DeviceProductTypeEnum.Dehumidifier,
  position: { top: 347, left: 2 },
  icon: DehumidiferImg,
  line: DehumidiferLineImg,
  linePosition: { top: 11, left: 92 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'systemOperatingMode',
      format: systemOperatingModeFormat,
    },
  ],
};

export const doorConfigs: ConfigType[] = [
  {
    label: formatMessage({ id: 'siteMonitor.storageDoor', defaultMessage: '储能仓门' }),
    showLabel: false,
    position: { top: 203, left: 2 },
    icon: DoorImg,
    line: DoorLineImg,
    linePosition: { top: 11, left: 152 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.storageDoor', defaultMessage: '储能仓门' }),
        field: 'AccessControlStatus',
        format: (value: number) => doorFormat(value),
      },
    ],
  },
];

export const liquidDoorConfigs: ConfigType[] = [
  {
    label: formatMessage({ id: 'siteMonitor.storageDoor', defaultMessage: '储能仓门' }),
    showLabel: false,
    position: { top: 53, left: 2 },
    icon: DoorImg,
    line: LiquidDoorLineImg,
    linePosition: { top: 7, left: 128 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.storageDoor', defaultMessage: '储能仓门' }),
        field: 'AccessControlStatus',
        format: (value: number) => doorFormat(value),
      },
    ],
  },
];

export const bmsConfig: ConfigType[] = [
  {
    label: formatMessage({ id: 'siteMonitor.batteryPile', defaultMessage: '电池堆' }),
    productTypeId: DeviceProductTypeEnum.BatteryStack,
    position: { top: 450, left: 2 },
    icon: StackImg,
    line: StackLineImg,
    linePosition: { top: -74, left: 97 },
    data: [{ label: 'SoC', field: 'SOC', format: percentageFormat }],
  },
];

export const liquidBmsConfig: ConfigType[] = [
  {
    label: formatMessage({ id: 'siteMonitor.batteryPile', defaultMessage: '电池堆' }),
    productTypeId: DeviceProductTypeEnum.BatteryStack,
    position: { top: 296, left: 768 },
    icon: StackImg,
    line: LiquidBmsLineImg,
    linePosition: { top: 7, left: 133 },
    data: [
      { label: 'SoC', field: 'SOC', format: percentageFormat },
      {
        label: formatMessage({
          id: 'siteMonitor.chargeDischargeIndication',
          defaultMessage: '充放电指示',
        }),
        field: 'SOC',
        format: percentageFormat,
      },
    ],
  },
];

export const fireFightConfig: ConfigType[] = [
  {
    label: formatMessage({ id: 'device.fireInfo', defaultMessage: '消防信息' }),
    productTypeId: DeviceProductTypeEnum.FireFight,
    position: { top: 40, left: 802 },
    icon: FireFightImg,
    line: FireFightLineImg,
    linePosition: { top: 10, left: -110 },
    data: [
      {
        label: formatMessage({ id: 'device.warningLevel', defaultMessage: '预警等级' }),
        field: 'lev',
        format: earlyWarningFormat,
      },
      {
        label: formatMessage({ id: 'device.faultType', defaultMessage: '故障类型' }),
        field: 'sft',
        format: faultFireFightFormat,
      },
      {
        label: formatMessage({ id: 'device.subValveStatus', defaultMessage: '子阀门状态' }),
        field: 'svs',
        format: openCloseFormat,
      },
    ],
  },
];

export const liquidFireFightConfig: ConfigType[] = [
  {
    label: formatMessage({ id: 'device.fireInfo', defaultMessage: '消防信息' }),
    productTypeId: DeviceProductTypeEnum.FireFight,
    position: { top: 36, left: 768 },
    icon: FireFightImg,
    line: LiquidFireFightLineImg,
    linePosition: { top: 12, left: -137 },
    data: [
      {
        label: formatMessage({ id: 'device.sensorStatus', defaultMessage: '传感器状态' }),
        field: 'lev',
        format: earlyWarningFormat,
      },
      {
        label: formatMessage({ id: 'device.co2Concentration', defaultMessage: 'CO₂浓度' }),
        field: 'sft',
        format: faultFireFightFormat,
      },
    ],
  },
];

export const peakConfig: ConfigType[] = [
  {
    label: formatMessage({ id: 'siteMonitor.monomerInformation', defaultMessage: '单体极值信息' }),
    productTypeId: DeviceProductTypeEnum.BatteryStack,
    position: { top: 185, left: 802 },
    icon: EmsImg,
    line: PackLineImg,
    linePosition: { top: 11, left: -60 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.maxVoltage', defaultMessage: '最高电压' }),
        field: 'MVVOASU',
        format: voltageFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.numberCode', defaultMessage: '编号' }),
        field: 'MaxNOIV',
      },
      {
        label: formatMessage({ id: 'siteMonitor.minVoltage', defaultMessage: '最低电压' }),
        field: 'MVVOSU',
        format: voltageFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.numberCode', defaultMessage: '编号' }),
        field: 'MNOIV',
      },
      {
        label: formatMessage({ id: 'siteMonitor.maxTemperature', defaultMessage: '最高温度' }),
        field: 'MaximumIndividualTemperature',
        format: tempFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.numberCode', defaultMessage: '编号' }),
        field: 'MITN',
      },
      {
        label: formatMessage({ id: 'siteMonitor.minTemperature', defaultMessage: '最低温度' }),
        field: 'LVOMT',
        format: tempFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.numberCode', defaultMessage: '编号' }),
        field: 'MNOIT',
      },
    ],
  },
];

export const liquidPeakConfig: ConfigType[] = [
  {
    label: formatMessage({ id: 'siteMonitor.monomerInformation', defaultMessage: '单体极值信息' }),
    productTypeId: DeviceProductTypeEnum.BatteryStack,
    position: { top: 426, left: 768 },
    icon: EmsImg,
    line: LiquidStackLineImg,
    linePosition: { top: 7, left: -165 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.maxVoltage', defaultMessage: '最高电压' }),
        field: 'MVVOASU',
        format: voltageFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.numberCode', defaultMessage: '编号' }),
        field: 'MaxNOIV',
      },
      {
        label: formatMessage({ id: 'siteMonitor.minVoltage', defaultMessage: '最低电压' }),
        field: 'MVVOSU',
        format: voltageFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.numberCode', defaultMessage: '编号' }),
        field: 'MNOIV',
      },
      {
        label: formatMessage({ id: 'siteMonitor.maxTemperature', defaultMessage: '最高温度' }),
        field: 'MaximumIndividualTemperature',
        format: tempFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.numberCode', defaultMessage: '编号' }),
        field: 'MITN',
      },
      {
        label: formatMessage({ id: 'siteMonitor.minTemperature', defaultMessage: '最低温度' }),
        field: 'LVOMT',
        format: tempFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.numberCode', defaultMessage: '编号' }),
        field: 'MNOIT',
      },
    ],
  },
];

export const pcsConfig: ConfigType[] = [
  {
    label: 'PCS',
    productTypeId: DeviceProductTypeEnum.Pcs,
    position: { top: 487, left: 802 },
    icon: PcsImg,
    line: PcsLineImg,
    linePosition: { top: 11, left: -233 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
        field: 'WorkStatus',
        format: (value: number) => workFormat(value),
      },
      {
        label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
        field: 'CurrentChargingAndDischargingModel',
        format: (value: number) => electricModelFormat(value),
      },
      {
        label: formatMessage({ id: 'siteMonitor.storagePower', defaultMessage: '储能功率' }),
        field: 'P',
        format: energyPowerFormat,
      },
    ],
  },
];

export const liquidPcsConfig: ConfigType[] = [
  {
    label: 'PCS',
    productTypeId: DeviceProductTypeEnum.Pcs,
    position: { top: 166, left: 768 },
    icon: PcsImg,
    line: LiquidPcsLineImg,
    linePosition: { top: -29, left: 222 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
        field: 'WorkStatus',
        format: (value: number) => workFormat(value),
      },
      {
        label: formatMessage({ id: 'device.power', defaultMessage: '功率' }),
        field: 'CurrentChargingAndDischargingModel',
        format: (value: number) => electricModelFormat(value),
      },
    ],
  },
];
