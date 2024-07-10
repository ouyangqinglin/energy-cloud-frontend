import React, { useMemo } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styles from './index.less';
import { useAuthority } from '@/hooks';
import Owner from './Owner';
import Dept from './Dept';
import Customer from './Service';
import { formatMessage } from '@/utils';

const UserManage: React.FC = () => {
  const { authorityMap } = useAuthority([
    'orgManage:system',
    'orgManage:install',
    'orgManage:owner',
    'orgManage:operator',
  ]);

  const items = useMemo<TabsProps['items']>(() => {
    const result: TabsProps['items'] = [];
    if (authorityMap.get('orgManage:system')) {
      result.push({
        key: '1',
        label: formatMessage({ id: 'system.systemAdministrator', defaultMessage: '系统管理员' }),
        children: <Dept />,
      });
    }
    if (authorityMap.get('orgManage:install')) {
      result.push({
        key: '2',
        label: formatMessage({ id: 'system.installer', defaultMessage: '安装商' }),
        children: <Customer />,
      });
    }
    if (authorityMap.get('orgManage:owner')) {
      result.push({
        key: '3',
        label: formatMessage({ id: 'system.owner', defaultMessage: '业主' }),
        children: <Owner />,
      });
    }
    // if (authorityMap.get('orgManage:operator')) {
    //   result.push({
    //     key: '4',
    //     label: formatMessage({ id: 'system.operator', defaultMessage: '运营商' }),
    //     children: <Operator />,
    //   });
    // }
    return result;
  }, [authorityMap]);

  return (
    <>
      <Tabs className={styles.tabs} items={items} />
    </>
  );
};

export default UserManage;
