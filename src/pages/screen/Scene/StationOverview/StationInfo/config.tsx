import icon_site_name from '@/assets/image/screen/stationOverview/icon_site_name.png';
import icon_location from '@/assets/image/screen/stationOverview/icon_location.png';
import icon_create_time from '@/assets/image/screen/stationOverview/icon_create_time.png';
import type { DetailItem } from '@/components/Detail';
import styles from './index.less';
import type { SiteInfoRes } from '../type';

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
];

export const stationBoxConfig = [
  {
    label: '变压器容量',
    field: 'transformerCapacity',
    unit: 'kVA',
  },
  {
    label: '光伏组串容量',
    field: 'photovoltaicInstalledCapacity',
    unit: 'kWp',
  },
  {
    label: '储能额定电量',
    field: 'energyStorageCapacityFront',
    render: (data: SiteInfoRes) => {
      return (
        <div className={styles.boxDescription}>
          <span className={styles.boxValue}>{data.energyStoragePower}</span>
          <span className={styles.boxUnit} style={{ marginRight: 4 }}>
            kw
          </span>
          <span className={styles.boxValue}>/</span>
          <span className={styles.boxValue}>{data.energyStorageCapacity}</span>
          <span className={styles.boxUnit}>kWh</span>
        </div>
      );
    },
  },
  {
    label: '充电桩总功率',
    field: 'chargingStationCapacity',
    unit: 'kW',
  },
];
