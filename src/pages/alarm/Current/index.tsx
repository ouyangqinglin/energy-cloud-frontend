/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 16:56:27
 * @LastEditTime: 2023-07-27 09:18:27
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\alarm\Current\index.tsx
 */

import React from 'react';
import { useLocation } from '@/hooks';
import Alarm, { PageTypeEnum } from '@/components/Alarm/AlarmTable';

export type SearchParamsType = {
  siteId?: string;
  deviceName?: string;
};

const Index: React.FC = () => {
  const location = useLocation<SearchParamsType>();

  return (
    <>
      <Alarm type={PageTypeEnum.Current} formParam={location?.query} />
    </>
  );
};

export default Index;
