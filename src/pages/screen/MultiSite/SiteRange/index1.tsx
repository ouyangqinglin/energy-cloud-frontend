/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:36:55
 * @LastEditTime: 2023-08-22 09:47:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteRange\index.tsx
 */
import React, { useEffect } from 'react';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';
import * as echarts from 'echarts';

const colorItem = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0,
      color: '#44CCFF', // 0% 处的颜色
    },
    {
      offset: 1,
      color: '#00FFE2', // 100% 处的颜色
    },
  ],
  global: false, // 缺省为 false
};
const labelOption = {
  show: true,
  position: 'left',
  formatter: function (params: any) {
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
};
const labelOptionTargetFn = (num: number) => {
  const len = num.toString().length + 1;
  const dis = (25 + 8 * len) * -1;
  return {
    show: true,
    position: 'right',
    offset: [dis, 0],
    formatter: function (params: any) {
      const { name } = params.data;
      return `{a|${num}}` + `{b|}` + `{c|${name}}`;
    },
    rich: {
      a: {
        color: '#fff',
        fontSize: '14px',
        opacity: 0.3,
      },
      b: {
        width: 40,
      },
      c: {
        color: ' #fff',
        fontSize: '14px',
      },
    },
  };
};

const mockData = [
  {
    name: '光能充站',
    type: 'source',
    count: 3,
    itemStyle: {
      color: colorItem,
    },
    label: { ...labelOption },
  },
  {
    name: '光储站',
    count: 3,
    type: 'source',
    itemStyle: {
      color: colorItem,
    },
    label: { ...labelOption },
  },
  {
    name: '储充站',
    count: 3,
    type: 'source',
    itemStyle: {
      color: colorItem,
    },
    label: { ...labelOption },
  },
  {
    name: '光伏站',
    count: 3,
    type: 'source',
    itemStyle: {
      color: colorItem,
    },
    label: { ...labelOption },
  },
  {
    name: '储能站',
    count: 3,
    type: 'source',
    itemStyle: {
      color: colorItem,
    },
    label: { ...labelOption },
  },
  {
    name: '充电站',
    count: 3,
    type: 'source',
    itemStyle: {
      color: colorItem,
    },
    label: { ...labelOption },
  },
  {
    name: 'A站点',
    count: 300,
    type: 'target',
    itemStyle: {
      color: '#159AFF',
    },
    label: labelOptionTargetFn(360),
  },
  {
    name: 'B站点',
    count: 3000,
    type: 'target',
    itemStyle: {
      color: '#01CFA1 ',
    },
    label: labelOptionTargetFn(3000),
  },
  {
    name: 'C站点',
    type: 'target',
    count: 3,
    itemStyle: {
      color: '#FFD15C',
    },
    label: labelOptionTargetFn(3),
  },
  {
    name: 'D站点',
    type: 'target',
    count: 3,
    itemStyle: {
      color: '#FF7B7B',
    },
    label: labelOptionTargetFn(3000),
  },
  {
    name: 'E站点',
    type: 'target',
    count: 3,
    itemStyle: {
      color: '#FF8144',
    },
    label: labelOptionTargetFn(3000),
  },
  {
    name: '其他站点',
    type: 'target',
    count: 3,
    itemStyle: {
      color: '#34B9FF',
    },
    label: labelOptionTargetFn(20),
  },
];
const mockLinks = [
  {
    source: '光能充站',
    target: 'A站点',
    value: 40,
  },
  {
    source: '光能充站',
    target: 'B站点',
    value: 40,
  },
  {
    source: '光储站',
    target: 'B站点',
    value: 80,
  },
  {
    source: '储充站',
    target: 'C站点',
    value: 30,
  },
  {
    source: '光伏站',
    target: 'D站点',
    value: 50,
  },
  {
    source: '储能站',
    target: 'E站点',
    value: 50,
  },
  {
    source: '充电站',
    target: '其他站点',
    value: 50,
  },
];

const SiteRange: React.FC = () => {
  const init = () => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    const option = {
      series: {
        type: 'sankey',
        draggable: false,
        layout: 'none',
        emphasis: {
          focus: 'adjacency',
        },
        edgeLabel: {
          show: false,
          align: 'right',
        },
        lineStyle: {
          color: 'target',
          opacity: 0.1,
        },
        left: 85,
        right: 85,
        data: mockData,
        links: mockLinks,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    option && myChart.setOption(option);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <Cell cursor="default" width={400} height={618} left={24} top={90}>
        <DecorationCarousel panelStyle={{ padding: 0 }} title="站点排名">
          <div
            id="main"
            style={{
              width: '100%',
              height: '60%',
              marginTop: '100px',
            }}
          ></div>
        </DecorationCarousel>
      </Cell>
    </>
  );
};

export default SiteRange;
