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
  dehumidifierWorkModeFormat,
  liquidSystemModeFormat,
  liquidSensorFormat,
  liquidWorkFormat,
  workStatusFormat,
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
  position: { top: 557, left: 2 },
  icon: LiquidAirImg,
  line: LiquidAirLineImg,
  linePosition: { top: 11, left: 100 },
  data: [
    {
      label: formatMessage({ id: 'device.systemMode', defaultMessage: '系统模式' }),
      field: 'SystemMode',
      format: liquidSystemModeFormat,
    },
  ],
};

export const liquid2AirItem: ConfigType = {
  label: formatMessage({ id: 'device.liquidCoolingUnit', defaultMessage: '液冷机组' }),
  productTypeId: DeviceProductTypeEnum.Air,
  position: { top: 557, left: 2 },
  icon: LiquidAirImg,
  line: LiquidAirLineImg,
  linePosition: { top: 11, left: 100 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'WorkStatus',
    },
    {
      label: formatMessage({ id: 'device.systemMode', defaultMessage: '系统模式' }),
      field: 'SystemMode',
    },
  ],
};

export const wind2AirItem: ConfigType = {
  label: formatMessage({ id: 'device.airConditioner', defaultMessage: '空调' }),
  productTypeId: DeviceProductTypeEnum.Air,
  position: { top: 51, left: 2 },
  icon: AirImg,
  line: AirLineImg,
  linePosition: { top: 11, left: 94 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'ctlmd',
    },
    {
      label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
      field: 'WorkStatus',
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
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'systemOperatingMode',
      format: systemOperatingModeFormat,
    },
    {
      label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
      field: 'systemWorkingStatus',
      format: systemRunFormat,
    },
  ],
};

export const liquidEmsItem: ConfigType = {
  label: 'EMS',
  productTypeId: DeviceProductTypeEnum.Ems,
  position: { top: 210, left: 2 },
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

export const liquid2EmsItem: ConfigType = {
  label: 'EMS',
  productTypeId: DeviceProductTypeEnum.Ems,
  position: { top: 210, left: 2 },
  icon: EmsImg,
  line: LiquidEmsLineImg,
  linePosition: { top: 11, left: 77 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
      field: 'systemOperatingMode',
    },
    {
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'systemWorkingStatus',
    },
  ],
};

export const wind2EmsItem: ConfigType = {
  label: 'EMS',
  productTypeId: DeviceProductTypeEnum.Ems,
  position: { top: 302, left: 2 },
  icon: EmsImg,
  line: EmsLineImg,
  linePosition: { top: 11, left: 87 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'systemOperatingMode',
    },
    {
      label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
      field: 'systemWorkingStatus',
    },
  ],
};

export const dehumidifierItem: ConfigType = {
  label: formatMessage({ id: 'device.dehumidifier', defaultMessage: '除湿器' }),
  productTypeId: DeviceProductTypeEnum.Dehumidifier,
  position: { top: 377, left: 2 },
  icon: DehumidiferImg,
  line: DehumidiferLineImg,
  linePosition: { top: 11, left: 92 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'WorkMode',
      format: dehumidifierWorkModeFormat,
    },
  ],
};

export const liquid2DehumidifierItem: ConfigType = {
  label: formatMessage({ id: 'device.dehumidifier', defaultMessage: '除湿器' }),
  productTypeId: DeviceProductTypeEnum.Dehumidifier,
  position: { top: 377, left: 2 },
  icon: DehumidiferImg,
  line: DehumidiferLineImg,
  linePosition: { top: 11, left: 92 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'WorkMode',
    },
  ],
};

export const doorItem: ConfigType = {
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
};

export const wind2DoorItem: ConfigType = {
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
    },
  ],
};

export const liquidDoorItem: ConfigType = {
  label: formatMessage({ id: 'siteMonitor.storageDoor', defaultMessage: '储能仓门' }),
  showLabel: false,
  position: { top: 70, left: 2 },
  icon: DoorImg,
  line: LiquidDoorLineImg,
  linePosition: { top: 7, left: 135 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.storageDoor', defaultMessage: '储能仓门' }),
      field: 'AccessControlStatus',
      format: (value: number) => doorFormat(value),
    },
  ],
};

export const liquid2DoorItem: ConfigType = {
  label: formatMessage({ id: 'siteMonitor.storageDoor', defaultMessage: '储能仓门' }),
  showLabel: false,
  position: { top: 70, left: 2 },
  icon: DoorImg,
  line: LiquidDoorLineImg,
  linePosition: { top: 7, left: 135 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.storageDoor', defaultMessage: '储能仓门' }),
      field: 'AccessControlStatus',
    },
  ],
};

