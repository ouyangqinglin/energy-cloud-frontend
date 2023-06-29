/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-29 14:02:30
 * @LastEditTime: 2023-06-29 14:13:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\alarm\index.tsx
 */

import React from 'react';
import Alarm from '@/components/Alarm';

const Index: React.FC = () => {
  return (
    <>
      <Alarm isStationChild={true} />
    </>
  );
};

export default Index;
