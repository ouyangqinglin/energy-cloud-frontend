/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-26 14:58:44
 * @LastEditTime: 2023-06-08 19:59:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\utils\dictionary.ts
 */

export const aks = [
  { key: '595f6302d987647e6c2cb83344e3c487', securityJsCode: '442c0d8de42797daebe1579fdcfcbccb' },
];

export enum EnergyEquipmentEnum {
  EMS = 1,
  BMS = 2,
  PCS = 3,
  AIR = 7,
  METER = 6,
}

export enum DeviceTypeEnum {
  Gateway = 9,
  ElectricMeter = 17,
  PvInverter11 = 11,
  PvInverter4 = 28,
  YtCharge160 = 13,
  Energy = 16,
  PvInverterCabinet = 18,
  HwCharge = 19,
  YtCharge120 = 24,
  EnergyCabinet = 30,
  BoxSubstation = 31,
  Cabinet = 32,
  HwChargeChild = 21,
  HwChargeYt = 22,
  Device = 'default',
}

export enum FormTypeEnum {
  Add = 'add',
  Edit = 'edit',
  Detail = 'detail',
}

export type FileType = {
  url: string;
};

export type LocationType = {
  query?: AnyMapType;
};

export enum AutoComStatusEnum {
  Complete = 'complete',
  Error = 'error',
  NoData = 'no_data',
}

export type OptionType = {
  label: string;
  value: string | number;
  [key: string]: any;
};

export type EquipPropType = {
  key: string;
  type: string;
  value: string | number;
};

export type fieldType = {
  label: string;
  field: string;
};

export type AnyMapType = {
  [key: string]: any;
};

export const useInfo = [
  { label: '占用', value: 1 },
  { label: '空闲', value: 0 },
];

export const weekInfo = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export const color = {};

export const buildStatus = {
  1: {
    text: '已交付',
    status: 'Success',
  },
  0: {
    text: '建设中',
    status: 'Processing',
  },
};

export const onlineStatus = {
  2: {
    text: '没有状态',
    status: '',
  },
  1: {
    text: '在线',
    status: 'Processing',
  },
  0: {
    text: '离线',
    status: 'Error',
  },
};

export const effectStatus = {
  0: {
    text: '有效',
    status: 'Success',
  },
  1: {
    text: '无效',
    status: 'Error',
  },
};

export const alarmStatus = {
  1: {
    text: '已恢复',
  },
  0: {
    text: '未恢复',
  },
};

export const alarmSourceStatus = {
  1: {
    text: '平台告警',
  },
  0: {
    text: '设备告警',
  },
};

export const pageType = {
  0: '标准首页',
  1: '定制页',
};

export const dataSource = {
  1: {
    text: '手动',
  },
  0: {
    text: '系统预设',
  },
};

export const serviceType = {
  1: {
    text: '维护',
  },
  0: {
    text: '安装',
  },
};

export const serviceProgressType = {
  2: {
    text: '完成',
  },
  1: {
    text: '处理中',
  },
  0: {
    text: '已受理',
  },
};
