import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import styles from './index.less';
import ElectricityStatistic from './ElectricityStatistic';
import RevenueStatistic from './RevenueStatistic';

const Setting = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `电量统计`,
      children: <ElectricityStatistic key={'1'} />,
    },
    {
      key: '2',
      label: `收益统计`,
      children: <RevenueStatistic key={'2'} />,
    },
  ];

  return (
    <Tabs className={styles.tabsWrapper} tabBarGutter={34} defaultActiveKey="1" items={items} />
  );
};

export default Setting;