export const bmsItem: ConfigType = {
  label: formatMessage({ id: 'siteMonitor.batteryPile', defaultMessage: '电池堆' }),
  productTypeId: DeviceProductTypeEnum.BatteryStack,
  position: { top: 450, left: 2 },
  icon: StackImg,
  line: StackLineImg,
  linePosition: { top: -74, left: 97 },
  data: [{ label: 'SOC', field: 'SOC', format: percentageFormat }],
};

export const liquidBmsItem: ConfigType = {
  label: formatMessage({ id: 'siteMonitor.batteryPile', defaultMessage: '电池堆' }),
  productTypeId: DeviceProductTypeEnum.BatteryStack,
  position: { top: 313, left: 768 },
  icon: StackImg,
  line: LiquidBmsLineImg,
  linePosition: { top: 7, left: -133 },
  data: [
    { label: 'SOC', field: 'SOC', format: percentageFormat },
    {
      label: formatMessage({
        id: 'siteMonitor.chargeDischargeIndication',
        defaultMessage: '充放电指示',
      }),
      field: 'CADI',
      format: chargeFormat,
    },
  ],
};

export const liquid2BmsItem: ConfigType = {
  label: formatMessage({ id: 'device.batteryPack', defaultMessage: '电池组' }),
  productTypeId: DeviceProductTypeEnum.BatteryStack,
  position: { top: 313, left: 768 },
  icon: StackImg,
  line: LiquidBmsLineImg,
  linePosition: { top: 7, left: -133 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'batteryPackOperatingMode',
    },
    {
      label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
      field: 'batteryPackWorkingStatus',
    },
  ],
};

export const wind2BmsItem: ConfigType = {
  label: formatMessage({ id: 'device.batteryPack', defaultMessage: '电池组' }),
  productTypeId: DeviceProductTypeEnum.BatteryStack,
  position: { top: 450, left: 2 },
  icon: StackImg,
  line: StackLineImg,
  linePosition: { top: -74, left: 97 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'batteryPackOperatingMode',
    },
    {
      label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
      field: 'batteryPackWorkingStatus',
    },
  ],
};

export const fireFightItem: ConfigType = {
  label: formatMessage({ id: 'device.fireFight', defaultMessage: '消防' }),
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
};

export const liquidFireFightItem: ConfigType = {
  label: formatMessage({ id: 'device.fireFight', defaultMessage: '消防' }),
  productTypeId: DeviceProductTypeEnum.FireFight,
  position: { top: 79, left: 768 },
  icon: FireFightImg,
  line: LiquidFireFightLineImg,
  linePosition: { top: 12, left: -137 },
  data: [
    {
      label: formatMessage({ id: 'device.sensorStatus', defaultMessage: '传感器状态' }),
      field: 'SensorStatus',
      format: liquidSensorFormat,
    },
    {
      label: formatMessage({ id: 'device.coConcentration', defaultMessage: 'CO浓度' }),
      field: 'DetectorCo',
    },
  ],
};

export const liquid2FireFightItem: ConfigType = {
  label: formatMessage({ id: 'device.fireFight', defaultMessage: '消防' }),
  productTypeId: DeviceProductTypeEnum.FireFight,
  position: { top: 79, left: 768 },
  icon: FireFightImg,
  line: LiquidFireFightLineImg,
  linePosition: { top: 12, left: -137 },
  data: [
    {
      label: formatMessage({ id: 'device.sensorStatus', defaultMessage: '传感器状态' }),
      field: 'SensorStatus',
    },
    {
      label: formatMessage({ id: 'device.coConcentration', defaultMessage: 'CO浓度' }),
      field: 'DetectorCo',
    },
  ],
};

export const wind2FireFightItem: ConfigType = {
  label: formatMessage({ id: 'device.fireFight', defaultMessage: '消防' }),
  productTypeId: DeviceProductTypeEnum.FireFight,
  position: { top: 40, left: 802 },
  icon: FireFightImg,
  line: FireFightLineImg,
  linePosition: { top: 10, left: -110 },
  data: [
    {
      label: formatMessage({ id: 'device.warningLevel', defaultMessage: '预警等级' }),
      field: 'lev',
    },
    {
      label: formatMessage({ id: 'device.subValveStatus', defaultMessage: '子阀门状态' }),
      field: 'svs',
    },
  ],
};

