/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-11 16:56:37
 * @LastEditTime: 2023-12-04 17:03:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\EnergyDialog\equipmentItem.ts
 */
import type { DetailItem } from '@/components/Detail';
import {
  communicateFormat,
  runFormat,
  modelFormat,
  closeFormat,
  singleFormat,
  powerFormat,
  voltageFormat,
  currentFormat,
  frequencyFormat,
  tempFormat,
  workFormat,
  faultFormat,
  doorFormat,
  chargeFormat,
  openFormat,
  percentageFormat,
  kohmFormat,
  powerHourFormat,
  hydrogenFormat,
  outputFormat,
  openCloseFormat,
  booleanFormat,
  airsetFormat,
  electricModelFormat,
  externalFaultFormat,
  alarmArrFormat,
} from '@/utils/format';

export const statusItems: DetailItem[] = [
  { label: 'PCS通讯状态', field: 'pcsLoss', format: communicateFormat },
  { label: 'BMS通讯状态', field: 'bmsLoss', format: communicateFormat },
  {
    label: '电表通讯状态',
    field: 'meterLoss',
    format: communicateFormat,
    span: 2,
  },
  { label: 'EMS运行状态', field: 'emsSysStatus', format: runFormat },
  { label: '系统模式', field: 'sysModel', format: modelFormat, span: 3 },
  { label: 'BMS主接触器状态', field: 'MainContactorStatus', format: closeFormat },
  { label: '气溶胶信号', field: 'AerosolSignal', format: singleFormat },
  { label: '电气急停信号', field: 'EmergencyStopSignal', format: singleFormat },
  { label: 'BMS急停信号', field: 'BmsStopSignal', format: singleFormat },
];
export const settingItems: DetailItem[] = [
  { label: '过充保护', field: 'OverchargeProtection', format: voltageFormat },
  { label: '过充释放', field: 'OverchargeRelease', format: voltageFormat },
  { label: '过放保护', field: 'OverdischargeProtection', format: voltageFormat },
  { label: '过放释放', field: 'Overrelease', format: voltageFormat },
  { label: '手动PCS功率', field: 'handOpePcsPower', format: powerFormat, span: 4 },
  {
    label: '时段1',
    field: 'AtTheBeginningOfThePeriodOne',
    format: (_, data) =>
      data.AtTheBeginningOfThePeriodOne
        ? `${data.AtTheBeginningOfThePeriodOne}:${data.StartingPointOfTimePeriodOne ?? ''}~${
            data.AtTheEndOfThePeriodOne ?? ''
          }:${data.PeriodEndMinuteOne ?? ''}`
        : '',
  },
  { label: '执行功率', field: 'PCSPeriodPowerOne', format: powerFormat },
  {
    label: '时段2',
    field: 'AtTheBeginningOfThePeriodTwo',
    format: (_, data) =>
      data.AtTheBeginningOfThePeriodTwo
        ? `${data.AtTheBeginningOfThePeriodTwo}:${data.StartingPointOfTimePeriodTwo ?? ''}~${
            data.AtTheEndOfThePeriodTwo ?? ''
          }:${data.PeriodEndMinuteTwo ?? ''}`
        : '',
  },
  { label: '执行功率', field: 'PCSPeriodPowerTwo', format: powerFormat, span: 2 },
  {
    label: '时段3',
    field: 'AtTheBeginningOfThePeriodThree',
    format: (_, data) =>
      data.AtTheBeginningOfThePeriodThree
        ? `${data.AtTheBeginningOfThePeriodThree}:${data.StartingPointOfTimePeriodThree ?? ''}~${
            data.AtTheEndOfThePeriodThree ?? ''
          }:${data.PeriodEndMinuteThree ?? ''}`
        : '',
  },
  { label: '执行功率', field: 'PCSPeriodPowerThree', format: powerFormat },
  {
    label: '时段4',
    field: 'AtTheBeginningOfThePeriodFour',
    format: (_, data) =>
      data.AtTheBeginningOfThePeriodFour
        ? `${data.AtTheBeginningOfThePeriodFour}:${data.StartingPointOfTimePeriodFour ?? ''}~${
            data.AtTheEndOfThePeriodFour ?? ''
          }:${data.PeriodEndMinuteFour ?? ''}`
        : '',
  },
  { label: '执行功率', field: 'PCSPeriodPowerFour', format: powerFormat, span: 2 },
  {
    label: '时段5',
    field: 'AtTheBeginningOfThePeriodFive',
    format: (_, data) =>
      data.AtTheBeginningOfThePeriodFive
        ? `${data.AtTheBeginningOfThePeriodFive}:${data.StartingPointOfTimePeriodFive ?? ''}~${
            data.AtTheEndOfThePeriodFive ?? ''
          }:${data.PeriodEndMinuteFive ?? ''}`
        : '',
  },
  { label: '执行功率', field: 'PCSPeriodPowerFive', format: powerFormat },
];

