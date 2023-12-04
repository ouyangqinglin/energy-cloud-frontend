/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-03 15:23:43
 * @LastEditTime: 2023-12-04 15:50:57
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\VehicleChart\index.tsx
 */
import React, { useMemo } from 'react';
import Chart from '@/components/Chart';
import { defaultPieOption } from '@/components/Chart/config';
import Detail from '@/components/Detail';
import { merge } from 'lodash';

export type VehicleChartType = {
  title?: string;
  option?: Record<string, any>;
};

const VehicleChart: React.FC<VehicleChartType> = (props) => {
  const { title = '车辆运行状态', option } = props;

  const chartOption = useMemo(() => {
    const result: any = {
      color: ['#007DFF', '#3DD598', '#FFB0E3', '#D7DBEC'],
    };
    merge(result, defaultPieOption, option);
    return result;
  }, [option]);

  return (
    <>
      <div className="p20 card-wrap shadow">
        <Detail.Label title={title} showLine={false} />
        <Chart style={{ height: '313px' }} option={chartOption} calculateMax={false} />
      </div>
    </>
  );
};

export default VehicleChart;
