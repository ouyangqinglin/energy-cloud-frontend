/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-06-04 10:22:48
 * @LastEditTime: 2024-06-07 14:18:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\chart\index.tsx
 */

import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';
import { options } from './helper';
import EChartsReact from 'echarts-for-react';
import { TableDataType, TableSearchType } from '../type';
import { merge } from 'lodash';
import { saveFile } from '@/utils';

type ChartType = {
  searchData: TableSearchType;
  tableType: number;
  data?: TableDataType[];
};

export type ChartRefType = {
  downLoadImg: (name: string) => void;
};

const Chart = forwardRef<any, ChartType>((props, ref) => {
  const { searchData, tableType, data } = props;

  const chartRef = useRef<EChartsReact>();
  const [chartData, setChartData] = useState<TypeChartDataType[]>([]);
  const [allLabel, setAllLabel] = useState<string[]>();
  const [chartOptions, setChartOptions] = useState<any>(options);

  useImperativeHandle<any, ChartRefType>(ref, () => {
    return {
      downLoadImg: (name) => {
        const base64 = chartRef.current?.getEchartsInstance?.()?.getDataURL?.();
        if (base64) {
          saveFile(base64, name, '.png');
        }
      },
    };
  });

  useEffect(() => {
    if (tableType) {
      if (searchData) {
        chartRef.current?.getEchartsInstance?.()?.clear?.();
        const series: any = [];
        const dataSource: TypeChartDataType[] = [];
        const deviceIdkeyIndex: Record<string, number> = {};
        searchData.keyValue?.forEach?.(({ name, key, deviceName, deviceId }, index) => {
          series?.push({
            type: 'line',
          });
          dataSource.push({
            name: deviceName + '\n' + name,
            data: [],
          });
          deviceIdkeyIndex[(deviceId ?? '') + (key ?? '')] = index;
        });
        const labels: string[] = [];
        data?.forEach?.(({ time, devices }) => {
          if (labels[labels.length - 1] !== time) {
            labels.push(time || '');
          }
          devices?.forEach?.((item) => {
            dataSource[deviceIdkeyIndex[(item.deviceId ?? '') + (item.key ?? '')]].data?.push({
              label: time || '',
              value: item.value,
            });
          });
        });
        setChartOptions(merge({}, options, { series }));
        setChartData(dataSource);
        setAllLabel(labels);
      } else {
        chartRef.current?.getEchartsInstance?.()?.clear?.();
        setChartOptions(merge({}, options, { series: [] }));
        setChartData([]);
        setAllLabel([]);
      }
    }
  }, [searchData, tableType, data]);

  return (
    <>
      <TypeChart
        chartRef={chartRef}
        type={chartTypeEnum.Label}
        option={chartOptions}
        style={{ height: 'calc(100vh - 280px)' }}
        data={chartData}
        allLabel={allLabel}
      />
    </>
  );
});

export default memo(Chart);
