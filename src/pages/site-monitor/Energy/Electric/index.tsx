/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 14:14:19
 * @LastEditTime: 2023-07-12 17:47:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\Electric\index.tsx
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Skeleton, DatePicker, Select } from 'antd';
import { useRequest } from 'umi';
import { chartTypeEnum } from '@/components/Chart';
import LineChart from '@/components/Chart/LineChart';
import { getPower } from '../service';
import styles from '../index.less';
import moment, { Moment } from 'moment';

const legendMap = new Map([
  ['charge', '总充电量'],
  ['disCharge', '总放电量'],
]);

export type RealTimePowerProps = {
  siteId?: string;
};

const typeMap = [
  { value: chartTypeEnum.Month, label: '月' },
  { value: chartTypeEnum.Year, label: '年' },
];

const Electric: React.FC<RealTimePowerProps> = (props) => {
  const { siteId } = props;

  const [chartType, setChartType] = useState<chartTypeEnum>(chartTypeEnum.Month);
  const [date, setDate] = useState<Moment>(moment());
  const {
    loading,
    data: energyData,
    run,
  } = useRequest(getPower, {
    manual: true,
  });

  const onTypeSelect = useCallback((value) => {
    setChartType(value);
  }, []);

  const onChange = useCallback((value: Moment | null) => {
    setDate(value || moment());
  }, []);

  useEffect(() => {
    if (siteId) {
      run({ siteId });
    }
  }, [siteId]);

  return (
    <>
      <div className="card-wrap shadow p20">
        {loading ? (
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
                defaultValue={date}
                format={chartType == chartTypeEnum.Month ? 'YYYY-MM' : 'YYYY'}
                onChange={onChange}
                allowClear={false}
              />
            </div>
            <LineChart
              type={chartType}
              date={date}
              valueTitle="单位（KWh）"
              legendMap={legendMap}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Electric;
