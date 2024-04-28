/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 14:14:19
 * @LastEditTime: 2024-04-28 15:30:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Overview\RealtimePower\index.tsx
 */
import React, { useState, useEffect, useCallback, memo } from 'react';
import { DatePicker, Spin, Typography } from 'antd';
import { useRequest } from 'umi';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import moment, { Moment } from 'moment';
import { formatMessage, getLocale } from '@/utils';
import { options } from './helper';
import { getPower } from '../service';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import RowBox from '../components/RowBox';
import Detail from '@/components/Detail';

type PowerType = {
  siteId?: number;
};

const RealTimePower: React.FC<PowerType> = (props) => {
  const { siteId } = props;

  const [date, setDate] = useState<Moment>(moment());
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
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

  useEffect(() => {
    if (siteId) {
      run({
        siteId,
        date: date.format('YYYY-MM-DD'),
        type: 0,
        subType: 0,
      });
    }
  }, [siteId, date]);

  useEffect(() => {
    const result: TypeChartDataType[] = [
      {
        name: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
        data: [],
      },
      {
        name: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
        data: [],
      },
      {
        name: formatMessage({ id: 'device.otherLoad', defaultMessage: '其他负载' }),
        data: [],
      },
    ];
    powerData?.me?.data?.forEach?.((item) => {
      result[0].data!.push({ label: item.eventTs, value: item?.doubleVal });
    });
    powerData?.cs?.data?.forEach?.((item) => {
      result[1].data!.push({ label: item.eventTs, value: item?.doubleVal });
    });
    powerData?.load?.data?.forEach?.((item) => {
      result[2].data!.push({ label: item.eventTs, value: item?.doubleVal });
    });
    setChartData(result);
  }, [powerData]);

  return (
    <>
      <RowBox span={6} className="p16">
        <Detail.Label
          title={formatMessage({ id: 'device.realTimePower', defaultMessage: '实时功率' })}
          showLine={false}
          className="mb20"
          bold={false}
        >
          <DatePicker
            defaultValue={date}
            format={getLocale().dateFormat}
            onChange={onChange}
            allowClear={false}
          />
          {loading && <Spin className="ml12" />}
        </Detail.Label>
        <div
          style={{
            height: 'calc(100% - 52px)',
          }}
        >
          <TypeChart
            step={5}
            date={date}
            option={options}
            data={chartData}
            style={{
              height: '100%',
            }}
          />
        </div>
      </RowBox>
    </>
  );
};

export default memo(RealTimePower);
