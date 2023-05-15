import SiteName from '@/assets/image/screen/siteInfo/site_name.png';
// import { ReactComponent as SiteType } from '@/assets/image/screen/siteInfo/site_type.png';
import ChargingStation from '@/assets/image/screen/siteInfo/charging_station.png';
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
    icon: SiteName,
    label: '站点名称：',
    field: 'name',
  },
  // {
  //   icon: SiteType,
  //   label: '站点类型：',
  //   field: 'voltageLevel',
  // },
  {
    icon: TransformerCapacity,
    label: '变压器容量：',
    field: 'transformerCapacity',
    format: (value: number) => value + 'kW',
  },
  {
    icon: PhotovoltaicPanel,
    label: '光伏装机量',
    field: 'photovoltaicInstalledCapacity',
    format: (value: number) => value + 'kWp',
  },
  {
    icon: EnergyStorageCapacity,
    label: '储能容量：',
    field: 'energyStorageCapacity',
  },
  {
    icon: ChargingStation,
    label: '充电桩装机量：',
    field: 'chargingStationCapacity',
    format: (value: number) => value + 'kWh',
  },
  {
    icon: Location,
    label: '站点地址：',
    field: 'address',
  },
];

export const DEFAULT_DATA = {
  name: '永泰光储充示范站',
  transformerCapacity: 800,
  photovoltaicInstalledCapacity: 280,
  energyStorageCapacityStorage: 500,
  energyStorageCapacityOutput: 200,
  chargingStationCapacity: 500,
  address: '深圳市龙华区观湖街道鹭湖社区观',
};