export const pcsStatusItems: DetailItem[] = [
  {
    label: '当前实际充放电工作模式',
    field: 'CurrentChargingAndDischargingModel',
    format: electricModelFormat,
  },
  { label: '工作状态', field: 'WorkStatus', format: workFormat },
  { label: '系统故障字', field: 'SystemFault', format: faultFormat },
  { label: '硬件故障字1', field: 'HardwareFault1', format: faultFormat },
  { label: '硬件故障字2', field: 'HardwareFault2', format: faultFormat },
  { label: '电网故障字', field: 'GridFault', format: faultFormat },
  { label: '母线故障字', field: 'BusFault', format: faultFormat },
  { label: '交流电容故障字', field: 'AcCapacitorFault', format: faultFormat },
  { label: '开关故障字', field: 'SwitchFault', format: faultFormat },
  { label: '其他故障字', field: 'OtherFault', format: faultFormat },
];
export const measureItems: DetailItem[] = [
  { label: '输出AB线电压', field: 'Uab', format: voltageFormat },
  { label: '输出BC线电压', field: 'Ubc', format: voltageFormat },
  { label: '输出CA线电压', field: 'Uca', format: voltageFormat },
  { label: '输出A相电压', field: 'Ua', format: voltageFormat },
  { label: '输出B相电压', field: 'Ub', format: voltageFormat },
  { label: '输出C相电压', field: 'Uc', format: voltageFormat },
  { label: '输出A相电流', field: 'OutputIa', format: currentFormat },
  { label: '输出B相电流', field: 'OutputIb', format: currentFormat },
  { label: '输出C相电流', field: 'OutputIc', format: currentFormat },
  { label: '电感A相电流', field: 'inductanceIa', format: currentFormat },
  { label: '电感B相电流', field: 'inductanceIb', format: currentFormat },
  { label: '电感C相电流', field: 'inductanceIc', format: currentFormat },
  { label: '电网频率', field: 'Freq', format: frequencyFormat },
  { label: '电网当前相序', field: 'GridPhaseSequence' },
  { label: '交流A相有功功率', field: 'Pa', format: powerFormat },
  { label: '交流B相有功功率', field: 'Pb', format: powerFormat },
  { label: '交流C相有功功率', field: 'Pc', format: powerFormat },
  { label: '交流A相视在功率', field: 'Sa', format: powerFormat },
  { label: '交流B相视在功率', field: 'Sb', format: powerFormat },
  { label: '交流C相视在功率', field: 'Sc', format: powerFormat },
  { label: '交流A相无功功率', field: 'Qa', format: powerFormat },
  { label: '交流B相无功功率', field: 'Qb', format: powerFormat },
  { label: '交流C相无功功率', field: 'Qc', format: powerFormat },
  { label: '交流输出总有功功率', field: 'P', format: powerFormat },
  { label: '交流输出总无功功率', field: 'Q', format: powerFormat },
  { label: '交流输出总视在功率', field: 'S', format: powerFormat },
  { label: '交流功率因数', field: 'COS' },
  { label: '总母线电压', field: 'totalBusVoltage', format: voltageFormat },
  { label: '正母线电压', field: 'positiveBusVoltage', format: voltageFormat },
  { label: '负母线电压', field: 'negativeBusVoltage', format: voltageFormat },
  { label: '电池电压', field: 'BatteryVoltage', format: voltageFormat },
  { label: '电池电流', field: 'batteryCurrent', format: currentFormat },
  { label: '直流功率', field: 'PDC', format: powerFormat },
  { label: '环境温度', field: 'EnvironmentTemperature', format: tempFormat },
  { label: 'IGBT温度', field: 'IgbtTemperature', format: tempFormat },
  { label: 'DSP-V版本', field: 'DspVVersion' },
  { label: 'DSP-B版本', field: 'DspBVersion' },
  { label: 'DSP-D版本', field: 'DspDVersion' },
  { label: 'CPLD-V版本', field: 'CpldVVersion' },
  { label: 'CPLD-B版本', field: 'CpldBVersion' },
  { label: 'CPLD-D版本', field: 'CpldDVersion' },
];

