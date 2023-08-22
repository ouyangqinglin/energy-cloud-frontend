/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:36:55
 * @LastEditTime: 2023-08-22 09:47:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteRange\index.tsx
 */
import React from 'react';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';

const SiteRange: React.FC = () => {
  return (
    <>
      <Cell cursor="default" width={400} height={618} left={24} top={90}>
        <DecorationCarousel panelStyle={{ padding: 0 }} title="站点排名"></DecorationCarousel>
      </Cell>
    </>
  );
};

export default SiteRange;
