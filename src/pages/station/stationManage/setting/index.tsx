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

const Setting = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `基础信息`,
      children: <StationInfo />,
    },
    {
      key: '2',
      label: `设备管理`,
      children: <Device />,
    },
    {
      key: '3',
      label: `运行管理`,
      children: <System />,
    },
    {
      key: '4',
      label: `参数设置`,
      children: <ParamsSetting />,
    },
    {
      key: '5',
      label: `电价管理`,
      children: <ElectricityPrice />,
    },
    {
      key: '6',
      label: `配置日志`,
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
