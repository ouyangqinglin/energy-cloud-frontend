/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 14:38:48
 * @LastEditTime: 2023-08-29 14:10:32
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
    field: 'monthEconomicPerformance',
    valueStyle: {
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FFDD9B 82%, #FFC34F 100%)',
    },
    animation: {
      Children: {
        floatLength: 2,
      },
    },
    isformatNum: true,
  },
  {
    icon: IconYear,
    title: '当年收益',
    unit: '元',
    field: 'yearEconomicPerformance',
    valueStyle: {
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FFDD9B 82%, #FFC34F 100%)',
    },
    animation: {
      Children: {
        floatLength: 2,
      },
    },
    isformatNum: true,
  },
  {
    icon: IconTotal,
    title: '累计收益',
    unit: '元',
    field: 'cumulativeEconomicPerformance',
    valueStyle: {
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FFDD9B 82%, #FFC34F 100%)',
    },
    animation: {
      Children: {
        floatLength: 2,
      },
    },
    isformatNum: true,
  },
  {
    icon: IconCoal,
    title: '节约标准煤',
    unit: '吨',
    field: 'coal',
    valueStyle: {
      background:
        'linear-gradient(180deg, #FFFFFF 0%, #FFDD9B 82%, #FFC34F 100%), linear-gradient(180deg, #76FFEA 0%, #00C8FF 100%)',
    },
    animation: {
      Children: {
        floatLength: 2,
      },
    },
    isformatNum: true,
  },
  {
    icon: IconCo2,
    title: 'CO₂减排量',
    unit: '吨',
    field: 'conserveEnergyReduceEmissions',
    valueStyle: {
      background:
        'linear-gradient(180deg, #FFFFFF 0%, #FFDD9B 82%, #FFC34F 100%), linear-gradient(180deg, #76FFEA 0%, #00C8FF 100%)',
    },
    animation: {
      Children: {
        floatLength: 2,
      },
    },
    isformatNum: true,
  },
  {
    icon: IconTree,
    title: '等效植树量',
    unit: '棵',
    field: 'cumulativeTree',
    valueStyle: {
      background:
        'linear-gradient(180deg, #FFFFFF 0%, #FFDD9B 82%, #FFC34F 100%), linear-gradient(180deg, #76FFEA 0%, #00C8FF 100%)',
    },
    isformatNum: true,
  },
];
