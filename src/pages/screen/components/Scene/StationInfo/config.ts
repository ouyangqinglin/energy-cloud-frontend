import SiteName from '@/assets/image/screen/siteInfo/site_name.png';
// import { ReactComponent as SiteType } from '@/assets/image/screen/siteInfo/site_type.png';
import ChargingStation from '@/assets/image/screen/siteInfo/charging_station.png';
import EnergyStorageCapacity from '@/assets/image/screen/siteInfo/energy_storage_capacity.png';
import Location from '@/assets/image/screen/siteInfo/location.png';
import PhotovoltaicPanel from '@/assets/image/screen/siteInfo/photovoltaic_panel.png';
import TransformerCapacity from '@/assets/image/screen/siteInfo/transformer_capacity.png';

export const stationInfoConfig = [
  {
    icon: SiteName,
    label: '站点名称：',
    field: 'siteName',
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
  },
  {
    icon: PhotovoltaicPanel,
    label: '光伏装机量',
    field: 'photovoltaicPanel',
  },
  {
    icon: EnergyStorageCapacity,
    label: '储能容量：',
    field: 'energyStorageCapacity',
  },
  {
    icon: ChargingStation,
    label: '充电桩装机量：',
    field: 'chargingStation',
  },
  {
    icon: Location,
    label: '站点地址：',
    field: 'location',
  },
];

export const DEFAULT_DATA = {
  siteName: '永泰光储充示范站',
  transformerCapacity: '800kW',
  photovoltaicPanel: '280kWp',
  energyStorageCapacity: '500kWh/200kWh',
  chargingStation: '500kWh',
  location: '深圳市龙华区观湖街道鹭湖社区观',
};

export const mapKey = {
  siteName: 'name',
  transformerCapacity: 'transformerCapacity',
  photovoltaicPanel: 'photovoltaicInstalledcapacity',
  energyStorageCapacity: 'energystorageCapacitystorage',
  energyStorageOutput: 'energyStorageCapacityOutput',
  chargingStation: 'chargingstationCapacity',
  location: 'address',
};
