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
  bwattAirWorkFormat,
} from '@/utils/format';
import { DeviceTypeEnum } from '@/utils/dictionary';
import { formatMessage } from '@/utils';
import { ProFormColumnsType } from '@ant-design/pro-components';

const energyPowerFormat = (value: number, data: any) => {
  return (
    <span>
      {powerFormat(value)}({chargeFormat(data.CADI)})
    </span>
  );
};

export type GroupDataType = {
  index?: number;
  groupName?: string;
  groupId?: string;
  deviceId?: string;
};

export const airItem = {
  label: formatMessage({ id: 'device.airConditioner', defaultMessage: '空调' }),
  productIds: [DeviceTypeEnum.Air],
  position: { top: 51, left: 14 },
  icon: AirImg,
  line: AirLineImg,
  linePosition: { top: 11, left: 82 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' }) + '：',
      field: 'AirConditioningWorkingStatus',
      format: airWorkFormat,
    },
    {
      label:
        formatMessage({ id: 'siteMonitor.returnAirTemperature', defaultMessage: '回风温度' }) +
        '：',
      field: 'ReturnAirTemperature',
      format: tempFormat,
    },
    {
      label:
        formatMessage({ id: 'siteMonitor.returnAirHumidity', defaultMessage: '回风湿度' }) + '：',
      field: 'ReturnAirHumidity',
      format: wetFormat,
    },
  ],
};

export const bwattAirItem = {
  label: formatMessage({ id: 'device.airConditioner', defaultMessage: '空调' }),
  productIds: [DeviceTypeEnum.BWattAir],
  position: { top: 51, left: 14 },
  icon: AirImg,
  line: AirLineImg,
  linePosition: { top: 11, left: 82 },
  data: [
    {
      label: formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' }) + '：',
      field: 'AirConditioningUnitOperationStatus',
      format: bwattAirWorkFormat,
    },
    {
      label:
        formatMessage({ id: 'siteMonitor.roomTemperature', defaultMessage: '室内温度' }) + '：',
      field: 'IndoorTemperature',
      format: tempFormat,
    },
    {
      label: formatMessage({ id: 'siteMonitor.humidness', defaultMessage: '湿度' }) + '：',
      field: 'Humidity',
      format: wetFormat,
    },
  ],
};

export const unitItems = [
  {
    label: formatMessage({ id: 'siteMonitor.storageDoor', defaultMessage: '储能仓门' }),
    position: { top: 203, left: 14 },
    icon: DoorImg,
    line: DoorLineImg,
    linePosition: { top: 11, left: 140 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.storageDoor', defaultMessage: '储能仓门' }) + '：',
        field: 'AccessControlStatus',
        format: (value: number) => doorFormat(value),
      },
    ],
  },
  {
    label: 'EMS',
    productIds: [DeviceTypeEnum.Ems, DeviceTypeEnum.BWattEms],
    position: { top: 302, left: 14 },
    icon: EmsImg,
    line: EmsLineImg,
    linePosition: { top: 11, left: 75 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' }) + '：',
        field: 'emsSysStatus',
        format: (value: number) => runFormat(value),
      },
      {
        label: formatMessage({ id: 'siteMonitor.systemModel', defaultMessage: '系统模式' }) + '：',
        field: 'sysModel',
        format: (value: number) => modelFormat(value),
      },
    ],
  },
  {
    label: formatMessage({ id: 'siteMonitor.batteryPile', defaultMessage: '电池堆' }),
    productIds: [DeviceTypeEnum.BatteryStack, DeviceTypeEnum.BWattBatteryStack],
    position: { top: 450, left: 14 },
    icon: StackImg,
    line: StackLineImg,
    linePosition: { top: -74, left: 85 },
    data: [{ label: 'SOC：', field: 'SOC', format: percentageFormat }],
  },
  {
    label: 'PCS',
    productIds: [DeviceTypeEnum.Pcs, DeviceTypeEnum.BWattPcs],
    position: { top: 487, left: 802 },
    icon: PcsImg,
    line: PcsLineImg,
    linePosition: { top: 11, left: -233 },
    data: [
      {
        label:
          formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }) + '：',
        field: 'WorkStatus',
        format: (value: number) => workFormat(value),
      },
      {
        label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }) + '：',
        field: 'CurrentChargingAndDischargingModel',
        format: (value: number) => electricModelFormat(value),
      },
      {
        label: formatMessage({ id: 'siteMonitor.storagePower', defaultMessage: '储能功率' }) + '：',
        field: 'P',
        format: energyPowerFormat,
      },
    ],
  },
  {
    label: formatMessage({ id: 'siteMonitor.monomerInformation', defaultMessage: '单体极值信息' }),
    productIds: [DeviceTypeEnum.BatteryStack, DeviceTypeEnum.BWattBatteryStack],
    position: { top: 175, left: 802 },
    icon: EmsImg,
    line: PackLineImg,
    linePosition: { top: 11, left: -60 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.maxVoltage', defaultMessage: '最高电压' }) + '：',
        field: 'MVVOASU',
        format: voltageFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.numberCode', defaultMessage: '编号' }) + '：',
        field: 'MaxNOIV',
      },
      {
        label: formatMessage({ id: 'siteMonitor.minVoltage', defaultMessage: '最低电压' }) + '：',
        field: 'MVVOSU',
        format: voltageFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.numberCode', defaultMessage: '编号' }) + '：',
        field: 'MNOIV',
      },
      {
        label:
          formatMessage({ id: 'siteMonitor.maxTemperature', defaultMessage: '最高温度' }) + '：',
        field: 'MaximumIndividualTemperature',
        format: tempFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.numberCode', defaultMessage: '编号' }) + '：',
        field: 'MITN',
      },
      {
        label:
          formatMessage({ id: 'siteMonitor.minTemperature', defaultMessage: '最低温度' }) + '：',
        field: 'LVOMT',
        format: tempFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.numberCode', defaultMessage: '编号' }) + '：',
        field: 'MNOIT',
      },
    ],
  },
];

export const groupColumns: ProFormColumnsType[] = [
  {
    title: formatMessage({ id: 'siteMonitor.gruopName', defaultMessage: '分组名称' }),
    dataIndex: 'groupName',
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
        },
      ],
    },
  },
];
