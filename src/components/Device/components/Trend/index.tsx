/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-05 14:40:05
 * @LastEditTime: 2024-03-08 14:06:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\components\Trend\index.tsx
 */
import React, { useState, useEffect, useCallback } from 'react';
import { DatePicker, Spin } from 'antd';
import { useRequest } from 'umi';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import moment, { Moment } from 'moment';
import { formatMessage } from '@/utils';
import { DeviceDataType } from '@/services/equipment';
import { detailItems, options } from './helper';
import { getPower } from './service';
import Detail from '@/components/Detail';

type PowerType = {
  className?: string;
  label?: string;
  deviceData?: DeviceDataType;
};

const Trend: React.FC<PowerType> = (props) => {
  const { label, className, deviceData } = props;

  const [date, setDate] = useState<Moment>(moment());
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const {
    loading: loading,
    data: powerData,
    run,
  } = useRequest(getPower, {
    manual: true,
    pollingInterval: 2 * 60 * 1000,
  });

  const onChange = useCallback((value: Moment | null) => {
    setDate(value || moment());
  }, []);

  useEffect(() => {
    if (deviceData?.deviceId) {
      run({
        deviceId: deviceData?.deviceId,
        date: date.format('YYYY-MM-DD'),
      });
    }
  }, [deviceData?.deviceId, date]);

  useEffect(() => {
    const result: TypeChartDataType[] = [
      {
        name: formatMessage({ id: 'device.chargeCapacity', defaultMessage: '充电电量' }),
        data: powerData?.list?.map?.((item) => ({
          label: item.time,
          value: item.chargeElectricity,
        })),
      },
      {
        name: formatMessage({ id: 'device.chargeNumber', defaultMessage: '充电次数' }),
        data: powerData?.list?.map?.((item) => ({ label: item.time, value: item.chargeCount })),
      },
    ];
    setChartData(result);
  }, [powerData]);

  return (
    <>
      <div className={`card-wrap shadow p20 mb20 ${className}`}>
        <div className="flex mb16">
          <label className={`flex1`}>
            {label || formatMessage({ id: 'device.chargingTrends', defaultMessage: '充电趋势' })}
          </label>
          <DatePicker
            defaultValue={date}
            format="YYYY-MM-DD"
            onChange={onChange}
            allowClear={false}
          />
          {loading && <Spin className="ml12" />}
        </div>
        <div>
          <Detail items={detailItems} data={powerData} column={2} />
        </div>
        <TypeChart step={60} date={date} option={options} data={chartData} />
      </div>
    </>
  );
};

export default Trend;