export const peakItem: ConfigType = {
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
      label: formatMessage({ id: 'device.cellNumber', defaultMessage: '电芯编号' }),
      field: 'MaxNOIV',
    },
    {
      label: formatMessage({ id: 'siteMonitor.minVoltage', defaultMessage: '最低电压' }),
      field: 'MVVOSU',
      format: voltageFormat,
    },
    {
      label: formatMessage({ id: 'device.cellNumber', defaultMessage: '电芯编号' }),
      field: 'MNOIV',
    },
    {
      label: formatMessage({ id: 'siteMonitor.maxTemperature', defaultMessage: '最高温度' }),
      field: 'MaximumIndividualTemperature',
      format: tempFormat,
    },
    {
      label: formatMessage({ id: 'device.temperaturePoint', defaultMessage: '温度点' }),
      field: 'MITN',
    },
    {
      label: formatMessage({ id: 'siteMonitor.minTemperature', defaultMessage: '最低温度' }),
      field: 'LVOMT',
      format: tempFormat,
    },
    {
      label: formatMessage({ id: 'device.temperaturePoint', defaultMessage: '温度点' }),
      field: 'MNOIT',
    },
  ],
};

export const wind2PeakItem: ConfigType = {
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
    },
    {
      label: formatMessage({ id: 'device.cellNumber', defaultMessage: '电芯编号' }),
      field: 'MaxNOIV',
    },
    {
      label: formatMessage({ id: 'siteMonitor.minVoltage', defaultMessage: '最低电压' }),
      field: 'MVVOSU',
    },
    {
      label: formatMessage({ id: 'device.cellNumber', defaultMessage: '电芯编号' }),
      field: 'MNOIV',
    },
    {
      label: formatMessage({ id: 'siteMonitor.maxTemperature', defaultMessage: '最高温度' }),
      field: 'MaximumIndividualTemperature',
    },
    {
      label: formatMessage({ id: 'device.temperaturePoint', defaultMessage: '温度点' }),
      field: 'MITN',
    },
    {
      label: formatMessage({ id: 'siteMonitor.minTemperature', defaultMessage: '最低温度' }),
      field: 'LVOMT',
    },
    {
      label: formatMessage({ id: 'device.temperaturePoint', defaultMessage: '温度点' }),
      field: 'MNOIT',
    },
  ],
};

export const liquidPeakItem: ConfigType = {
  label: formatMessage({ id: 'siteMonitor.monomerInformation', defaultMessage: '单体极值信息' }),
  productTypeId: DeviceProductTypeEnum.BatteryStack,
  position: { top: 465, left: 768 },
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
      label: formatMessage({ id: 'device.cellNumber', defaultMessage: '电芯编号' }),
      field: 'MaxNOIV',
    },
    {
      label: formatMessage({ id: 'siteMonitor.minVoltage', defaultMessage: '最低电压' }),
      field: 'MVVOSU',
      format: voltageFormat,
    },
    {
      label: formatMessage({ id: 'device.cellNumber', defaultMessage: '电芯编号' }),
      field: 'MNOIV',
    },
    {
      label: formatMessage({ id: 'siteMonitor.maxTemperature', defaultMessage: '最高温度' }),
      field: 'MaximumIndividualTemperature',
      format: tempFormat,
    },
    {
      label: formatMessage({ id: 'device.temperaturePoint', defaultMessage: '温度点' }),
      field: 'MITN',
    },
    {
      label: formatMessage({ id: 'siteMonitor.minTemperature', defaultMessage: '最低温度' }),
      field: 'LVOMT',
      format: tempFormat,
    },
    {
      label: formatMessage({ id: 'device.temperaturePoint', defaultMessage: '温度点' }),
      field: 'MNOIT',
    },
  ],
};

