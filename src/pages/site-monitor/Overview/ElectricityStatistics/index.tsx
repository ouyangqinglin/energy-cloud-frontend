/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-04-25 14:08:31
 * @LastEditTime: 2024-04-25 16:09:56
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Overview\ElectricityStatistics\index.tsx
 */

import React, { memo, useCallback, useEffect, useState } from 'react';
import RowBox from '../components/RowBox';
import Detail from '@/components/Detail';
import { formatMessage, isEmpty } from '@/utils';
import ChartDate from '@/components/Chart/ChartDate';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import { Moment } from 'moment';
import { chartTypeEnum } from '@/components/Chart/config';
import { useRequest } from 'umi';
import { getPower } from '../service';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import moment from 'moment';
import { detailItems, options } from './helper';

type ElectricityStatisticsType = {
  siteId?: number;
};

const ElectricityStatistics: React.FC<ElectricityStatisticsType> = (props) => {
  const { siteId } = props;

  const [date, setDate] = useState<Moment>();
  const [chartType, setChartType] = useState<chartTypeEnum>();
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const [statData, setStatData] = useState<Record<string, any>>({});
  const {
    loading: loading,
    data: powerData,
    run,
  } = useRequest(getPower, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const onChange = useCallback((value: Moment | null) => {
    setDate(value || moment());
  }, []);

  const onTypeChange = useCallback((value) => {
    setChartType(value);
  }, []);

  useEffect(() => {
    if (siteId && date && !isEmpty(chartType)) {
      run({
        siteId,
        date: date.format('YYYY-MM-DD'),
        type: chartType,
        subType: 0,
      });
    }
  }, [siteId, date, chartType]);

  useEffect(() => {
    const result: Required<TypeChartDataType>[] = [
      {
        name: formatMessage({ id: 'siteMonitor.mainsCapacity', defaultMessage: '市电供电量' }),
        data: [],
      },
      {
        name: formatMessage({ id: 'siteMonitor.chargingCapacity', defaultMessage: '充电量' }),
        data: [],
      },
      {
        name: formatMessage({
          id: 'siteMonitor.otherLoadElectricConsumption',
          defaultMessage: '其他负载用电量',
        }),
        data: [],
      },
      {
        name: formatMessage({ id: 'device.numberOfChargingOrders', defaultMessage: '充电订单数' }),
        data: [],
      },
    ];
    const statResult = {
      grid: powerData?.mainsUse?.total,
      charge: powerData?.cpCharge?.total,
      otherLoad: powerData?.loadUse?.total,
      // order:,
    };
    powerData?.mainsUse?.data?.forEach?.((item) => {
      result[0].data!.push({ label: item.eventTs, value: item?.doubleVal });
    });
    powerData?.cpCharge?.data?.forEach?.((item) => {
      result[1].data!.push({ label: item.eventTs, value: item?.doubleVal });
    });
    powerData?.loadUse?.data?.forEach?.((item) => {
      result[2].data!.push({ label: item.eventTs, value: item?.doubleVal });
    });
    setChartData(result);
    setStatData(statResult);
  }, [powerData]);

  return (
    <>
      <RowBox span={18} className="p16">
        <Detail.Label
          title={formatMessage({
            id: 'siteMonitor.electricityStatistics',
            defaultMessage: '电量统计',
          })}
          showLine={false}
          className="mb20"
          bold={false}
        >
          <ChartDate
            onChange={onChange}
            onTypeChange={onTypeChange}
            loading={loading}
            switchType="button"
          />
        </Detail.Label>
        <Detail
          className="detail-center"
          items={detailItems}
          data={statData}
          layout="vertical"
          colon={false}
          column={4}
        />
        <TypeChart
          step={60}
          type={chartType}
          date={date}
          option={options}
          data={chartData}
          style={{ height: 274 }}
        />
      </RowBox>
    </>
  );
};

export default memo(ElectricityStatistics);
