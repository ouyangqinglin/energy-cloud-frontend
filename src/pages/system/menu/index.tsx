import React, { useMemo } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import MenuList from './components/MenuList';
import styles from './index.less';

const Menu: React.FC = () => {
  const tabsItem: TabsProps['items'] = useMemo(() => {
    return [
      {
        key: '0',
        label: 'Web',
        children: <MenuList menuType="0" />,
      },
      {
        key: '1',
        label: 'App',
        children: <MenuList menuType="1" />,
      },
    ];
  }, []);
  return <Tabs size="large" className={styles.tabs} items={tabsItem} />;
};
export default Menu;
