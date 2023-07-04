/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-29 14:02:30
 * @LastEditTime: 2023-07-04 10:31:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\alarm\index.tsx
 */

import React from 'react';
import { useModel } from 'umi';
import Alarm from '@/components/Alarm';

const Index: React.FC = () => {
  const { siteId } = useModel('station', (model) => ({ siteId: model?.state.id }));

  return (
    <>
      <Alarm isStationChild={true} params={{ siteId }} />
    </>
  );
};

export default Index;
