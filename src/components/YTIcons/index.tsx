/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-15 14:54:55
 * @LastEditTime: 2023-06-25 18:58:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\YTIcons\index.tsx
 */
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import {
  Home,
  Station,
  WorkOrder,
  Data,
  Device,
  Partner,
  User,
  RemoteUpgrade,
  Setting,
  Photovoltaic,
  PVInverter,
  Energy,
  Ems,
  Bms,
  Air,
  Meter,
  Charge,
  Electric,
  Battery,
  Cabinet,
} from './YTSvg';

const YTHomeOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Home} {...props} />
);

const YTStationOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Station} {...props} />
);

const YTWorkOrderOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={WorkOrder} {...props} />
);

const YTDataOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Data} {...props} />
);

const YTDeviceOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Device} {...props} />
);

const YTPartnerOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Partner} {...props} />
);

const YTUserOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={User} {...props} />
);

const YTRemoteUpgradeOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={RemoteUpgrade} {...props} />
);

const YTSettingOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Setting} {...props} />
);

const YTPhotovoltaicOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Photovoltaic} {...props} />
);

const YTPVInverterOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={PVInverter} {...props} />
);

const YTEnergyOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Energy} {...props} />
);

const YTEmsOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Ems} {...props} />
);

const YTBmsOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Bms} {...props} />
);

const YTAirOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Air} {...props} />
);

const YTMeterOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Meter} {...props} />
);

const YTChargeOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Charge} {...props} />
);

const YTElectricOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Electric} {...props} />
);

const YTBatteryOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Battery} {...props} />
);

const YTChargeStackOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Charge} {...props} />
);

const YTCabinetOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Cabinet} {...props} />
);

export {
  YTHomeOutlined,
  YTStationOutlined,
  YTWorkOrderOutlined,
  YTDataOutlined,
  YTDeviceOutlined,
  YTPartnerOutlined,
  YTUserOutlined,
  YTRemoteUpgradeOutlined,
  YTSettingOutlined,
  YTPhotovoltaicOutlined,
  YTPVInverterOutlined,
  YTEnergyOutlined,
  YTEmsOutlined,
  YTBmsOutlined,
  YTAirOutlined,
  YTMeterOutlined,
  YTChargeOutlined,
  YTElectricOutlined,
  YTBatteryOutlined,
  YTChargeStackOutlined,
  YTCabinetOutlined,
};
