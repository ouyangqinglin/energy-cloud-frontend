/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-03 14:42:14
 * @LastEditTime: 2023-12-04 18:04:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\Stastistics\helper.tsx
 */
import Co2Icon from '@/assets/image/exchange-site/co2.png';
import MileageIcon from '@/assets/image/exchange-site/mileage.png';
import EnergyConsumIcon from '@/assets/image/exchange-site/energy-consum.png';
import ExchangeNumIcon from '@/assets/image/exchange-site/exchange-num.png';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export const totalItems = [
  {
    label: (
      <>
        <span>总二氧化碳减排(T)</span>{' '}
        <Tooltip
          placement="top"
          title="二氧化碳减排=[(总能耗/3.5)*2.63]/1000。其中总能耗/3.5为减少柴油消耗量。"
        >
          <QuestionCircleOutlined />
        </Tooltip>
      </>
    ),
    field: 'reduceCarbon',
    icon: Co2Icon,
  },
  {
    label: '总里程(kM)',
    field: 'totalMile',
    icon: MileageIcon,
  },
  {
    label: (
      <>
        <span>总能耗(kWh)</span>{' '}
        <Tooltip placement="top" title="总能耗=(单车每次换电的结束SOC-起始SOC)*电池额定容量之和。">
          <QuestionCircleOutlined />
        </Tooltip>
      </>
    ),
    field: 'totalEnergy',
    icon: EnergyConsumIcon,
  },
  { label: '总换电次数(次)', field: 'exchangeCount', icon: ExchangeNumIcon },
];

export const vehicleItems = [
  { label: '车辆总数(辆)', field: 'totalVehicle' },
  { label: '换电站总数(个)', field: 'stationNum' },
  { label: '电池总数(个)', field: 'totalBattery' },
];
