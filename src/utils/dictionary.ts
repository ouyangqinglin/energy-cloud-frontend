/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-26 14:58:44
 * @LastEditTime: 2023-05-04 19:19:52
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

export const aks = ['YeoPwIR9MkozLsC0irBYIpFEPvjrc4bn'];

export type OptionType = {
  label: string;
  value: string | number;
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

export const weekInfo = ['星期天', '周一', '周二', '周三', '周四', '周五', '周六'];

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