export const bmsStatusItems: DetailItem[] = [
  { label: '预充接触器状态', field: 'PrechargeContactorStatus', format: closeFormat },
  { label: '直流断路器状态', field: 'DCCircuitBreakerStatus', format: closeFormat },
  { label: '交流断路器状态', field: 'ACCircuitBreakerStatus', format: closeFormat },
  { label: '门禁状态', field: 'AccessControlStatus', format: doorFormat },
  { label: '充放电指示', field: 'CADI', format: chargeFormat },
  { label: 'BMU1风扇', field: 'BMU1Fan', format: openFormat },
  { label: 'BMU2风扇', field: 'BMU2Fan', format: openFormat },
  { label: 'BMU3风扇', field: 'BMU3Fan', format: openFormat },
  { label: 'BMU4风扇', field: 'BMU4Fan', format: openFormat },
  { label: 'BMU5风扇', field: 'BMU5Fan', format: openFormat },
  { label: 'BMU6风扇', field: 'BMU6Fan', format: openFormat },
  { label: 'BMU7风扇', field: 'BMU7Fan', format: openFormat },
  { label: 'BMU8风扇', field: 'BMU8Fan', format: openFormat },
  { label: 'BMU9风扇', field: 'BMU9Fan', format: openFormat },
  { label: 'BMU10风扇', field: 'BMU10Fan', format: openFormat },
  { label: 'BMU1-10通信状态', field: 'BMU1CS', format: faultFormat },
  { label: '对外故障', field: 'externalFaultStatus', format: externalFaultFormat },
  { label: '一级报警', field: 'firstLevelAlarm', format: alarmArrFormat },
  { label: '二级报警', field: 'secondLevelAlarm', format: alarmArrFormat },
  { label: '三级报警', field: 'threeLevelAlarm', format: alarmArrFormat },
];
export const bmsMeasureItems: DetailItem[] = [
  { label: '电池总电压', field: 'TotalBatteryVoltage', format: voltageFormat },
  { label: '电池总电流', field: 'TotalBatteryCurrent', format: currentFormat },
  { label: '预充总压', field: 'TPCP', format: voltageFormat },
  { label: 'SOC', field: 'SOC', format: percentageFormat },
  { label: 'SOH', field: 'SOH', format: percentageFormat },
  { label: '绝缘值', field: 'InsulationValue', format: kohmFormat },
  { label: '负极绝缘值', field: 'NegativeInsulationValue', format: kohmFormat },
  { label: '最大充电电流', field: 'MaximumChargingCurrent', format: currentFormat },
  { label: '最大放电电流', field: 'maximumDischargeCurrent', format: currentFormat },
  { label: '单体电压最高号', field: 'MaxNOIV' },
  { label: '单体最高电压值', field: 'MVVOASU', format: voltageFormat },
  { label: '单体电压最低号', field: 'MNOIV' },
  { label: '单体最低电压值', field: 'MVVOSU', format: voltageFormat },
  { label: '单体温度最高号', field: 'MITN' },
  { label: '单体温度最高值', field: 'MaximumIndividualTemperature', format: tempFormat },
  { label: '单体温度最低号', field: 'MNOIT' },
  { label: '单体温度最低值', field: 'LVOMT', format: tempFormat },
  { label: '平均电压', field: 'AverageVoltage', format: voltageFormat },
  { label: '平均温度', field: 'AverageTemperature', format: tempFormat },
  { label: '高压箱温度1', field: 'HighPressureBoxTemperature1', format: tempFormat },
  { label: '高压箱温度2', field: 'HighPressureBoxTemperature2', format: tempFormat },
  { label: '高压箱温度3', field: 'HighPressureBoxTemperature3', format: tempFormat },
  { label: '高压箱温度4', field: 'HighPressureBoxTemperature4', format: tempFormat },
  { label: '可充电量', field: 'RechargeableCapacity', format: powerHourFormat },
  { label: '可放电量', field: 'DischargeableCapacity', format: powerHourFormat },
  { label: '最近一次充电电量', field: 'LastChargeLevel', format: powerHourFormat },
  { label: '最近一次放电电量', field: 'LastDischargeCapacity', format: powerHourFormat },
  { label: '累计充电电量', field: 'ACC', format: powerHourFormat },
  { label: '累计放电电量', field: 'ADC', format: powerHourFormat },
  { label: 'PACK风扇PWM占空比1', field: 'PACKFPDC1', format: percentageFormat },
  { label: 'PACK风扇PWM占空比2', field: 'PACKFPDC2', format: percentageFormat },
  { label: 'PACK风扇PWM占空比3', field: 'PACKFPDC3', format: percentageFormat },
  { label: 'PACK风扇PWM占空比4', field: 'PACKFPDC4', format: percentageFormat },
  { label: 'PACK风扇PWM占空比5', field: 'PACKFPDC5', format: percentageFormat },
  { label: 'PACK风扇PWM占空比6', field: 'PACKFPDC6', format: percentageFormat },
  { label: 'PACK风扇PWM占空比7', field: 'PACKFPDC7', format: percentageFormat },
  { label: 'PACK风扇PWM占空比8', field: 'PACKFPDC8', format: percentageFormat },
  { label: 'PACK风扇PWM占空比9', field: 'PACKFPDC9', format: percentageFormat },
  { label: 'PACK风扇PWM占空比10', field: 'PACKFPDC10', format: percentageFormat },
  { label: '电池柜开门次数', field: 'NOBCDO' },
  { label: '氢气浓度', field: 'HydrogenConcentration', format: hydrogenFormat },
];

