/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-24 09:19:58
 * @LastEditTime: 2023-12-14 09:58:56
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SaveEnergy\config.ts
 */
import { DigitStatItemType } from '../../components/DigitStat';
import IconMark from '@/assets/image/multi-site/save-energy/mark.png';
import IconCard from '@/assets/image/multi-site/save-energy/card.png';
import IconCCER from '@/assets/image/multi-site/save-energy/ccer.png';
import { formatMessage } from '@/utils';

export const items: DigitStatItemType[] = [
  {
    icon: IconMark,
    title: formatMessage({
      id: 'screen.renewableEnergyConsumption',
      defaultMessage: '可再生能源消纳指数',
    }),
    unit: '%',
    field: 'storageRatio',
    valueStyle: {
      color: '#fff',
    },
    format: (value) => ({ value, unit: '' }),
  },
  {
    icon: IconCard,
    title: formatMessage({ id: 'screen.greenCertificates', defaultMessage: '绿证数量' }),
    unit: formatMessage({ id: 'screen.piece', defaultMessage: '张' }),
    field: 'greenCertificate',
    valueStyle: {
      color: 'rgba(182, 255, 167, 1)',
    },
    format: (value) => ({ value, unit: '' }),
  },
  {
    icon: IconCCER,
    title: formatMessage({ id: 'screen.ccerHoldings', defaultMessage: 'CCER持有量' }),
    unit: formatMessage({ id: 'screen.ton', defaultMessage: '吨' }),
    field: 'ccerhold',
    valueStyle: {
      color: '#FFf',
    },
    format: (value) => ({ value, unit: '' }),
    animation: {
      Children: {
        floatLength: 2,
      },
    },
  },
];
