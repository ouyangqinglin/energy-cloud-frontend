/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:36:55
 * @LastEditTime: 2023-08-30 19:06:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteRange\index.tsx
 */
import React, { useEffect, useMemo } from 'react';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';
import Chart from '@/components/Chart';
import { getPowerData } from './service';
import { useRequest } from 'umi';
import { REQUEST_INTERVAL_5_MINUTE } from '../config';
import { merge } from 'lodash';

const sourceItem = {
  name: '光储充站',
  type: 'source',
  count: 0,
  itemStyle: {
    color: '#20e7f0',
  },
  label: {
    show: true,
    position: 'left',
    formatter: (params: any) => {
      const { name, count } = params.data;
      return `{a|${name}}` + `{b|${count}}` + '{a|个}';
    },
    rich: {
      a: {
        color: '#fff',
        fontSize: '14px',
      },
      b: {
        color: ' #4DD6F0',
        fontSize: '16px',
      },
    },
  },
};

const targetItem = {
  name: 'A站点A站点A站点A站点A站点',
  itemStyle: {
    color: '#159AFF',
  },
  count: 12,
  label: {
    show: true,
    position: 'insideRight',
    offset: [10, 0],
    formatter: (params: any) => {
      const { name, count } = params.data;
      return `{a|${name}}` + `{b|}` + `{c|${count}}`;
    },
    rich: {
      a: {
        color: '#fff',
        fontSize: '14px',
      },
      b: {
        width: 40,
      },
      c: {
        color: ' #fff',
        fontSize: '14px',
      },
    },
  },
};

const SiteRange: React.FC = () => {
  const { data: installData } = useRequest(getPowerData, {
    pollingInterval: REQUEST_INTERVAL_5_MINUTE,
  });

  const options = useMemo(() => {
    const result = {
      series: {
        type: 'sankey',
        layout: 'none',
        layoutIterations: 0,
        left: 85,
        right: 100,
        lineStyle: {
          color: 'target',
          opacity: 0.5,
          curveness: 0.5,
        },
        data: [],
        links: [],
      },
    };
    const source: any[] = [],
      target: any[] = [],
      links: any[] = [];
    installData?.forEach?.((item) => {
      source.push(
        merge({}, sourceItem, {
          name: item.name,
          count: item.sites?.length,
        }),
      );
    });
    return result;
  }, [installData]);

  return (
    <>
      <Cell cursor="default" width={400} height={618} left={24} top={90}>
        <DecorationCarousel panelStyle={{ padding: 0 }} title="站点排名">
          <Chart option={options} style={{ height: 300 }} calculateMax={false} />
        </DecorationCarousel>
      </Cell>
    </>
  );
};

export default SiteRange;
