import React, { useEffect, useState, useRef, useCallback } from 'react';
import { TimeType, SubTypeEnum } from '@/components/TimeButtonGroup';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import { useRequest } from 'umi';
import moment from 'moment';
import type { Moment } from 'moment';
import { getData } from '../service';
import { getBarChartData, getLineChartData, makeDataVisibleAccordingFlag } from './helper';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { barFieldMap, lineFieldMap } from './config';

type RealTimePowerProps = {
  date?: Moment;
  siteId?: number | string;
  timeType: TimeType;
  subType: SubTypeEnum;
};

const RealTimePower: React.FC<RealTimePowerProps> = (props) => {
  const { date, siteId, timeType, subType } = props;

  const timerRef = useRef({ stop: false });
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const chartRef = useRef();
  const { data: powerData, run } = useRequest(getData, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });
  const shouldShowLine = timeType === TimeType.DAY && subType == 0;

  useEffect(() => {
    if (!powerData) {
      return;
    }
    let calcData: TypeChartDataType[] = [];
    if (shouldShowLine) {
      const fieldConfig = makeDataVisibleAccordingFlag([...lineFieldMap], powerData.flag);
      calcData = getLineChartData(powerData, fieldConfig);
    } else {
      const fieldConfig = makeDataVisibleAccordingFlag([...barFieldMap], powerData.flag);
      calcData = getBarChartData(powerData, fieldConfig, timeType);
    }
    setChartData(calcData);
    const instance = chartRef?.current?.getEchartsInstance();
    let currentIndex = -1;
    const dataLen = calcData?.[0].data.length;
    const timer = setInterval(() => {
      if (dataLen && !timerRef.current.stop) {
        currentIndex = (currentIndex + 1) % dataLen; // 取余 循环展示
        instance.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
          name: 'wahaha',
        });
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [powerData, shouldShowLine, timeType]);

  useEffect(() => {
    if (siteId) {
      run({
        siteId,
        type: timeType,
        subType,
        date: date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
      });
    }
  }, [siteId, date, run, timeType, subType]);

  const allLabel = chartData?.[0]?.data?.map(({ label }) => label);
  const option = {
    yAxis: {
      type: 'value',
      name: shouldShowLine ? '(kW)' : '(kWh)',
      nameLocation: 'end',
      splitLine: {
        lineStyle: {
          type: 'dashed', //虚线
        },
      },
    },
    xAxis: {
      data: allLabel,
    },
    grid: {
      bottom: 50,
      top: 50,
      right: 20,
    },
    legend: {
      show: true,
      icon: 'rect',
      top: 'bottom',
      itemHeight: 10,
      itemWidth: 10,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    dataZoom: [
      {
        type: 'inside',
        realtime: false,
      },
      {
        start: 0,
        end: 100,
        height: 15,
        realtime: false,
      },
    ],
    series: chartData,
  };

  return (
    <div
      onMouseOver={() => (timerRef.current.stop = true)}
      onMouseOut={() => (timerRef.current.stop = false)}
    >
      <TypeChart
        type={timeType}
        chartRef={chartRef}
        date={date}
        option={option}
        style={{ height: '340px' }}
        data={chartData}
        allLabel={allLabel}
        calculateMax={false}
        notMerge
      />
    </div>
  );
};

export default RealTimePower;
