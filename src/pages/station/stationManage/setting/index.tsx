import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import styles from './index.less';
import StationInfo from '../info/stationInfo';
import System from './System';
import ElectricityPrice from './ElectricityPrice';
import Record from './Record';
import Account from './Account';
import ParamsSetting from './ParamsSetting';

const Setting = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `基础信息`,
      children: <StationInfo />,
    },
    {
      key: '2',
      label: `运行管理`,
      children: <System />,
    },
    {
      key: '3',
      label: `电价管理`,
      children: <ElectricityPrice />,
    },
    {
      key: '4',
      label: `用户管理`,
      children: <Account />,
    },
    {
      key: '5',
      label: `参数设置`,
      children: <ParamsSetting />,
    },
    {
      key: '6',
      label: `设置记录`,
      children: <Record />,
    },
  ];

  return (
    <Tabs className={styles.tabsWrapper} tabBarGutter={34} defaultActiveKey="1" items={items} />
  );
};

export default Setting;
