/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 17:39:51
 * @LastEditTime: 2023-08-02 10:42:51
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Chart\index.tsx
 */
import React, { useMemo, useEffect } from 'react';
import { useBoolean } from 'ahooks';
import EChartsReact from 'echarts-for-react';
import { defaultOption, ChartProps } from './config';
import { merge } from 'lodash';

const Chart: React.FC<ChartProps> = (props) => {
  const { option, min, max, chartRef, ...restProps } = props;

  const [show, { setTrue }] = useBoolean(false);

  const chartOptions = useMemo(() => {
    const result: any = { yAxis: {} };
    const values: number[] = [0];
    option?.dataset?.source?.map?.((item: any) => {
      item?.forEach?.((value: any) => {
        if (typeof value === 'number') {
          values.push(value);
        }
      });
    });
    const valueMax = Math.max(...values);
    const valueMin = Math.min(...values);
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
    merge(result, defaultOption, option);
    return result;
  }, [option]);

  useEffect(() => {
    setTrue();
  }, []);

  return (
    <>
      {show && (
        <EChartsReact ref={chartRef} option={chartOptions} style={{ height: 254 }} {...restProps} />
      )}
    </>
  );
};

export default Chart;