export const airStatusItems: DetailItem[] = [
  { label: '室内风机开关', field: 'IndoorFanSwitch', format: outputFormat },
  { label: '压缩机开关', field: 'compressorSwitch', format: outputFormat },
  { label: '电加热开关', field: 'ElectricHeatingSwitch', format: openCloseFormat },
  { label: '公告告警开关', field: 'AnnouncementAlarmSwitch', format: openFormat },
  { label: '制冷状态', field: 'CoolingState', format: booleanFormat },
  { label: '制热状态', field: 'HeatingState', format: booleanFormat },
  { label: '除湿状态', field: 'DehumidificationState', format: booleanFormat },
  { label: '送风状态', field: 'AirSupplyStatus', format: booleanFormat },
  { label: '待机状态', field: 'PositionInReadiness', format: booleanFormat },
  { label: '空调机组运行状态', field: 'AirConditioningUnitOperationStatus', format: airsetFormat },
];
export const airMeasureItems: DetailItem[] = [
  { label: '回风湿度', field: 'ReturnAirHumidity', format: percentageFormat },
  { label: '送风温度', field: 'SupplyAirTemperature', format: tempFormat },
  { label: '冷凝温度', field: 'CondensingTemperature', format: tempFormat },
  { label: '蒸发温度', field: 'EvaporatingTemperature', format: tempFormat },
  { label: '回风温度', field: 'ReturnAirTemperature', format: tempFormat },
];

export const electricMeasureItems: DetailItem[] = [
  { label: 'A相功率', field: 'APhasePower', format: powerFormat },
  { label: 'B相功率', field: 'BPhasePower', format: powerFormat },
  { label: 'C相功率', field: 'CPhasePower', format: powerFormat },
  { label: '总有功功率', field: 'TotalActivePower', format: powerFormat },
  { label: '当日用电量', field: 'DailyElectricityConsumption', format: powerFormat },
  { label: '当月用电量', field: 'MonthlyElectricityConsumption', format: powerHourFormat },
  { label: '累计用电量', field: 'AEC', format: powerHourFormat },
  { label: '当日馈电量', field: 'DailyPowerSupply', format: powerHourFormat },
  { label: '当月馈电量', field: 'CurrentMonthPowerSupply', format: powerHourFormat },
  { label: '累计馈电量', field: 'AccumulatedPowerSupply', format: powerHourFormat },
];
