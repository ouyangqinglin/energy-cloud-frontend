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
    field: 'siteType',
  },
  // {
  //   icon: SiteType,
  //   label: '站点类型：',
  //   field: 'voltageLevel',
  // },
  {
    icon: TransformerCapacity,
    label: '电压等级：',
    field: 'transformerCapacity',
  },
  {
    icon: PhotovoltaicPanel,
    label: '变压器容量：',
    field: 'photovoltaicPanel',
  },
  {
    icon: EnergyStorageCapacity,
    label: '光伏装机量：',
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
