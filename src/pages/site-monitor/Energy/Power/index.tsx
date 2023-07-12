/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 14:14:19
 * @LastEditTime: 2023-07-12 17:50:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\Power\index.tsx
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Skeleton, DatePicker } from 'antd';
import { useRequest } from 'umi';
import LineChart from '@/components/Chart/LineChart';
import { getPower } from '../service';
import styles from '../index.less';
import moment, { Moment } from 'moment';

const legendMap = new Map([
  ['charge', '充电功率'],
  ['disCharge', '放电功率'],
]);

export type RealTimePowerProps = {
  siteId?: string;
};

const RealTimePower: React.FC<RealTimePowerProps> = (props) => {
  const { siteId } = props;

  const [date, setDate] = useState<Moment>(moment());
  const {
    loading,
    data: energyData,
    run,
  } = useRequest(getPower, {
    manual: true,
  });

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
            <LineChart date={date} legendMap={legendMap} />
          </>
        )}
      </div>
    </>
  );
};

export default RealTimePower;
