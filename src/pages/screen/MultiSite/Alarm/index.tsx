/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:56:33
 * @LastEditTime: 2023-08-22 09:56:37
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Alarm\index.tsx
 */
import React from 'react';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';

const Alarm: React.FC = () => {
  return (
    <>
      <Cell cursor="default" width={400} height={143} right={24} top={90}>
        <DecorationCarousel panelStyle={{ padding: 0 }} title="告警"></DecorationCarousel>
      </Cell>
    </>
  );
};

export default Alarm;
