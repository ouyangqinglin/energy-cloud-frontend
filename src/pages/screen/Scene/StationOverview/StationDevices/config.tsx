import type { DeviceConfigItem } from '../component/type';
import styles from '../component/index.less';
import IconTransformerCapacity from '@/assets/image/screen/stationOverview/icon_transformer_capacity.png';
import IconPhotovoltaicPanel from '@/assets/image/screen/stationOverview/icon_photovoltaic_panel.png';
import IconEnergyStorageCapacity from '@/assets/image/screen/stationOverview/icon_energy_storage_capacity.png';
import iconChargingStation from '@/assets/image/screen/stationOverview/icon_charging_station.png';
import type { SiteInfoRes } from '../type';
import { formatMessage } from '@/utils';

export const DEFAULT_DATA = {
  bodyData: [
    [
      formatMessage({ id: 'device.pv', defaultMessage: '光伏' }),
      [
        formatMessage({ id: 'screen.inverter', defaultMessage: '逆变器' }),
        formatMessage({ id: 'screen.pvModule', defaultMessage: '光伏模组' }),
      ],
      ['1', '1'],
    ],
    [formatMessage({ id: 'device.storage', defaultMessage: '储能' }), ['Smart215-P0100A'], ['1']],
    [
      formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
      ['120kW', '160kW', '600kW'],
      ['1', '1', '1'],
    ],
  ],
  header: [
    formatMessage({ id: 'screen.subsystem', defaultMessage: '子系统' }),
    formatMessage({ id: 'screen.deviceName', defaultMessage: '设备名称' }),
    formatMessage({ id: 'screen.quantity', defaultMessage: '数量' }),
  ],
};

export const config: DeviceConfigItem[] = [
  {
    icon: IconTransformerCapacity,
    title: formatMessage({ id: 'screen.transformerCapacity', defaultMessage: '变压器容量' }),
    unit: 'kVA',
    field: 'transformerCapacity',
    span: 12,
    child: [
      {
        dividerSpan: 4,
        title: formatMessage({ id: 'screen.transformerNumber', defaultMessage: '变压器数量' }),
        defaultValue: 1,
        unit: '个',
        span: 8,
      },
    ],
  },
  {
    icon: IconPhotovoltaicPanel,
    title: formatMessage({ id: 'screen.pvStringCapacity', defaultMessage: '光伏组串容量' }),
    unit: 'kWh',
    field: 'photovoltaicInstalledCapacity',
    span: 12,
    child: [
      {
        dividerSpan: 4,
        title: formatMessage({
          id: 'screen.pvInvertersCapacity',
          defaultMessage: '光伏逆变器数量',
        }),
        field: 'pvinverterNumber',
        unit: '个',
        span: 8,
      },
    ],
  },
  {
    icon: IconEnergyStorageCapacity,
    title: formatMessage({ id: 'screen.energyStorageRating', defaultMessage: '储能额定电量' }),
    render: (data: SiteInfoRes) => {
      return (
        <>
          <span className={styles.value}>{data.energyStoragePower}</span>
          <span className={styles.unit}>kW</span>
          <span className={styles.value}>/{data.energyStorageCapacity}</span>
          <span className={styles.unit}>kWh</span>
        </>
      );
    },
    unit: 'kW',
    span: 12,
    child: [
      {
        dividerSpan: 4,
        title: formatMessage({ id: 'screen.storageDevicesNumber', defaultMessage: '储能设备数量' }),
        field: 'energyStorageNumber',
        unit: '个',
        span: 8,
      },
    ],
  },

  {
    icon: iconChargingStation,
    title: formatMessage({ id: 'screen.chargingTotalPower', defaultMessage: '充电桩总功率' }),
    field: 'chargingStationCapacity',
    unit: 'kWh',
    span: 7,
    gutter: 6,
    child: [
      {
        dividerSpan: 0,
        title: formatMessage({ id: 'screen.chargingStack', defaultMessage: '充电堆' }),
        field: 'chargingHostNumber',
        unit: '个',
        span: 5,
      },
      {
        dividerSpan: 0,
        title: formatMessage({ id: 'screen.overchargedPile', defaultMessage: '超充桩' }),
        field: 'overchargedPileNumber',
        unit: '个',
        span: 4,
      },
      {
        dividerSpan: 0,
        title: formatMessage({ id: 'screen.fastchargedPile', defaultMessage: '快充桩' }),
        field: 'fastFillingPileNumber',
        unit: '个',
        span: 4,
      },
      {
        dividerSpan: 0,
        title: formatMessage({ id: 'screen.communicationPile', defaultMessage: '交流桩' }),
        field: 'acpileNumber',
        unit: '个',
        span: 4,
      },
    ],
  },
];
