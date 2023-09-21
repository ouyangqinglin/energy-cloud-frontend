/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 14:38:48
 * @LastEditTime: 2023-09-21 16:15:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\InstallCapacity\config.ts
 */
import { DigitStatItemType } from '../../components/DigitStat';
import IconTransformer from '@/assets/image/multi-site/install-capacity/transformer.png';
import IconPhotovoltaic from '@/assets/image/multi-site/install-capacity/photovoltaic.png';
import IconCharge from '@/assets/image/multi-site/install-capacity/charge.png';
import IconEnergy from '@/assets/image/multi-site/install-capacity/energy.png';
import { formatWattNum } from '@/utils';

export const items: DigitStatItemType[] = [
  {
    icon: IconTransformer,
    title: '变压器总容量',
    unit: 'W',
    field: 'transformerCapacity',
    format: formatWattNum,
  },
  {
    icon: IconPhotovoltaic,
    title: '光伏总容量',
    unit: 'Wp',
    field: 'photovoltaicInstalledCapacity',
    format: formatWattNum,
  },
  {
    icon: IconCharge,
    title: '充电桩总功率',
    unit: 'W',
    field: 'chargingStationCapacity',
    format: formatWattNum,
  },
  {
    icon: IconEnergy,
    title: '储能总容量',
    fields: [
      {
        field: 'energyStoragePower',
        unit: 'W',
        format: formatWattNum,
      },
      {
        field: 'energyStorageCapacity',
        unit: 'Wh',
        format: formatWattNum,
      },
    ],
  },
];
