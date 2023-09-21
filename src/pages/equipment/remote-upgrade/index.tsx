import React, { useMemo } from 'react';
import { Tabs, TabsProps } from 'antd';
import styles from './index.less';
import { useAuthority } from '@/hooks';
import Package from './package';
import UpgradeTask from './upgradeTask';
import Log from './log';


const UpgradeManage: React.FC = () => {
  const { authorityMap } = useAuthority(['system:user:authority', 'system:user:org']);

  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: '升级包管理',
        children: <Package />,
      },
      {
        key: '2',
        label: '升级任务',
        children: <UpgradeTask />,
      },
      {
        key: '3',
        label: '升级记录',
        children: <Log />,
      },
    ];
  }, [authorityMap]);

  return (
    <>
      <Tabs className={styles.tabs} items={items} />
    </>
  );
};

export default UpgradeManage;
