/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-25 14:08:12
 * @LastEditTime: 2023-07-25 14:17:37
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\UserManage\Authority\index.tsx
 */
import React, { useMemo } from 'react';
import { Tabs, TabsProps } from 'antd';
import Authority from '@/pages/user-manager/authority';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';

const Index: React.FC = () => {
  const { authorityMap } = useAuthority(['system:role:custom', 'system:role:predefine']);

  const items = useMemo<TabsProps['items']>(() => {
    return [
      ...(authorityMap.get('system:role:custom')
        ? [
            {
              key: '1',
              label: formatMessage({ id: 'user.customRole', defaultMessage: '自定义角色' }),
              children: <Authority type="1" />,
            },
          ]
        : []),
      ...(authorityMap.get('system:role:predefine')
        ? [
            {
              key: '2',
              label: formatMessage({ id: 'user.predefinedRoles', defaultMessage: '预定义角色' }),
              children: <Authority type="0" />,
            },
          ]
        : []),
    ];
  }, [authorityMap]);

  return (
    <>
      <Tabs className="category-tabs" items={items} tabBarGutter={24} />
    </>
  );
};

export default Index;
