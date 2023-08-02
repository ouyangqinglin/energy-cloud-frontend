/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 14:14:19
 * @LastEditTime: 2023-07-13 14:31:25
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\Electric\index.tsx
 */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Skeleton, DatePicker, Select } from 'antd';
import { useRequest } from 'umi';
import { chartTypeEnum } from '@/components/Chart/config';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import { getElectic } from '../service';
import styles from '../index.less';
import moment, { Moment } from 'moment';
import { ComProps } from '../type';

const typeMap = [
  { value: chartTypeEnum.Month, label: '月' },
  { value: chartTypeEnum.Year, label: '年' },
];

const Electric: React.FC<ComProps> = (props) => {
  const { deviceData, loading } = props;

  const [chartType, setChartType] = useState<chartTypeEnum>(chartTypeEnum.Month);
  const [date, setDate] = useState<Moment>(moment());
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const { loading: electricLoading, run } = useRequest(getElectic, { manual: true });

  const chartOption = useMemo(() => {
    return {
      yAxis: {
        name: '单位（kWh）',
      },
      series: [
        {
          type: 'line',
          color: 'rgba(21, 154, 255, 1)',
        },
        {
          type: 'line',
          color: 'rgba(255, 151, 74, 1)',
        },
      ],
    };
  }, []);

  const onTypeSelect = useCallback((value) => {
    setChartType(value);
  }, []);

  const onChange = useCallback((value: Moment | null) => {
    setDate(value || moment());
  }, []);

  useEffect(() => {
    if (deviceData?.deviceId) {
      run({
        deviceId: deviceData?.deviceId,
        type: chartType,
        date: date.format('YYYY-MM-DD'),
      }).then((data) => {
        const result: TypeChartDataType[] = [];
        result.push({
          name: '总充电量',
          data: data?.charge?.map?.((item) => ({ label: item.eventTs, value: item.doubleVal })),
        });
        result.push({
          name: '总放电量',
          data: data?.discharge?.map?.((item) => ({ label: item.eventTs, value: item.doubleVal })),
        });
        setChartData(result);
      });
    }
  }, [deviceData?.deviceId, chartType, date]);

  return (
    <>
      <div className="card-wrap shadow p20">
        {loading || electricLoading ? (
          <>
            <div className="flex mb16">
              <div className="flex1">
                <Skeleton.Button size="small" active />
              </div>
              <Skeleton.Input size="small" active />
            </div>
            <Skeleton.Image className={`w-full ${styles.chart}`} active />
          </>
        ) : (
          <>
            <div className="flex mb16">
              <label className={`flex1 ${styles.label}`}>储能充放电趋势</label>
              <Select
                className="mr8"
                defaultValue={chartType}
                options={typeMap}
                onSelect={onTypeSelect}
              />
              <DatePicker
                picker={chartType == chartTypeEnum.Month ? 'month' : 'year'}
                defaultValue={date}
                format={chartType == chartTypeEnum.Month ? 'YYYY-MM' : 'YYYY'}
                onChange={onChange}
                allowClear={false}
              />
            </div>
            <TypeChart type={chartType} date={date} option={chartOption} data={chartData} />
          </>
        )}
      </div>
    </>
  );
};

export default Electric;
