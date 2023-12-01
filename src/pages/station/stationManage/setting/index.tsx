import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import styles from './index.less';
import StationInfo from '../info/stationInfo';
import System from './System';
import ElectricityPrice from './ElectricityPrice';
import Record from './Record';
import Account from './Account';
import ParamsSetting from './ParamsSetting';
import Device from './Device';
import {formatMessage} from "@/utils";

const Setting = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: formatMessage({ id: 'siteManage.set.baseInfo', defaultMessage: '基础信息' }),
      children: <StationInfo />,
    },
    {
      key: '2',
      label: formatMessage({ id: 'siteManage.set.deviceManage', defaultMessage: '设备管理' }),
      children: <Device />,
    },
    {
      key: '3',
      label: formatMessage({ id: 'siteManage.set.operateManagement', defaultMessage: '运行管理' }),
      children: <System />,
    },
    {
      key: '4',
      label: formatMessage({ id: 'siteManage.set.systemParameterSet', defaultMessage: '系统参数设置' }),
      children: <ParamsSetting />,
    },
    {
      key: '5',
      label: formatMessage({ id: 'siteManage.set.electricPriceManagement', defaultMessage: '电价管理' }),
      children: <ElectricityPrice />,
    },
    {
      key: '6',
      label: formatMessage({ id: 'siteManage.set.configLog', defaultMessage: '配置日志' }),
      children: <Record />,
    },
  ];

  return (
    <Tabs
      className={`${styles.tabsWrapper}`}
      tabBarGutter={34}
      defaultActiveKey="1"
      items={items}
    />
  );
};

export default Setting;
