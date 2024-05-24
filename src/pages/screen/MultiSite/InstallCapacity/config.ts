/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 14:38:48
 * @LastEditTime: 2024-05-23 17:02:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\InstallCapacity\config.ts
 */
import { DigitStatItemType } from '../../components/DigitStat';
import IconTransformer from '@/assets/image/multi-site/install-capacity/transformer.png';
import IconPhotovoltaic from '@/assets/image/multi-site/install-capacity/photovoltaic.png';
import IconCharge from '@/assets/image/multi-site/install-capacity/charge.png';
import IconEnergy from '@/assets/image/multi-site/install-capacity/energy.png';
import { formatMessage, formatWattNum } from '@/utils';

export const items: DigitStatItemType[] = [
  {
    icon: IconTransformer,
    title: formatMessage({ id: 'screen.totalTransformerCapacity', defaultMessage: '变压器总容量' }),
    unit: 'W',
    field: 'transformerCapacity',
    format: formatWattNum,
    animation: {
      Children: {
        floatLength: 2,
      },
    },
  },
  {
    key: 'pv',
    icon: IconPhotovoltaic,
    title: formatMessage({ id: 'screen.totalPvCapacity', defaultMessage: '光伏总容量' }),
    unit: 'Wp',
    field: 'photovoltaicInstalledCapacity',
    format: formatWattNum,
    animation: {
      Children: {
        floatLength: 2,
      },
    },
  },
  {
    key: 'energy',
    icon: IconEnergy,
    title: formatMessage({ id: 'screen.totalStorageCapacity', defaultMessage: '储能总容量' }),
    fields: [
      {
        field: 'energyStoragePower',
        unit: 'W',
        format: formatWattNum,
        animation: {
          Children: {
            floatLength: 2,
          },
        },
      },
      {
        field: 'energyStorageCapacity',
        unit: 'Wh',
        format: formatWattNum,
        animation: {
          Children: {
            floatLength: 2,
          },
        },
      },
    ],
  },
  {
    key: 'charge',
    icon: IconCharge,
    title: formatMessage({ id: 'screen.totalChargingCapacity', defaultMessage: '充电桩总功率' }),
    unit: 'W',
    field: 'chargingStationCapacity',
    format: formatWattNum,
    animation: {
      Children: {
        floatLength: 2,
      },
    },
  },
];
