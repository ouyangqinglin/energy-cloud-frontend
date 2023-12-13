/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-19 17:21:49
 * @LastEditTime: 2023-08-01 17:13:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Chart\TypeChart\index.tsx
 */
import React, { useEffect, useMemo, useState } from 'react';
import { defaultLineOption, ChartProps, chartTypeEnum } from '../config';
import Chart from '..';
import { merge } from 'lodash';
import moment, { Moment } from 'moment';
import { typeMap } from './config';

export type TypeChartDataType = {
  name?: string; //系列名称
  data?: {
    //系列对应的数据
    label: string;
    value?: number;
  }[];
};

export type TypeChartProps = ChartProps & {
  type?: chartTypeEnum;
  date?: Moment;
  data?: TypeChartDataType[];
  step?: number;
  allLabel?: string[];
};

const TypeChart: React.FC<TypeChartProps> = (props) => {
  const { option, type = chartTypeEnum.Day, date, data, step, allLabel, ...restProps } = props;

  const [xLabels, setXLables] = useState<string[]>();

  const chartOptions = useMemo(() => {
    const category = ['product']; // 数据类型 ['product','分类1','分类2']
    const valueMap = new Map<string, (string | number)[]>(xLabels?.map?.((item) => [item, [item]])); // ['x轴','100','200']

    data?.forEach?.((seriesItem) => {
      category.push(seriesItem.name);
      const seriesDataMap = new Map<string, number | string>();
      seriesItem?.data?.forEach?.((dataItem) => {
        if (type === chartTypeEnum.Label) {
          seriesDataMap.set(dataItem.label, dataItem?.value ?? '');
        } else {
          seriesDataMap.set(
            moment(dataItem.label).format(typeMap.get(type)?.format),
            dataItem?.value ?? '',
          );
        }
      });
      xLabels?.forEach?.((key) => {
        const valueMapData = valueMap.get(key) || [];
        valueMap.set(key, [...valueMapData, seriesDataMap.get(key) ?? '']);
      });
    });

    const source = Array.from(valueMap.values());
    source.splice(0, 0, category);

    const result = {
      dataset: {
        source,
      },
    };
    merge(result, defaultLineOption, option);
    return result;
  }, [option, data, xLabels]);

  useEffect(() => {
    const labels =
      typeMap.get(type)?.fun?.((type == chartTypeEnum.Day ? step : date) as any) || allLabel;
    setXLables(labels);
  }, [type, step, date, allLabel]);

  return (
    <>
      <Chart option={chartOptions} {...restProps} />
    </>
  );
};

export default TypeChart;
