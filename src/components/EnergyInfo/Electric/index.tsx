/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 14:14:19
 * @LastEditTime: 2024-03-05 11:47:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Electric\index.tsx
 */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Skeleton, DatePicker, Select, Spin } from 'antd';
import { useRequest } from 'umi';
import { chartTypeEnum } from '@/components/Chart/config';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import { getElectic } from '../service';
import styles from '../index.less';
import moment, { Moment } from 'moment';
import { ComProps } from '../type';
import { formatMessage } from '@/utils';
import { merge } from 'lodash';
import { useBoolean } from 'ahooks';

const typeMap = [
  {
    value: chartTypeEnum.Month,
    label: formatMessage({ id: 'common.time.month', defaultMessage: '月' }),
  },
  {
    value: chartTypeEnum.Year,
    label: formatMessage({ id: 'common.time.year', defaultMessage: '年' }),
  },
];
export enum EnergySourceEnum {
  SiteMonitor,
  DeviceManage,
}
const Electric: React.FC<ComProps> = (props) => {
  const { deviceData, source } = props;

  const [chartType, setChartType] = useState<chartTypeEnum>(chartTypeEnum.Month);
  const [date, setDate] = useState<Moment>(moment());
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const [loading, { setTrue, setFalse }] = useBoolean(false);

  const chartOption = useMemo(() => {
    return {
      yAxis: {
        name: formatMessage({ id: 'common.unit', defaultMessage: '单位' }) + '（kWh）',
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
    setChartData([]);
    if (deviceData?.deviceId) {
      const totalNum = chartTypeEnum.Month == chartType ? 5 : 3;
      let requestNum = 0;
      const result: TypeChartDataType[] = [
        {
          name: formatMessage({ id: 'siteMonitor.allCharge', defaultMessage: '总充电量' }),
          data: [],
        },
        {
          name: formatMessage({ id: 'siteMonitor.allDisharge', defaultMessage: '总放电量' }),
          data: [],
        },
      ];
      const allRequest: Promise<any>[] = [];

      const request = () => {
        if (requestNum < totalNum) {
          let startTime, endTime;
          if (chartTypeEnum.Month == chartType) {
            startTime = moment(date)
              .startOf('M')
              .add((30 * requestNum) / totalNum, 'd');
            if (requestNum == totalNum - 1) {
              endTime = moment(date).endOf('M');
            } else {
              endTime = moment(date)
                .startOf('M')
                .add((30 * (requestNum + 1)) / totalNum - 1, 'd');
            }
          } else if (chartTypeEnum.Year == chartType) {
            startTime = moment(date)
              .startOf('y')
              .add((12 * requestNum) / totalNum, 'M');
            if (requestNum == totalNum - 1) {
              endTime = moment(date).endOf('y');
            } else {
              endTime = moment(date)
                .startOf('y')
                .add((12 * (requestNum + 1)) / totalNum - 1, 'M')
                .endOf('M');
            }
          }
          allRequest.push(
            getElectic({
              deviceId: deviceData?.deviceId,
              type: chartType,
              startDate: startTime?.format?.('YYYY-MM-DD'),
              endDate: endTime?.format?.('YYYY-MM-DD'),
              visitType: source == EnergySourceEnum.SiteMonitor ? 0 : 1,
            }).then(({ data }) => {
              result[0].data?.push?.(
                ...(data?.charge?.map?.((item) => ({
                  label: item.eventTs,
                  value: item.doubleVal,
                })) || []),
              );
              result[1].data?.push?.(
                ...(data?.discharge?.map?.((item) => ({
                  label: item.eventTs,
                  value: item.doubleVal,
                })) || []),
              );
              setChartData(merge([], result));
            }),
          );
          requestNum++;
          request();
        }
      };

      setTrue();
      request();

      Promise.allSettled(allRequest).then(() => {
        setFalse();
      });

      return () => {
        requestNum = 100;
      };
    }
  }, [deviceData?.deviceId, chartType, date]);

  return (
    <>
      <div className="card-wrap shadow p20">
        <div className="flex mb16">
          <label className={`flex1 ${styles.label}`}>
            {source == EnergySourceEnum.SiteMonitor
              ? formatMessage({
                  id: 'siteMonitor.chargeTrendUnit',
                  defaultMessage: '储能单元充放电趋势',
                })
              : formatMessage({
                  id: 'siteMonitor.chargeTrend',
                  defaultMessage: '储能充放电趋势',
                })}
          </label>
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
          {loading && <Spin className="ml12" />}
        </div>
        <TypeChart type={chartType} date={date} option={chartOption} data={chartData} />
      </div>
    </>
  );
};

export default Electric;
