import SiteName from '@/assets/image/screen/siteInfo/site_name.png';
// import { ReactComponent as SiteType } from '@/assets/image/screen/siteInfo/site_type.png';
import icon_site_name from '@/assets/image/screen/stationOverview/icon_site_name.png';
import icon_location from '@/assets/image/screen/stationOverview/icon_location.png';
import icon_create_time from '@/assets/image/screen/stationOverview/icon_create_time.png';
import EnergyStorageCapacity from '@/assets/image/screen/siteInfo/energy_storage_capacity.png';
import Location from '@/assets/image/screen/siteInfo/location.png';
import PhotovoltaicPanel from '@/assets/image/screen/siteInfo/photovoltaic_panel.png';
import TransformerCapacity from '@/assets/image/screen/siteInfo/transformer_capacity.png';
import { DetailItem } from '@/components/Detail';

type StationInfo = {
  icon: any;
} & DetailItem;

export const stationInfoConfig: StationInfo[] = [
  {
    icon: icon_site_name,
    label: '站点名称：',
    field: 'name',
  },
  {
    icon: icon_create_time,
    label: '站点投运时间：',
    field: 'createTime',
  },
  {
    icon: icon_location,
    label: '站点地址：',
    field: 'address',
  },
  // {
  //   icon: TransformerCapacity,
  //   label: '变压器容量：',
  //   field: 'transformerCapacity',
  //   format: (value: number) => value + 'kW',
  // },
  // {
  //   icon: PhotovoltaicPanel,
  //   label: '光伏装机量',
  //   field: 'photovoltaicInstalledCapacity',
  //   format: (value: number) => value + 'kWp',
  // },
  // {
  //   icon: EnergyStorageCapacity,
  //   label: '储能容量：',
  //   field: 'energyStorageCapacityFront',
  // },
  // {
  //   icon: ChargingStation,
  //   label: '充电桩装机量：',
  //   field: 'chargingStationCapacity',
  //   format: (value: number) => value + 'kWh',
  // },
];

export const DEFAULT_DATA = {
  name: '永泰光储充示范站',
  transformerCapacity: 800,
  createTime: '2023-02-01 21:09',
  photovoltaicInstalledCapacity: 280,
  energyStorageCapacity: 500,
  energyStoragePower: 200,
  chargingStationCapacity: 500,
  address: '深圳市龙华区观湖街道鹭湖社区观',
};
