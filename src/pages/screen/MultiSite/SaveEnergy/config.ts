/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-24 09:19:58
 * @LastEditTime: 2023-08-24 09:20:02
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SaveEnergy\config.ts
 */
import { DigitStatItemType } from '../../components/DigitStat';
import IconMark from '@/assets/image/multi-site/save-energy/mark.png';
import IconCard from '@/assets/image/multi-site/save-energy/card.png';
import IconCCER from '@/assets/image/multi-site/save-energy/ccer.png';

export const items: DigitStatItemType[] = [
  {
    icon: IconMark,
    title: '可再生能源消纳指数',
    unit: '%',
    field: 'storageRatio',
    valueStyle: {
      color: '#fff',
    },
  },
  {
    icon: IconCard,
    title: '绿证数量',
    unit: '张',
    field: 'greenCertificate',
    valueStyle: {
      color: 'rgba(182, 255, 167, 1)',
    },
  },
  {
    icon: IconCCER,
    title: 'CCER持有量',
    unit: '吨',
    field: 'ccerhold',
    valueStyle: {
      color: '#FFf',
    },
  },
];
