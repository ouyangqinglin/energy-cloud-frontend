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

const Index: React.FC = () => {
  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: '自定义角色',
        children: <Authority type="1" />,
      },
      {
        key: '2',
        label: '预定义角色',
        children: <Authority type="0" />,
      },
    ];
  }, []);

  return (
    <>
      <Tabs className="category-tabs" items={items} tabBarGutter={24} />
    </>
  );
};

export default Index;
