/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 10:05:05
 * @LastEditTime: 2023-08-22 10:05:45
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SaveEnergy\index.tsx
 */
import React from 'react';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';

const SaveEnergy: React.FC = () => {
  return (
    <>
      <Cell cursor="default" width={400} height={267} right={24} bottom={24}>
        <DecorationCarousel panelStyle={{ padding: 0 }} title="节能减排"></DecorationCarousel>
      </Cell>
    </>
  );
};

export default SaveEnergy;
