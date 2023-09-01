/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-01 13:56:07
 * @LastEditTime: 2023-08-31 16:20:10
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Chart\config.ts
 */
import React from 'react';
import EChartsReact, { EChartsReactProps } from 'echarts-for-react';

export enum chartTypeEnum {
  Day,
  Month,
  Year,
  Label,
}

export type ChartProps = Omit<EChartsReactProps, 'option'> & {
  option?: any;
  min?: number;
  max?: number;
  chartRef?: React.LegacyRef<EChartsReact>;
  calculateMax?: boolean;
};

export const defaultOption: any = {};

export const defaultLineOption: any = {
  grid: {
    left: 10,
    top: 60,
    right: 10,
    bottom: 10,
    containLabel: true,
  },
  legend: {
    show: true,
    orient: 'horizontal',
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8,
    textStyle: {
      fontSize: 12,
    },
    left: 'center',
    top: 'top',
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: true,
    },
    axisLabel: {
      showMaxLabel: true,
    },
    axisTick: {
      alignWithLabel: true,
      show: true,
    },
  },
  yAxis: {
    name: '',
    nameTextStyle: {
      align: 'left',
    },
    type: 'value',
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    // backgroundColor: 'rgba(9, 12, 21, 0.8)',
    // borderColor: 'rgba(21,154,255,0.8)',
    // extraCssText: 'box-shadow: 0 0 6px 0 rgba(21,154,255,0.7);',
    // textStyle: {
    //   color: 'white',
    // },
    axisPointer: {
      type: 'line',
    },
  },
  series: [
    {
      type: 'line',
      color: 'rgba(21, 154, 255, 1)',
    },
  ],
};

export const defaultSankey: any = {
  series: {
    type: 'sankey',
    layout: 'none',
    layoutIterations: 0,
    nodeGap: 20,
    left: 0,
    right: 0,
    lineStyle: {
      color: 'target',
      opacity: 0.5,
      curveness: 0.5,
    },
    data: [],
    links: [],
  },
};

export const defaultPolarBar: any = {
  polar: {
    radius: ['10%', '100%'],
  },
  angleAxis: {
    clockwise: false,
    max: 12,
    startAngle: 90,
    axisLabel: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: '#2E3A45',
      },
    },
    splitLine: {
      lineStyle: {
        color: '#2E3A45',
      },
    },
  },
  radiusAxis: {
    type: 'category',
    data: [], //['a', 'b', 'c', 'd', 'e']
  },
  tooltip: {},
  series: {
    type: 'bar',
    barWidth: 6,
    barGap: 8,
    barMinAngle: 4,
    coordinateSystem: 'polar',
    data: [
      // {
      //   value: 2,
      //   itemStyle: {
      //     color: 'red'
      //   },
      // }
    ],
    label: {
      show: true,
      formatter: '{b}: {c}',
      position: 'insideStart',
      rotate: 0,
      color: 'white',
    },
  },
};
