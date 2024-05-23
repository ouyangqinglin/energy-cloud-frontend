/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-23 10:40:18
 * @LastEditTime: 2024-05-23 11:42:45
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\layouts\loading\PageLoading.tsx
 */

import { PageLoading as AntPageLoading } from '@ant-design/pro-layout';
import React, { memo, useEffect, useMemo } from 'react';
import { useModel } from 'umi';

const PageLoading: React.FC = () => {
  const { refresh } = useModel('siteType');

  useMemo(() => {
    refresh();
  }, []);

  return (
    <>
      <AntPageLoading />
    </>
  );
};

export default memo(PageLoading);
