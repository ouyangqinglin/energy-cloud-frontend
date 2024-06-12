/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 14:03:47
 * @LastEditTime: 2024-06-12 16:39:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteRange\index.tsx
 */
import React from 'react';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';
import ElecPower from './ElecPower';
import Income from './Income';
import { formatMessage } from '@/utils';
import { ErrorBoundary } from 'react-error-boundary';
import FallBackRender from '@/components/FallBackRender';

const SiteRange: React.FC = () => {
  return (
    <>
      <Cell cursor="default" width={400} height={618} left={24} top={90}>
        <DecorationCarousel
          panelStyle={{ padding: '16px' }}
          title={formatMessage({ id: 'screen.siteRanking', defaultMessage: '站点排名' })}
        >
          <ErrorBoundary fallbackRender={FallBackRender}>
            <ElecPower />
          </ErrorBoundary>
          <ErrorBoundary fallbackRender={FallBackRender}>
            <Income />
          </ErrorBoundary>
        </DecorationCarousel>
      </Cell>
    </>
  );
};

export default SiteRange;
