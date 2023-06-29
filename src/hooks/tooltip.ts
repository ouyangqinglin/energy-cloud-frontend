/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-28 14:19:47
 * @LastEditTime: 2023-06-28 17:44:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\hooks\tooltip.ts
 */
import { Ref, useRef, useCallback, useState, useMemo } from 'react';
import { ChartRefConfig } from '@ant-design/charts';
import { useInterval } from 'ahooks';

export enum ChartTypeEnum {
  Line,
  Pie,
}

type UseToolTip = {
  (props?: { type?: ChartTypeEnum }): [Ref<ChartRefConfig | undefined>, { clear: () => void }];
};

const useToolTip: UseToolTip = (props = {}) => {
  const { type = ChartTypeEnum.Line } = props;

  const chartRef = useRef<ChartRefConfig>();
  let tipNum = 0;

  const clear = useInterval(() => {
    const chart =
      type == ChartTypeEnum.Pie
        ? chartRef?.current?.getChart?.()?.chart
        : chartRef?.current?.chartHelper?.chart;
    if (chart) {
      const chartData = chart?.getData?.();
      if (chartData && chartData.length) {
        if (type == ChartTypeEnum.Pie) {
          const { elements = [] } = chart?.geometries[0] || {};
          const element = elements[tipNum];
          let { x, y } = element?.getModel?.() || {};
          //chartRef?.current?.getChart?.().setState("selected", (item) => item.type === chartData[tipNum].type);
          x = Array.isArray(x) ? x : [x];
          y = Array.isArray(y) ? x : [y];
          chart.showTooltip({ x: (x[0] + x[0]) / 2, y: (y[0] + y[0]) / 2 });
        } else {
          const { x, y } = chart?.getXY?.(chartData[tipNum]) || {};
          chart?.showTooltip?.({ x, y });
        }
        if (tipNum > chartData.length) {
          tipNum = 0;
        } else {
          tipNum++;
        }
      }
    }
  }, 3000);

  return [
    chartRef,
    {
      clear,
    },
  ];
};

export default useToolTip;
