import { ReactComponent as SiteName } from '@/assets/image/screen/decoration/site_name.svg';
import { ReactComponent as SiteType } from '@/assets/image/screen/decoration/site_type.svg';
import { ReactComponent as ChargingStation } from '@/assets/image/screen/decoration/charging_station.svg';
import { ReactComponent as EnergyStorageCapacity } from '@/assets/image/screen/decoration/energy_storage_capacity.svg';
import { ReactComponent as Location } from '@/assets/image/screen/decoration/location.svg';
import { ReactComponent as PhotovoltaicPanel } from '@/assets/image/screen/decoration/photovoltaic_panel.svg';
import { ReactComponent as TransformerCapacity } from '@/assets/image/screen/decoration/transformer_capacity.svg';

export const stationInfoConfig = [
  {
    icon: SiteName,
    label: '站点名称：',
    field: 'siteType',
  },
  {
    icon: SiteType,
    label: '站点类型：',
    field: 'voltageLevel',
  },
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
