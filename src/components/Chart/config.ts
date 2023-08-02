/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-01 13:56:07
 * @LastEditTime: 2023-08-02 09:36:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Chart\config.ts
 */

import { EChartsReactProps } from 'echarts-for-react';

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
};

export const defaultOption = {};

export const defaultLineOption = {
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
