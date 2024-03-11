/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 17:06:12
 * @LastEditTime: 2023-07-04 17:06:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\alarm\Setting\index.tsx
 */
import React from 'react';
import EmptyPage from '@/components/EmptyPage';
import { formatMessage } from '@/utils';

const Index: React.FC = () => {
  return (
    <>
      <EmptyPage description={formatMessage({ id: 'common.noneYet', defaultMessage: '暂无' })} />
    </>
  );
};

export default Index;
