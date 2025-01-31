/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 16:58:19
 * @LastEditTime: 2023-07-04 16:58:19
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\alarm\History\index.tsx
 */

import React from 'react';
import Alarm, { PageTypeEnum } from '@/components/Alarm/AlarmTable';

const Index: React.FC = () => {
  return (
    <>
      <Alarm type={PageTypeEnum.History} />
    </>
  );
};

export default Index;
