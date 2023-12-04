/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-04 17:08:01
 * @LastEditTime: 2023-12-04 17:08:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\exchange-monitor\RealTimeMonitor\helper.ts
 */
import SiteIcon from '@/assets/image/exchange-site/total-site.png';
import ExchangeIcon from '@/assets/image/exchange-site/total-exchange.png';
import ChargeIcon from '@/assets/image/exchange-site/total-charge.png';

export const statisticsItems = [
  { label: '换电站总数', icon: SiteIcon, field: 'site', unit: '个' },
  { label: '总换电次数', icon: ExchangeIcon, field: 'exchangeNum', unit: '次' },
  { label: '总充电量', icon: ChargeIcon, field: 'totalChargePower', unit: 'kWh' },
];
