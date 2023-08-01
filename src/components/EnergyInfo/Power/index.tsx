/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 14:14:19
 * @LastEditTime: 2023-07-21 09:50:58
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
import { Annotation } from 'bizcharts';

const legendMap = new Map([['charge', '功率']]);

const Power: React.FC<ComProps> = (props) => {
  const { deviceData, loading } = props;

  const [date, setDate] = useState<Moment>(moment());
  const [maxValue, setMaxValue] = useState<number>(0.1);
  const {
    loading: powerLoading,
    data: powerData,
    run,
  } = useRequest(getPower, {
    manual: true,
    pollingInterval: 2 * 60 * 1000,
  });

  const chartData = useMemo(() => {
    const result: LineChartDataType = {
      charge: [],
    };
    const chartValues =
      powerData?.map?.((item) => {
        result.charge.push({
          time: item.eventTs,
          value: item.doubleVal,
        });
        return item.doubleVal || 0;
      }) || [];
    setMaxValue(Math.max(...chartValues));
    return result;
  }, [powerData]);

  const onChange = useCallback((value: Moment | null) => {
    setDate(value || moment());
  }, []);

  useEffect(() => {
    if (deviceData?.deviceId) {
      run({ deviceId: deviceData?.deviceId, date: date.format('YYYY-MM-DD') });
    }
  }, [deviceData?.deviceId, date]);

  return (
    <>
      <div className="card-wrap shadow p20 mb20">
        {loading || powerLoading ? (
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
            <LineChart
              date={date}
              legendMap={legendMap}
              data={chartData}
              colors={['#007DFF']}
              toolTipProps={{
                domStyles: {
                  'g2-tooltip-marker': {
                    display: 'none',
                  },
                },
              }}
              legendProps={{
                offsetY: 100000000,
              }}
            >
              <Annotation.RegionFilter
                start={['min', 0]}
                end={['max', maxValue]}
                color={'#FF974A'}
              />
              <Annotation.Text
                position={['max', 0]}
                content="充电"
                offsetX={-25}
                offsetY={25}
                style={{
                  fill: '#007DFF',
                }}
              />
              <Annotation.Text
                position={['max', 0]}
                content="放电"
                offsetX={-25}
                offsetY={-25}
                style={{
                  fill: '#FF974A',
                }}
              />
            </LineChart>
          </>
        )}
      </div>
    </>
  );
};

export default Power;
