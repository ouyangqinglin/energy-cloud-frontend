import React, { useEffect, useState, useRef } from 'react';

import type { SubTypeEnum } from '../../components/TimeButtonGroup';
import TypeChart from '@/components/Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';
import type { TypeChartDataType } from '@/components/Chart/TypeChart';
import { useRequest } from 'umi';
import moment from 'moment';
import { formatMessage, isEmpty } from '@/utils';
import { dateRemovalSort } from '@/utils/utils';
import type { Moment } from 'moment';
import { getPowerData, getElectricityData } from '../service';
import styles from './index.less';
import { getBarChartData, getLineChartData, makeDataVisibleAccordingFlag } from './helper';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { barFieldMap, lineFieldMap } from './config';
import type EChartsReact from 'echarts-for-react';

type RealTimePowerProps = {
  date?: Moment;
  siteId?: number | string;
  timeType: chartTypeEnum;
  subType: SubTypeEnum;
  rangedate: [Moment | null, Moment | null] | null;
  getLoadingStatus: (loading: boolean) => void;
};

const RealTimePower: React.FC<RealTimePowerProps> = (props) => {
  const { date, siteId, timeType, subType, rangedate, getLoadingStatus } = props;

  const timerRef = useRef({ stop: false });
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const chartRef = useRef<EChartsReact>();
  const [allLabel, setAllLabel] = useState<string[]>([]);
  // const [isRealTimePower, setIsRealTimePower] = useState<boolean[]>(false);
  // const [isOneDay,setIsOneDay] = useState<boolean[]>(false);

  const {
    data: realTimePowerData,
    run: runPower,
    loading,
  } = useRequest(getPowerData, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const {
    data: electricityData,
    run: runElectricity,
    loading: electricityLoading,
  } = useRequest(getElectricityData, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });
  const isRealTimePower = timeType === chartTypeEnum.Day && subType == 0;
  const isOneDay = rangedate && rangedate[0]?.isSame(rangedate[1], 'days');

  useEffect(() => {
    getLoadingStatus(electricityLoading || loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electricityLoading, loading]);

  useEffect(() => {
    let calcData: TypeChartDataType[] = [];
    if (isRealTimePower && realTimePowerData) {
      const fieldConfig = makeDataVisibleAccordingFlag(
        [...lineFieldMap],
        realTimePowerData,
        isRealTimePower,
      );
      calcData = getLineChartData(realTimePowerData, fieldConfig);
      setAllLabel([]);
    } else if (electricityData) {
      const fieldConfig = makeDataVisibleAccordingFlag(
        [...barFieldMap],
        electricityData,
        isRealTimePower,
      );
      calcData = getBarChartData(electricityData, fieldConfig, timeType as number);
      if (calcData[calcData.length - 1]) {
        calcData[calcData.length - 1].type = 'line';
        calcData[calcData.length - 1].color = '#FF9AD5';
      }
    }
    chartRef.current?.getEchartsInstance?.()?.clear?.();
    setChartData(calcData);
    const instance = chartRef?.current?.getEchartsInstance();
    let currentIndex = -1;
    const dataLen = calcData?.[0]?.data?.length || 0;
    const timer = setInterval(() => {
      if (dataLen && !timerRef.current.stop) {
        currentIndex = (currentIndex + 1) % dataLen; // 取余 循环展示
        instance?.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
          name: 'wahaha',
        });
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [electricityData, realTimePowerData, isRealTimePower, timeType]);

  useEffect(() => {
    if ((isRealTimePower && !isOneDay) || timeType == 3) {
      const currentAllLabel: string[] = [];
      chartData?.forEach((item) => {
        if (item?.data?.length) {
          currentAllLabel.push(...item?.data?.map(({ label }) => label));
        }
      });
      if (currentAllLabel.length) {
        setAllLabel(dateRemovalSort(currentAllLabel));
      }
    }
  }, [chartData, isOneDay, isRealTimePower, timeType]);

  useEffect(() => {
    if (siteId) {
      const [startTime, endTime] = rangedate || [];
      if (isRealTimePower) {
        runPower({
          siteId,
          startTime: startTime ? startTime.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
          endTime: endTime ? endTime.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
        });
      } else {
        runElectricity({
          siteId,
          type: timeType,
          subType,
          date: date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
        });
      }
    }
  }, [siteId, rangedate, runPower, timeType, subType, runElectricity, date, isRealTimePower]);

  const option = {
    grid: {
      bottom: 50,
    },
    legend: {
      icon: 'rect',
      top: 'bottom',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params: any[]) {
        let result = params[0].name + '<br />';
        params.forEach((item) => {
          const value = item.data[item.seriesIndex + 1];
          const seriesName = item.seriesName;
          let lable = `${item.marker} ${seriesName}: ${isEmpty(value) ? '-' : value}`;
          if (item.seriesName.replace('(kW)', '') == formatMessage({ id: 'device.storage' })) {
            //储能系统
            if (!isEmpty(value)) {
              if (value >= 0) {
                lable += `(${formatMessage({
                  id: 'device.charge',
                  defaultMessage: '充电',
                })})`;
              } else {
                lable += `(${formatMessage({
                  id: 'device.discharge',
                  defaultMessage: '放电',
                })})`;
              }
            }
          }
          result += `${lable}<br />`;
        });
        return result;
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
    xAxis: {
      axisLabel: {
        formatter: (value: string) => {
          return value.replace(' ', '\n');
        },
      },
    },
    series: chartData?.map((item) => {
      return {
        type: item.type,
        color: item.color,
        barMaxWidth: item.barMaxWidth,
      };
    }),
  };

  return (
    <div
      onMouseOver={() => (timerRef.current.stop = true)}
      onMouseOut={() => (timerRef.current.stop = false)}
    >
      <div className={styles.total}>
        {!isRealTimePower
          ? chartData?.map((item) => (
              <div className={styles.totalWrapperr} key={item.name}>
                <div className={styles.totallable}>
                  {item.name}
                  {`(${item.unit})`}
                </div>
                <div className={styles.totalvalue}>{item.total}</div>
              </div>
            ))
          : ''}
      </div>
      <TypeChart
        type={isRealTimePower ? (isOneDay ? timeType : chartTypeEnum.Label) : timeType}
        chartRef={chartRef}
        date={date}
        option={option}
        style={{ height: '340px' }}
        data={chartData}
        allLabel={allLabel}
        step={isRealTimePower ? 2 : 60}
      />
    </div>
  );
};

export default RealTimePower;
