/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-03 15:23:43
 * @LastEditTime: 2023-12-03 16:17:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\VehicleChart\index.tsx
 */
import React, { useMemo } from 'react';
import Chart from '@/components/Chart';
import { defaultPieOption } from '@/components/Chart/config';
import Detail from '@/components/Detail';
import { merge } from 'lodash';

export type VehicleChartType = {
  data?: Record<string, any>;
};

const vehicleConfigMap = new Map([
  ['driving', '行驶车辆'],
  ['static', '静止车辆'],
  ['sleep', '休眠车辆'],
  ['offline', '离线车辆'],
]);

const VehicleChart: React.FC<VehicleChartType> = (props) => {
  const { data } = props;

  const chartOption = useMemo(() => {
    const result: any = {
      color: ['#007DFF', '#3DD598', '#FFB0E3', '#D7DBEC'],
      tooltip: {
        formatter: (params: any) => {
          return `${params?.name} ${params?.value}`;
        },
      },
      legend: {
        formatter: (field: string) => {
          return `${vehicleConfigMap.get(field)} ${data?.[field] ?? 0}辆`;
        },
      },
      dataset: {
        source: [],
      },
    };
    vehicleConfigMap.forEach((_, key) => {
      result.dataset.source.push([key, data?.[key] ?? 0]);
    });
    merge(result, defaultPieOption);
    return result;
  }, [data]);

  return (
    <>
      <div className="p20 card-wrap shadow">
        <Detail.Label title="车辆运行状态" showLine={false} />
        <Chart style={{ height: '313px' }} option={chartOption} calculateMax={false} />
      </div>
    </>
  );
};

export default VehicleChart;