export const liquid2PeakItem: ConfigType = {
  label: formatMessage({ id: 'siteMonitor.monomerInformation', defaultMessage: '单体极值信息' }),
  productTypeId: DeviceProductTypeEnum.BatteryStack,
  position: { top: 465, left: 768 },
  icon: EmsImg,
  line: LiquidStackLineImg,
  linePosition: { top: 7, left: -165 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.maxVoltage', defaultMessage: '最高电压' }),
      field: 'MVVOASU',
    },
    {
      label: formatMessage({ id: 'device.cellNumber', defaultMessage: '电芯编号' }),
      field: 'MaxNOIV',
    },
    {
      label: formatMessage({ id: 'siteMonitor.minVoltage', defaultMessage: '最低电压' }),
      field: 'MVVOSU',
    },
    {
      label: formatMessage({ id: 'device.cellNumber', defaultMessage: '电芯编号' }),
      field: 'MNOIV',
    },
    {
      label: formatMessage({ id: 'siteMonitor.maxTemperature', defaultMessage: '最高温度' }),
      field: 'MaximumIndividualTemperature',
    },
    {
      label: formatMessage({ id: 'device.temperaturePoint', defaultMessage: '温度点' }),
      field: 'MITN',
    },
    {
      label: formatMessage({ id: 'siteMonitor.minTemperature', defaultMessage: '最低温度' }),
      field: 'LVOMT',
    },
    {
      label: formatMessage({ id: 'device.temperaturePoint', defaultMessage: '温度点' }),
      field: 'MNOIT',
    },
  ],
};

export const pcsItem: ConfigType = {
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
};

export const liquidPcsItem: ConfigType = {
  label: 'PCS',
  productTypeId: DeviceProductTypeEnum.Pcs,
  position: { top: 200, left: 768 },
  icon: PcsImg,
  line: LiquidPcsLineImg,
  linePosition: { top: -29, left: -222 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
      field: 'WorkStatus',
      format: liquidWorkFormat,
    },
    {
      label: formatMessage({ id: 'device.power', defaultMessage: '功率' }),
      field: 'p',
      format: energyPowerFormat,
    },
  ],
};

export const liquid2PcsItem: ConfigType = {
  label: formatMessage({ id: 'device.energyStorageInverter', defaultMessage: '储能变流器' }),
  productTypeId: DeviceProductTypeEnum.Pcs,
  position: { top: 200, left: 768 },
  icon: PcsImg,
  line: LiquidPcsLineImg,
  linePosition: { top: -29, left: -222 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'converterOperatingMode',
    },
    {
      label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
      field: 'converterWorkingStatus',
    },
  ],
};

export const wind2PcsItem: ConfigType = {
  label: formatMessage({ id: 'device.energyStorageInverter', defaultMessage: '储能变流器' }),
  productTypeId: DeviceProductTypeEnum.Pcs,
  position: { top: 487, left: 802 },
  icon: PcsImg,
  line: PcsLineImg,
  linePosition: { top: 11, left: -233 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
      field: 'converterOperatingMode',
    },
    {
      label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
      field: 'converterWorkingStatus',
    },
  ],
};

export type EnergyComponentType = {
  air?: ConfigType;
  door?: ConfigType;
  ems?: ConfigType;
  bms?: ConfigType;
  fireFight?: ConfigType;
  peak?: ConfigType;
  pcs?: ConfigType;
  dehumidifier?: ConfigType;
};

export const RectEnergy: EnergyComponentType = {
  air: airItem,
  door: doorItem,
  ems: emsItem,
  bms: bmsItem,
  peak: peakItem,
  pcs: pcsItem,
};
// export localEnergy
export const BwtEnergy: EnergyComponentType = {
  air: bwattAirItem,
  door: doorItem,
  ems: emsItem,
  bms: bmsItem,
  peak: peakItem,
  pcs: pcsItem,
};
export const WindEnergy: EnergyComponentType = {
  air: bwattAirItem,
  door: doorItem,
  ems: ytEmsItem,
  bms: bmsItem,
  fireFight: fireFightItem,
  peak: peakItem,
  pcs: pcsItem,
};
export const LiquidEnergy: EnergyComponentType = {
  air: liquidAirItem,
  door: liquidDoorItem,
  ems: liquidEmsItem,
  bms: liquidBmsItem,
  fireFight: liquidFireFightItem,
  peak: liquidPeakItem,
  pcs: liquidPcsItem,
  dehumidifier: dehumidifierItem,
};
export const Wind2Energy: EnergyComponentType = {
  air: wind2AirItem,
  door: wind2DoorItem,
  ems: wind2EmsItem,
  bms: wind2BmsItem,
  fireFight: wind2FireFightItem,
  peak: wind2PeakItem,
  pcs: wind2PcsItem,
};
export const Liquid2Energy: EnergyComponentType = {
  air: liquid2AirItem,
  door: liquid2DoorItem,
  ems: liquid2EmsItem,
  bms: liquid2BmsItem,
  fireFight: liquid2FireFightItem,
  peak: liquid2PeakItem,
  pcs: liquid2PcsItem,
  dehumidifier: liquid2DehumidifierItem,
};
