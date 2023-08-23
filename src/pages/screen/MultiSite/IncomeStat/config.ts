/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 14:38:48
 * @LastEditTime: 2023-08-22 15:46:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\IncomeStat\config.ts
 */
import { DigitStatItemType } from '../../components/DigitStat';
import IconMonth from '@/assets/image/multi-site/income/month.png';
import IconYear from '@/assets/image/multi-site/income/year.png';
import IconTotal from '@/assets/image/multi-site/income/total.png';
import IconCoal from '@/assets/image/multi-site/income/coal.png';
import IconCo2 from '@/assets/image/multi-site/income/co2.png';
import IconTree from '@/assets/image/multi-site/income/tree.png';

export const items: DigitStatItemType[] = [
  {
    icon: IconMonth,
    title: '当月收益',
    unit: '元',
    field: 'a',
    valueStyle: {
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FFDD9B 82%, #FFC34F 100%)',
    },
  },
  {
    icon: IconYear,
    title: '当月收益',
    unit: '元',
    field: 'b',
    valueStyle: {
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FFDD9B 82%, #FFC34F 100%)',
    },
  },
  {
    icon: IconTotal,
    title: '累计收益',
    unit: '元',
    field: 'c',
    valueStyle: {
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FFDD9B 82%, #FFC34F 100%)',
    },
  },
  {
    icon: IconCoal,
    title: '节约标准煤',
    unit: '吨',
    field: 'd',
    valueStyle: {
      background:
        'linear-gradient(180deg, #FFFFFF 0%, #FFDD9B 82%, #FFC34F 100%), linear-gradient(180deg, #76FFEA 0%, #00C8FF 100%)',
    },
  },
  {
    icon: IconCo2,
    title: 'CO₂减排量',
    unit: '吨',
    field: 'e',
    valueStyle: {
      background:
        'linear-gradient(180deg, #FFFFFF 0%, #FFDD9B 82%, #FFC34F 100%), linear-gradient(180deg, #76FFEA 0%, #00C8FF 100%)',
    },
  },
  {
    icon: IconTree,
    title: '等效植树量',
    unit: '棵',
    field: 'f',
    valueStyle: {
      background:
        'linear-gradient(180deg, #FFFFFF 0%, #FFDD9B 82%, #FFC34F 100%), linear-gradient(180deg, #76FFEA 0%, #00C8FF 100%)',
    },
  },
];
