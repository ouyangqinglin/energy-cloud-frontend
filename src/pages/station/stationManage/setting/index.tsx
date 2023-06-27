import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import styles from './index.less';
import StationInfo from '../info/stationInfo';
import Record from './Record';
import Account, { PageTypeEnum } from '../../../user-manager/accounts/account';
import ParamsSetting from './ParamsSetting';

const Setting = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `用户管理`,
      children: <Account type={PageTypeEnum.Station} />,
    },
    {
      key: '2',
      label: `参数设置`,
      children: <ParamsSetting />,
    },
    {
      key: '3',
      label: `设置记录`,
      children: <Record />,
    },
  ];

  return (
    <Tabs className={styles.tabsWrapper} tabBarGutter={34} defaultActiveKey="1" items={items} />
  );
};

export default Setting;
