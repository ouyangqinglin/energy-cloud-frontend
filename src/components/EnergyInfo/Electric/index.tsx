/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 14:14:19
 * @LastEditTime: 2024-04-19 14:21:17
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
import { arrayToMap, formatMessage, getPlaceholder } from '@/utils';
import { merge } from 'lodash';
import { useBoolean } from 'ahooks';
import Detail from '@/components/Detail';
import { chartOption, detailItems, typeMap } from './helper';
import { DeviceProductTypeEnum } from '@/utils/dictionary';

export enum EnergySourceEnum {
  SiteMonitor,
  DeviceManage,
}

const Electric: React.FC<ComProps> = (props) => {
  const { deviceData, source } = props;

  const [chartType, setChartType] = useState<chartTypeEnum>(chartTypeEnum.Day);
  const [date, setDate] = useState<Moment>(moment());
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const [loading, { setTrue, setFalse }] = useBoolean(false);
  const [statisInfo, setStatisInfo] = useState<Record<string, any>>({});
  const [allLabel, setAllLabel] = useState<string[]>([]);

  const onTypeSelect = useCallback((value) => {
    setChartType(value);
  }, []);

  const onChange = useCallback((value: Moment | null) => {
    setDate(value || moment());
  }, []);

  const options = useMemo(() => {
    const result: Record<string, any> = {};
    result.tooltip = {
      formatter: (params: any) => {
        const data0 = params?.[0]?.data;
        const data1 = params?.[1]?.data;
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
          <div>${formatMessage({
            id: 'siteMonitor.allCharge',
            defaultMessage: '总充电量',
          })}：<span style="font-weight: bold;">${getPlaceholder(data0[1])}</span></div>
          <div>${formatMessage({
            id: 'siteMonitor.allDisharge',
            defaultMessage: '总放电量',
          })}：<span style="font-weight: bold;">${getPlaceholder(data1[2])}</span></div>
        </div>
      </div>`;
      },
    };
    return merge({}, chartOption, result);
  }, [chartType]);

  useEffect(() => {
    setChartData([]);
    setStatisInfo({});
    if (
      deviceData?.deviceId &&
      (!deviceData?.productTypeId || deviceData?.productTypeId == DeviceProductTypeEnum.Energy)
    ) {
      const totalNum = chartTypeEnum.Month == chartType ? 7 : 4;
      let dates: { start: Moment; end: Moment }[] = [];
      if (chartType == chartTypeEnum.Month) {
        const nowWeek = 4 - (moment(date).startOf('M').day() || 7);
        dates = [
          {
            start: moment(date).startOf('M'),
            end: moment(date)
              .startOf('M')
              .add(nowWeek > 0 ? nowWeek - 1 : 7 + nowWeek - 1, 'd'),
          },
        ];

        while (
          dates[dates.length - 1].end.isBefore(moment(date).endOf('M'), 'day') &&
          dates[dates.length - 1].end.isBefore(moment(), 'day')
        ) {
          dates.push({
            start: moment(dates[dates.length - 1].end).add(1, 'd'),
            end: moment(dates[dates.length - 1].end).add(7, 'd'),
          });
          if (dates[dates.length - 1].end.isAfter(moment(date).endOf('M'), 'day')) {
            dates[dates.length - 1].end = moment(date).endOf('M');
          }
          if (dates[dates.length - 1].end.isAfter(moment(), 'day')) {
            dates[dates.length - 1].end = moment().endOf('d');
          }
        }
      } else if (chartType == chartTypeEnum.Year) {
        dates = [
          {
            start: moment(date).startOf('y'),
            end: moment(date).startOf('y').add(2, 'M').endOf('M'),
          },
        ];
        while (dates.length < totalNum && dates[dates.length - 1].end.isBefore(moment(), 'month')) {
          dates.push({
            start: moment(dates[dates.length - 1].end)
              .add(1, 'M')
              .startOf('M'),
            end: moment(dates[dates.length - 1].end)
              .add(3, 'M')
              .endOf('M'),
          });
        }
      } else {
        dates = [
          {
            start: date,
            end: date,
          },
        ];
      }

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
      const totalResult = {
        totalCharge: 0,
        totalDischarge: 0,
      };
      dates.reverse();

      const request = () => {
        if (requestNum < dates.length) {
          getElectic({
            deviceId: deviceData?.deviceId,
            type: chartType,
            startDate: dates[requestNum].start?.format?.('YYYY-MM-DD'),
            endDate: dates[requestNum].end?.format?.('YYYY-MM-DD'),
            visitType: source == EnergySourceEnum.SiteMonitor ? 0 : 1,
          }).then(({ data }) => {
            if (requestNum < dates.length) {
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
              totalResult.totalCharge =
                ((totalResult.totalCharge + (data?.totalCharge || 0)).toFixed(2) as any) * 1;
              totalResult.totalDischarge =
                ((totalResult.totalDischarge + (data?.totalDischarge || 0)).toFixed(2) as any) * 1;
              setChartData(merge([], result));
              setStatisInfo(merge({}, totalResult));
              if (chartType == chartTypeEnum.Label) {
                setAllLabel(result[0].data?.map?.((item) => item.label) || []);
              }
              requestNum++;
              request();
            }
          });
        } else {
          setFalse();
        }
      };

      setTrue();
      request();

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
          {chartType != chartTypeEnum.Label && (
            <DatePicker
              picker={typeMap.find((item) => chartType == item.value)?.dateType}
              defaultValue={date}
              format={typeMap.find((item) => chartType == item.value)?.format}
              onChange={onChange}
              allowClear={false}
            />
          )}
          {loading && <Spin className="ml12" />}
        </div>
        <Detail items={detailItems} data={statisInfo} column={2} unitInLabel={true} />
        <TypeChart
          type={chartType}
          date={date}
          option={options}
          data={chartData}
          step={60}
          allLabel={allLabel}
        />
      </div>
    </>
  );
};

export default Electric;
