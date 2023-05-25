/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-26 14:58:44
 * @LastEditTime: 2023-05-19 11:20:05
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\utils\dictionary.ts
 */
import sun from '@/assets/image/screen/weather/sun.png';
import cloudy from '@/assets/image/screen/weather/cloudy.png';
import cloudyDay from '@/assets/image/screen/weather/cloudyDay.png';
import lightRain from '@/assets/image/screen/weather/lightRain.png';
import moderateRain from '@/assets/image/screen/weather/moderateRain.png';
import rainstorm from '@/assets/image/screen/weather/rainstorm.png';
import thunderstorm from '@/assets/image/screen/weather/thunderstorm.png';

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

export enum FormTypeEnum {
  Add = 'add',
  Edit = 'edit',
  Detail = 'detail',
}

export enum AutoComStatusEnum {
  Complete = 'complete',
  Error = 'error',
  NoData = 'no_data',
}

export type OptionType = {
  label: string;
  value: string | number;
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

export const weatherInfo = [
  { label: sun, value: '晴' },
  { label: cloudy, value: '多云' },
  { label: cloudyDay, value: '阴' },
  { label: lightRain, value: '小雨' },
  { label: moderateRain, value: '中雨' },
  { label: rainstorm, value: '暴雨' },
  { label: thunderstorm, value: '雷阵雨' },
];

export const weekInfo = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export const color = {};

export const buildStatus = {
  // 0: '建设中',
  // 1: '已交付',
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
  1: {
    text: '在线',
    status: 'Success',
  },
  0: {
    text: '离线',
    status: 'Error',
  },
};

export const effectStatus = {
  1: {
    text: '有效',
    status: 'Success',
  },
  0: {
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
