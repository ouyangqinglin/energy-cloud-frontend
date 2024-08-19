/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-17 17:11:13
 * @LastEditTime: 2024-08-16 17:47:57
 * @LastEditors: YangJianFei
 * @FilePath: /energy-cloud-frontend/src/pages/product-manage/ProductDetail/index.tsx
 */

import React from 'react';
import { useLocation } from '@/hooks';
import { Tabs, TabsProps } from 'antd';
import MyDetail from './Detail';
import Module from './Module';
import { formatMessage } from '@/utils';

const ProductDetail: React.FC = () => {
  const location = useLocation<{ id?: string }>();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: formatMessage({ id: 'user.productDetails', defaultMessage: '产品详情' }),
      children: <MyDetail id={location.query?.id} />,
    },
    {
      key: '2',
      label: formatMessage({ id: 'user.moduleManagement', defaultMessage: '模块管理' }),
      children: <Module id={location.query?.id} />,
    },
  ];

  return (
    <>
      <MyDetail id={location.query?.id} />
      {/* <Tabs className="page-tabs" tabBarGutter={34} items={items} /> */}
    </>
  );
};

export default ProductDetail;
