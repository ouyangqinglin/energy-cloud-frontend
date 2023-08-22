/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:54:42
 * @LastEditTime: 2023-08-22 09:54:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SystemRun\index.tsx
 */
import React from 'react';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';

const SystemRun: React.FC = () => {
  return (
    <>
      <Cell cursor="default" width={400} height={324} left={24} bottom={24}>
        <DecorationCarousel
          valueType="timeButtonGroup"
          panelStyle={{ padding: 0 }}
          title="系统运行数据"
        ></DecorationCarousel>
      </Cell>
    </>
  );
};

export default SystemRun;
