/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-03 14:42:14
 * @LastEditTime: 2023-12-03 14:42:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\Stastistics\helper.ts
 */
import Co2Icon from '@/assets/image/exchange-site/co2.png';
import MileageIcon from '@/assets/image/exchange-site/mileage.png';
import EnergyConsumIcon from '@/assets/image/exchange-site/energy-consum.png';
import ExchangeNumIcon from '@/assets/image/exchange-site/exchange-num.png';

export const totalItems = [
  { label: '总二氧化碳减排(T)', field: 'reduceCarbon', icon: Co2Icon },
  { label: '总里程(kM)', field: 'totalMile', icon: MileageIcon },
  { label: '总能耗(kWh)', field: 'totalEnergy', icon: EnergyConsumIcon },
  { label: '总换电次数(次)', field: 'exchangeCount', icon: ExchangeNumIcon },
];

export const vehicleItems = [
  { label: '车辆总数(辆)', field: 'totalVehicle' },
  { label: '换电站总数(个)', field: 'stationNum' },
  { label: '电池总数(个)', field: 'totalBattery' },
];
