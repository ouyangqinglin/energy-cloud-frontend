/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 14:03:47
 * @LastEditTime: 2023-08-31 14:29:00
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteRange\index.tsx
 */
import React from 'react';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';
import ElecPower from './ElecPower';
import Income from './Income';

const SiteRange: React.FC = () => {
  return (
    <>
      <Cell cursor="default" width={400} height={618} left={24} top={90}>
        <DecorationCarousel panelStyle={{ padding: '16px' }} title="站点排名">
          <ElecPower />
          <Income />
        </DecorationCarousel>
      </Cell>
    </>
  );
};

export default SiteRange;
