/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-07 16:34:39
 * @LastEditTime: 2023-07-07 16:48:31
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\UserManage\index.tsx
 */

import React, { useMemo } from 'react';
import { Tabs, TabsProps } from 'antd';
import Account from './Account.tsx';
import Authority from '@/pages/user-manager/authority';
import DeptTableList from '../dept';
import styles from './index.less';

const UserManage: React.FC = () => {
  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: '账号管理',
        children: <Account />,
      },
      {
        key: '2',
        label: '权限管理',
        children: <Authority />,
      },
      {
        key: '3',
        label: '组织管理',
        children: <DeptTableList />,
      },
    ];
  }, []);

  return (
    <>
      <Tabs className={styles.tabs} items={items} />
    </>
  );
};

export default UserManage;
