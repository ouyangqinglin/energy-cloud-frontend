/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-17 17:11:13
 * @LastEditTime: 2023-08-18 16:06:06
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\product-manage\ProductDetail\index.tsx
 */

import React from 'react';
import { useLocation } from '@/hooks';
import { Tabs, TabsProps } from 'antd';
import MyDetail from './Detail';
import Module from './Module';

const ProductDetail: React.FC = () => {
  const location = useLocation<{ id?: string }>();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '产品详情',
      children: <MyDetail id={location.query?.id} />,
    },
    {
      key: '2',
      label: '模块管理',
      children: <Module id={location.query?.id} />,
    },
  ];

  return (
    <>
      <Tabs className="page-tabs" tabBarGutter={34} items={items} />
    </>
  );
};

export default ProductDetail;
