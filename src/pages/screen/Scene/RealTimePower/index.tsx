import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useRequest } from 'umi';
import moment from 'moment';
import { getSiteId } from '../helper';
import type { Moment } from 'moment';
import styles from './index.less';
import { getData } from './service';
import { formatMessage } from '@/utils';
import type { UnitType } from '@/models/siteType';
import TypeChart from '@/components/Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';

import { defaultOptions } from './config';
import type EChartsReact from 'echarts-for-react';

type RealTimePowerProps = {
  date?: Moment;
  siteTypeConfig: UnitType;
};

type DataType = {
  name: string;
  data: { label: string; value: number | undefined }[];
};

type ChartDataType = {
  eventTs: string;
  doubleVal: number;
};

const getChartData = (data: ChartDataType[]) => {
  return data.map((item) => {
    return { label: item?.eventTs, value: item?.doubleVal };
  });
};

const RealTimePower: React.FC<RealTimePowerProps> = (props) => {
  const { date, siteTypeConfig } = props;
  const [chartData, setChartData] = useState<DataType[]>();
  const chartRef = useRef<EChartsReact>();
  const [options, setOptions] = useState(defaultOptions());
  const timerRef = useRef({ stop: false });

  const siteId = getSiteId();
  const { data: powerData, run } = useRequest(getData, {
    manual: true,
    pollingInterval: 2 * 60 * 1000,
  });
  const legendMap = useMemo(() => {
    const map = new Map([
      [
        'me',
        {
          name: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
          color: '#FF7B7B',
        },
      ],
      [
        'load',
        {
          name: formatMessage({ id: 'device.otherLoad', defaultMessage: '其他负载' }),
          color: '#FF9AD5',
        },
      ],
    ]);

    if (siteTypeConfig.hasPv) {
      map.set('pv', {
        name: formatMessage({ id: 'device.pv', defaultMessage: '光伏' }),
        color: '#FFD15C',
      });
    }

    if (siteTypeConfig.hasEnergy) {
      map.set('es', {
        name: formatMessage({ id: 'device.storage', defaultMessage: '储能' }),
        color: '#159AFF',
      });
    }

    if (siteTypeConfig.hasCharge) {
      map.set('cs', {
        name: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
        color: '#01CFA1',
      });
    }

    if (siteTypeConfig.hasDiesel) {
      map.set('diesel', {
        name: formatMessage({ id: 'screen.1009', defaultMessage: '柴发' }),
        color: '#7A79FF',
      });
    }

    if (siteTypeConfig.hasFan) {
      map.set('fan', {
        name: formatMessage({ id: 'screen.1010', defaultMessage: '风机' }),
        color: '#66E1DF',
      });
    }
    return map;
  }, [siteTypeConfig]);

  useEffect(() => {
    const result: DataType[] = [];
    const series: any[] = [];
    legendMap.forEach(({ name, color }, key) => {
      result.push({ data: getChartData(powerData?.[key] || []), name });
      series.push({ type: 'line', color, areaStyle: { opacity: 0.1 } });
    });
    const instance = chartRef?.current?.getEchartsInstance();
    let currentIndex = -1;
    const dataLen = result?.[0]?.data?.length || 0;
    const timer = setInterval(() => {
      if (dataLen && !timerRef.current.stop) {
        currentIndex = (currentIndex + 1) % dataLen; // 取余 循环展示
        instance &&
          instance.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndex,
            name: 'wahaha',
          });
      }
    }, 3000);

    setChartData(result);
    setOptions(defaultOptions(series));
    return () => clearInterval(timer);
  }, [legendMap, powerData]);

  useEffect(() => {
    run({
      siteId,
      date: date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId, date]);

  return (
    <div
      className={styles.chartWrapper}
      onMouseOver={() => (timerRef.current.stop = true)}
      onMouseOut={() => (timerRef.current.stop = false)}
    >
      <TypeChart
        height={legendMap.size > 5 ? 163 : 235}
        chartRef={chartRef}
        option={options}
        data={chartData}
      />
    </div>
  );
};

export default RealTimePower;
