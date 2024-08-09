import React, { useMemo } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import styles from './index.less';
import { useAuthority } from '@/hooks';
import Package from './package';
import UpgradeTask from './upgradeTask';
import Log from './log';
import { formatMessage } from '@/utils';

const UpgradeManage: React.FC = () => {
  const { authorityMap } = useAuthority([
    'system:user:authority',
    'system:user:org',
    'upgradManage:package:manage',
    'upgradManage:package:task',
    'upgradManage:package:log',
  ]);

  const items = useMemo(() => {
    const result: TabsProps['items'] = [];
    if (authorityMap.get('upgradManage:package:manage')) {
      result.push({
        key: '1',
        label: formatMessage({ id: 'upgradeManage.upgradePack', defaultMessage: '升级包管理' }),
        children: <Package />,
      });
    }
    if (authorityMap.get('upgradManage:package:task')) {
      result.push({
        key: '2',
        label: formatMessage({ id: 'upgradeManage.upgradeTask', defaultMessage: '升级任务' }),
        children: <UpgradeTask />,
      });
    }
    if (authorityMap.get('upgradManage:package:log')) {
      result.push({
        key: '3',
        label: formatMessage({ id: 'upgradeManage.upgradeLog', defaultMessage: '升级记录' }),
        children: <Log />,
      });
    }
    return result;
  }, [authorityMap]);

  return (
    <>
      <Tabs className={styles.tabs} items={items} />
    </>
  );
};

export default UpgradeManage;
