/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 14:38:48
 * @LastEditTime: 2023-08-22 15:46:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\IncomeStat\config.ts
 */
import { DigitStatItemType } from '../../components/DigitStat';
import IconTransformer from '@/assets/image/multi-site/install-capacity/transformer.png';
import IconPhotovoltaic from '@/assets/image/multi-site/install-capacity/photovoltaic.png';
import IconCharge from '@/assets/image/multi-site/install-capacity/charge.png';
import IconEnergy from '@/assets/image/multi-site/install-capacity/energy.png';

export const items: DigitStatItemType[] = [
  {
    icon: IconTransformer,
    title: '变压器总容量',
    unit: 'kW',
    field: 'a',
  },
  {
    icon: IconPhotovoltaic,
    title: '光伏总容量',
    unit: 'kWp',
    field: 'b',
  },
  {
    icon: IconCharge,
    title: '充电桩总功率',
    unit: 'kWp',
    field: 'c',
  },
  {
    icon: IconEnergy,
    title: '储能总容量',
    fields: [
      {
        field: 'd',
        unit: 'kW',
      },
      {
        field: 'e',
        unit: 'kWh',
      },
    ],
  },
];
