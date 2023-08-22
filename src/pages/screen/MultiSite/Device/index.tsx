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

const Device: React.FC = () => {
  return (
    <>
      <Cell cursor="default" width={400} height={223} right={24} top={546}>
        <DecorationCarousel panelStyle={{ padding: 0 }} title="设备"></DecorationCarousel>
      </Cell>
    </>
  );
};

export default Device;
