/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-01 13:56:07
 * @LastEditTime: 2023-12-13 10:53:09
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
      color: 'gradient',
      opacity: 0.5,
      curveness: 0.5,
    },
    data: [],
    links: [],
  },
};

export const defaultPolarBar: any = {
  polar: {
    radius: ['40%', '100%'],
  },
  title: [
    {
      text: '',
      x: 'center',
      top: '50%',
      textStyle: {
        color: '#ACCCEC',
        fontSize: 12,
      },
    },
    {
      text: '',
      x: 'center',
      top: '38%',
      textStyle: {
        fontSize: '12',
        color: '#fff',
      },
    },
  ],
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
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  radiusAxis: {
    type: 'category',
    data: [], //['a', 'b', 'c', 'd', 'e']
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  tooltip: {
    backgroundColor: 'rgba(9, 12, 21, 0.8)',
    borderColor: 'rgba(21,154,255,0.8)',
    extraCssText: 'box-shadow: 0 0 6px 0 rgba(21,154,255,0.7);',
    textStyle: {
      color: 'white',
    },
  },
  series: {
    type: 'bar',
    barWidth: 6,
    barGap: 8,
    barMinAngle: 4,
    coordinateSystem: 'polar',
    roundCap: true,
    data: [
      // {
      //   value: 2,
      //   itemStyle: {
      //     color: 'red'
      //   },
      // }
    ],
    label: {
      show: false,
      // formatter: '{b}: {c}',
      // position: 'insideStart',
      // rotate: 0,
      // color: 'white',
    },
    showBackground: true,
    backgroundStyle: {
      color: '#1c2b42',
    },
  },
};

export const defaultMapOption: any = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(12,23,39,0.8)',
    padding: [16, 30],
    borderColor: '#00DEFF',
    borderWidth: 1,
    textStyle: {
      color: '#fff',
      fontSize: 18,
    },
    formatter: (params: any) => {
      const { data } = params;
      return `${data?.name}-${data?.value?.[2]}个站点`;
    },
  },
  geo: {
    map: 'china',
    show: true,
    animationDurationUpdate: 0,
    roam: true, //可以通过鼠标拖动进行缩放
    zoom: 1.5,
    top: 210,
    z: 100,
    label: {
      show: true,
      color: 'rgba(118,138,162)',
    },
    itemStyle: {
      areaColor: '#082b56',
      borderColor: '#4873a6', //线
      shadowColor: 'none', //外发光
      shadowBlur: 0,
    },
    emphasis: {
      label: {
        show: true,
        color: 'white',
      },
      itemStyle: {
        areaColor: 'rgba(52,185,255,1)', //悬浮区背景
      },
    },
  },
  series: [
    // 标记点
    {
      type: 'scatter',
      coordinateSystem: 'geo',
      //symbol: 'image://http://localhost:8000/dot.png',
      symbolSize: [30, 30],
      z: 110,
      label: {
        show: true,
        padding: [2, 12],
        backgroundColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0,22,48,0.1)', // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: '#001630',
            },
            {
              offset: 1,
              color: 'rgba(0,22,48,0.1)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        color: '#34E1B6',
        fontWeight: 500,
        offset: [0, -30],
        fontSize: 16,
        formatter(value: any) {
          return value.data.value[2];
        },
      },
      itemStyle: {
        opacity: 1,
      },
      roam: true,
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke',
      },
      hoverAnimation: true,
    },
    {
      map: 'chinaMapOutline',
      silent: true,
      type: 'map',
      zoom: 1,
      top: 63,
      z: 15,
      label: {
        normal: {
          show: false,
          textStyle: {
            color: '#fff',
          },
        },
        emphasis: {
          textStyle: {
            color: '#fff',
          },
        },
      },
      roam: false,
      animationDurationUpdate: 0,
      itemStyle: {
        normal: {
          areaColor: 'transparent',
          borderColor: '#1390f0',
          borderWidth: 1.5,
          shadowBlur: 10,
        },
        emphasis: {
          areaColor: 'transparent', //悬浮背景
          textStyle: {
            color: '#fff',
          },
        },
      },
    },
    {
      map: 'chinaMapOutline1',
      silent: true,
      type: 'map',
      zoom: 1,
      label: {
        normal: {
          show: false,
          textStyle: {
            color: '#fff',
          },
        },
        emphasis: {
          textStyle: {
            color: '#fff',
          },
        },
      },
      roam: false,
      animationDurationUpdate: 0,
      itemStyle: {
        normal: {
          areaColor: '#0d1c29',
          borderColor: '#094981',
          borderWidth: 1.5,
          shadowBlur: 0,
        },
        emphasis: {
          areaColor: 'transparent', //悬浮背景
          textStyle: {
            color: '#fff',
          },
        },
      },
    },
  ],
};

export const defaultPieOption: any = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: '5%',
    left: 'center',
    icon: 'circle',
  },
  series: [
    {
      type: 'pie',
      center: ['50%', '40%'],
      radius: ['30%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      labelLine: {
        show: false,
      },
    },
  ],
};
