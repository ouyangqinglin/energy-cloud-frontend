/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:25:54
 * @LastEditTime: 2023-07-14 14:25:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\EnergyConverter\config.tsx
 */

import { ProField } from '@ant-design/pro-components';
import type { DetailItem } from '@/components/Detail';
import { onlineStatus } from '@/utils/dictionary';
import {
  chargeFormat,
  closeFormat,
  currentFormat,
  voltageFormat,
  percentageFormat,
  kohmFormat,
  powerHourFormat,
  tempFormat,
} from '@/utils/format';

export const runItems: DetailItem[] = [
  { label: '当前实际充放电工作模式', field: 'a' },
  { label: '工作状态', field: 'b' },
  { label: '硬件故障字1', field: 'c' },
  { label: '硬件故障字2 ', field: 'd' },
  { label: '电网故障字', field: 'e' },
  { label: '母线故障字', field: 'f' },
  { label: '交流电容故障字', field: 'g' },
  { label: '系统故障字', field: 'h' },
  { label: '开关故障字', field: 'i' },
  { label: '其他故障字', field: 'z' },
];

export const exchargeItems: DetailItem[] = [
  { label: '输出AB线电压', field: 'a' },
  { label: '输出BC线电压', field: 'b' },
  { label: '输出CA线电压', field: 'c' },
  { label: '输出A相电压', field: 'd' },
  { label: '输出B相电压', field: 'e' },
  { label: '输出C相电压', field: 'f' },
  { label: '输出A相电流', field: 'g' },
  { label: '输出B相电流', field: 'h' },
  { label: '输出C相电流', field: 'i' },
  { label: '电感A相电流', field: 'z' },
  { label: '电感B相电流', field: 'j' },
  { label: '电感C相电流', field: 'k' },
  { label: '电网频率', field: 'l' },
  { label: '电网当前相序', field: 'm' },
  { label: '交流A相有功功率', field: 'n' },
  { label: '交流B相有功功率', field: 'o' },
  { label: '交流C相有功功率', field: 'p' },
  { label: '交流A相视在功率', field: 'q' },
  { label: '交流B相视在功率', field: 'r' },
  { label: '交流C相视在功率', field: 's' },
  { label: '交流A相无功功率', field: 't' },
  { label: '交流B相无功功率', field: 'u' },
  { label: '交流C相无功功率', field: 'v' },
  { label: '交流输出总有功功率', field: 'w' },
  { label: '交流输出总无功功率', field: 'x' },
  { label: '交流输出总视在功率', field: 'y' },
  { label: '交流功率因素', field: 'aa' },
];

export const directCurrentItems: DetailItem[] = [
  { label: '总母线电压', field: 'a' },
  { label: '正母线电压', field: 'b' },
  { label: '负母线电压', field: 'c' },
  { label: '电池电压', field: 'd' },
  { label: '电池电流', field: 'e' },
  { label: '直流功率', field: 'f' },
];

export const tempItems: DetailItem[] = [
  { label: '环境温度', field: 'a' },
  { label: 'IGBT温度', field: 'b' },
  { label: '电感温度', field: 'c' },
];

export const versionItems: DetailItem[] = [
  { label: 'DSP-V版本', field: 'a' },
  { label: 'DSP-B版本', field: 'b' },
  { label: 'DSP-D版本', field: 'c' },
  { label: 'CPLD-V版本', field: 'd' },
  { label: 'CPLD-B版本', field: 'e' },
  { label: 'CPLD-D版本', field: 'f' },
];
