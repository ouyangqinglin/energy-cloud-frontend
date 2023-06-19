/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 15:53:39
 * @LastEditTime: 2023-06-19 15:53:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\workOrder\install\index.tsx
 */

import React from 'react';
import WorkOrder, { PageTypeEnum } from '../components/workOrder';

const Install: React.FC = () => {
  return (
    <>
      <WorkOrder type={PageTypeEnum.Install} />
    </>
  );
};

export default Install;
