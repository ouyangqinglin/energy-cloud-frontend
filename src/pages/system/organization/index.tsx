import React, { useMemo } from 'react';
import { Tabs, TabsProps } from 'antd';
import Authority from '@/pages/user-manager/authority';
import DeptTableList from '../dept';
import styles from './index.less';
import { useAuthority } from '@/hooks';
import Customer from '@/pages/partner/service';
import Operator from './Operator';
import Owner from './Owner';

const UserManage: React.FC = () => {
  const { authorityMap } = useAuthority(['system:user:authority', 'system:user:org']);

  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: '安装商',
        children: <Customer />,
      },
      {
        key: '2',
        label: '运营商',
        children: <Operator />,
      },
      {
        key: '3',
        label: '业主',
        children: <Owner />,
      },
      {
        key: '4',
        label: '系统管理',
        children: <DeptTableList />,
      },
    ];
  }, [authorityMap]);

  return (
    <>
      <Tabs className={styles.tabs} items={items} />
    </>
  );
};

export default UserManage;
