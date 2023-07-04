/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 16:56:27
 * @LastEditTime: 2023-07-04 17:00:17
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\alarm\Current\index.tsx
 */

import React from 'react';
import Alarm, { PageTypeEnum } from '@/components/Alarm/AlarmTable';

const Index: React.FC = () => {
  return (
    <>
      <Alarm type={PageTypeEnum.Current} />
    </>
  );
};

export default Index;
