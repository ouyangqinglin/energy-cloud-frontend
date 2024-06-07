/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 17:39:51
 * @LastEditTime: 2024-06-07 10:33:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Chart\index.tsx
 */
import React, { useMemo, useEffect, useState } from 'react';
import { useBoolean } from 'ahooks';
import EChartsReact from 'echarts-for-react';
import { defaultOption } from './config';
import type { ChartProps } from './config';
import { merge } from 'lodash';

const Chart: React.FC<ChartProps> = (props) => {
  const { option, min, max, chartRef, calculateMax = true, ...restProps } = props;

  const [show, { setTrue, setFalse }] = useBoolean(false);
  const [key, setKey] = useState('1');

  const chartOptions = useMemo(() => {
    if (calculateMax) {
      const result: any = { yAxis: {} };
      let valueMax = 0,
        valueMin = 0;
      option?.dataset?.source?.map?.((item: any) => {
        item?.forEach?.((value: any) => {
          if (typeof value === 'number') {
            valueMax = Math.max(valueMax, value);
            valueMin = Math.min(valueMin, value);
          }
        });
      });
      if (valueMax > (max || 10)) {
        result.yAxis.max = undefined;
      } else {
        result.yAxis.max = max || 10;
      }
      if (valueMin < (min || 0)) {
        result.yAxis.min = undefined;
      } else {
        result.yAxis.min = min || 0;
      }
      option?.yAxis?.forEach?.((item: any) => {
        item.min = result.yAxis.min;
        item.max = result.yAxis.max;
      });
      merge(result, defaultOption, option);
      return result;
    } else {
      return merge({}, defaultOption, option);
    }
  }, [option]);

  useEffect(() => {
    setTimeout(() => {
      setKey(Math.random().toFixed(9));
      setTrue();
    }, 10);
    return () => {
      setFalse();
    };
  }, []);

  return (
    <>
      {show && (
        <>
          <EChartsReact
            key={key}
            ref={chartRef}
            option={chartOptions}
            style={{ height: 254 }}
            {...restProps}
          />
        </>
      )}
    </>
  );
};

export default Chart;
