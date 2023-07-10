/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 15:58:33
 * @LastEditTime: 2023-07-10 19:34:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\work-order\maintenance\index.tsx
 */

import React from 'react';
import WorkOrder, { PageTypeEnum } from '../components/workOrder';

const Install: React.FC = () => {
  return (
    <>
      <WorkOrder type={PageTypeEnum.Maintenance} />
    </>
  );
};

export default Install;
