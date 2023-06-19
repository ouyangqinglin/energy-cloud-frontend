/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-15 14:54:55
 * @LastEditTime: 2023-06-19 19:33:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\YTIcons\index.tsx
 */
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import {
  HomeSvg,
  StationSvg,
  WorkOrderSvg,
  DataSvg,
  DeviceSvg,
  PartnerSvg,
  UserSvg,
  RemoteUpgradeSvg,
  SettingSvg,
} from './YTSvg';

const YTHomeOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={HomeSvg} {...props} />
);

const YTStationOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={StationSvg} {...props} />
);

const YTWorkOrderOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={WorkOrderSvg} {...props} />
);

const YTDataOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DataSvg} {...props} />
);

const YTDeviceOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DeviceSvg} {...props} />
);

const YTPartnerOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={PartnerSvg} {...props} />
);

const YTUserOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={UserSvg} {...props} />
);

const YTRemoteUpgradeOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={RemoteUpgradeSvg} {...props} />
);

const YTSettingOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SettingSvg} {...props} />
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
};
