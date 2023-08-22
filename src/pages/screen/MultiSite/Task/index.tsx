/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:57:57
 * @LastEditTime: 2023-08-22 09:58:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Task\index.tsx
 */
import React from 'react';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';

const Task: React.FC = () => {
  return (
    <>
      <Cell cursor="default" width={400} height={273} right={24} top={253}>
        <DecorationCarousel panelStyle={{ padding: 0 }} title="任务"></DecorationCarousel>
      </Cell>
    </>
  );
};

export default Task;
