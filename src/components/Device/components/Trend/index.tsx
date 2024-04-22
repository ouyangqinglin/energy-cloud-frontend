/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-05 14:40:05
 * @LastEditTime: 2024-04-22 11:30:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\components\Trend\index.tsx
 */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRequest } from 'umi';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import moment, { Moment } from 'moment';
import { formatMessage, getPlaceholder, getUnit, isEmpty } from '@/utils';
import { DeviceDataType } from '@/services/equipment';
import { detailItems, options } from './helper';
import { getPower } from './service';
import Detail from '@/components/Detail';
import ChartDate from '@/components/Chart/ChartDate';
import { chartTypeEnum } from '@/components/Chart/config';
import { merge } from 'lodash';

type PowerType = {
  className?: string;
  label?: string;
  deviceData?: DeviceDataType;
};

const Trend: React.FC<PowerType> = (props) => {
  const { label, className, deviceData } = props;

  const [date, setDate] = useState<Moment>();
  const [chartType, setChartType] = useState<chartTypeEnum>();
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const {
    loading: loading,
    data: powerData,
    run,
  } = useRequest(getPower, {
    manual: true,
    pollingInterval: 60 * 60 * 1000,
  });

  const chartOptions = useMemo(() => {
    const result: Record<string, any> = {};
    result.tooltip = {
      formatter: (params: any) => {
        const data0 = params?.[0]?.data;
        const data1 = params?.[1]?.data;
        const data2 = params?.[2]?.data;
        const data3 = params?.[3]?.data;
        return `<div>
          ${
            chartType == chartTypeEnum.Day
              ? data0[0] +
                '-' +
                moment('2023-01-01 ' + data0[0])
                  .add(1, 'h')
                  .format('HH:mm')
              : data0[0]
          }
          <div>
            <div><span class="chart-series-icon chart-series-icon-rect" style="background-color: ${
              params[0]?.color
            };"></span>${formatMessage({
          id: 'device.numberOfChargingOrders',
          defaultMessage: '充电订单数',
        })}${getUnit(
          formatMessage({ id: 'device.orderUnit', defaultMessage: '单' }),
        )}：<span style="font-weight: bold;">${getPlaceholder(data0[1])}</span></div>
            <div><span class="chart-series-icon chart-series-icon-rect" style="background-color: ${
              params[1]?.color
            };"></span>${formatMessage({
          id: 'device.chargeDuration',
          defaultMessage: '充电时长',
        })}${getUnit(
          formatMessage({ id: 'device.hour', defaultMessage: '小时' }),
        )}：<span style="font-weight: bold;">${getPlaceholder(data1[2])}</span></div>
            <div><span class="chart-series-icon chart-series-icon-rect" style="background-color: ${
              params[2]?.color
            };"></span>${formatMessage({
          id: 'device.chargingCapacity',
          defaultMessage: '充电量',
        })}${getUnit('kWh')}：<span style="font-weight: bold;">${getPlaceholder(
          data2[3],
        )}</span></div>
            <div><span class="chart-series-icon chart-series-icon-rect" style="background-color: ${
              params[3]?.color
            };"></span>${formatMessage({
          id: 'device.chargingFee',
          defaultMessage: '充电费用',
        })}${getUnit(
          formatMessage({ id: 'common.rmb', defaultMessage: '元' }),
        )}：<span style="font-weight: bold;">${getPlaceholder(data3[4])}</span></div>
          </div>
        </div>`;
      },
    };
    return merge(result, options);
  }, [chartType]);

  const onChange = useCallback((value: Moment | null) => {
    setDate(value || moment());
  }, []);

  const onTypeChange = useCallback((value) => {
    setChartType(value);
  }, []);

  useEffect(() => {
    if (deviceData?.deviceId && date && !isEmpty(chartType)) {
      run({
        deviceId: deviceData?.deviceId,
        date: date.format('YYYY-MM-DD'),
        type: chartType,
      });
    }
  }, [deviceData?.deviceId, date, chartType]);

  useEffect(() => {
    const result: Required<TypeChartDataType>[] = [
      {
        name: formatMessage({ id: 'device.numberOfChargingOrders', defaultMessage: '充电订单数' }),
        data: [],
      },
      {
        name: formatMessage({ id: 'device.chargeDuration', defaultMessage: '充电时长' }),
        data: [],
      },
      {
        name: formatMessage({ id: 'device.chargingCapacity', defaultMessage: '充电量' }),
        data: [],
      },
      {
        name: formatMessage({ id: 'device.chargingFee', defaultMessage: '充电费用' }),
        data: [],
      },
    ];
    powerData?.list?.forEach?.((item) => {
      result[0].data.push({ label: item.time, value: item.chargeCount });
      result[1].data.push({ label: item.time, value: item.chargeDuration });
      result[2].data.push({ label: item.time, value: item.chargeElectricity });
      result[3].data.push({ label: item.time, value: item.chargeMoney });
    });
    setChartData(result);
  }, [powerData]);

  return (
    <>
      <div className={`card-wrap shadow p20 mb20 ${className}`}>
        <div className="flex mb16">
          <label className={`flex1`}>
            {label ||
              formatMessage({ id: 'device.chargingStatistics', defaultMessage: '充电统计' })}
          </label>
          <ChartDate onChange={onChange} onTypeChange={onTypeChange} loading={loading} />
        </div>
        <div>
          <Detail items={detailItems} data={powerData} column={2} unitInLabel />
        </div>
        <TypeChart step={60} type={chartType} date={date} option={chartOptions} data={chartData} />
      </div>
    </>
  );
};

export default Trend;
