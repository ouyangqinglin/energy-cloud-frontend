/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-07 16:34:39
 * @LastEditTime: 2023-07-25 14:14:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\UserManage\index.tsx
 */

import React, { useMemo } from 'react';
import { Tabs, TabsProps } from 'antd';
import Account from './Account.tsx';
import Authority from './Authority';
import styles from './index.less';
import { useAuthority } from '@/hooks';

const UserManage: React.FC = () => {
  const { authorityMap } = useAuthority(['system:user:authority', 'system:user:org']);

  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: '账号管理',
        children: <Account />,
      },
      ...(authorityMap.get('system:user:authority')
        ? [
            {
              key: '2',
              label: '权限管理',
              children: <Authority />,
            },
          ]
        : []),
    ];
  }, [authorityMap]);

  return (
    <>
      <Tabs className={styles.tabs} items={items} />
    </>
  );
};

export default UserManage;
