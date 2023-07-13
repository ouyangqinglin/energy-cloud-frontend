/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 14:14:19
 * @LastEditTime: 2023-07-13 14:12:47
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\Power\index.tsx
 */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Skeleton, DatePicker } from 'antd';
import { useRequest } from 'umi';
import LineChart, { LineChartDataType } from '@/components/Chart/LineChart';
import { getPower } from '../service';
import styles from '../index.less';
import moment, { Moment } from 'moment';
import { ComProps } from '../type';

const legendMap = new Map([
  ['charge', '充电功率'],
  ['discharge', '放电功率'],
]);

const Power: React.FC<ComProps> = (props) => {
  const { siteId } = props;

  const [date, setDate] = useState<Moment>(moment());
  const {
    loading,
    data: powerData,
    run,
  } = useRequest(getPower, {
    manual: true,
    pollingInterval: 2 * 60 * 1000,
  });

  const chartData = useMemo(() => {
    const result: LineChartDataType = {
      charge: [],
      discharge: [],
    };
    powerData?.map?.((item) => {
      result[item.doubleVal > 0 ? 'charge' : 'discharge'].push({
        time: item.eventTs,
        value: item.doubleVal,
      });
      if (item.doubleVal == 0) {
        result.charge.push({
          time: item.eventTs,
          value: 0,
        });
        result.discharge.push({
          time: item.eventTs,
          value: 0,
        });
      }
    });
    return result;
  }, [powerData]);

  const onChange = useCallback((value: Moment | null) => {
    setDate(value || moment());
  }, []);

  useEffect(() => {
    if (siteId) {
      run({ siteId, date: date.format('YYYY-MM-DD') });
    }
  }, [siteId, date]);

  return (
    <>
      <div className="card-wrap shadow p20 mb20">
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
              <label className={`flex1 ${styles.label}`}>储能功率</label>
              <DatePicker
                defaultValue={date}
                format="YYYY-MM-DD"
                onChange={onChange}
                allowClear={false}
              />
            </div>
            <LineChart date={date} legendMap={legendMap} data={chartData} />
          </>
        )}
      </div>
    </>
  );
};

export default Power;
