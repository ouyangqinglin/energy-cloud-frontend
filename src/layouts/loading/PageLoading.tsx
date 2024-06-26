/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-23 10:40:18
 * @LastEditTime: 2024-06-25 11:21:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\layouts\loading\PageLoading.tsx
 */

import { PageLoading as AntPageLoading } from '@ant-design/pro-layout';
import React, { memo, useMemo } from 'react';
import { useModel } from 'umi';
import defaultSettings from '../../../config/defaultSettings';

const PageLoading: React.FC = () => {
  const { refresh } = useModel('siteType');

  useMemo(() => {
    if (!defaultSettings.authorityWhiteList?.includes(window.location.pathname)) {
      refresh();
    }
  }, []);

  return (
    <>
      <AntPageLoading />
    </>
  );
};

export default memo(PageLoading);
