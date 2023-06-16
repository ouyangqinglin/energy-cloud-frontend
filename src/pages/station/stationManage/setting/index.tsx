import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import ElectricityPrice from './ElectricityPrice';
import styles from './index.less';
import System from './System';
import StationInfo from '../info/stationInfo';
import Record from './Record';

const Setting = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `站点信息`,
      children: <StationInfo />,
    },
    {
      key: '2',
      label: `系统设置`,
      children: <System />,
    },
    // {
    //   key: '3',
    //   label: `告警规则`,
    //   children: `Content of Tab Pane 3`,
    // },
    {
      key: '4',
      label: `电价设置`,
      children: <ElectricityPrice />,
    },
    // {
    //   key: '5',
    //   label: `用户管理`,
    //   // children: <ElectricityPrice />,
    // },
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
