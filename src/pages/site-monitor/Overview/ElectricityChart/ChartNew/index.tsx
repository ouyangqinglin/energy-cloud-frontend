import React, { useEffect, useState, useRef } from 'react';
import { TimeType } from '@/components/TimeButtonGroup';
import type { SubTypeEnum } from '../../components/TimeButtonGroup';
import TypeChart from '@/components/Chart/TypeChart';
import type { TypeChartDataType } from '@/components/Chart/TypeChart';
import { useRequest } from 'umi';
import moment from 'moment';
import { formatMessage, isEmpty } from '@/utils';
import type { Moment } from 'moment';
import { getData, getElectricityData } from '../service';
import styles from './index.less';
import { getBarChartData, getLineChartData, makeDataVisibleAccordingFlag } from './helper';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { barFieldMap, lineFieldMap } from './config';
import type EChartsReact from 'echarts-for-react';

type RealTimePowerProps = {
  date?: Moment;
  siteId?: number | string;
  timeType: TimeType;
  subType: SubTypeEnum;
  rangedate: Moment[];
};

const RealTimePower: React.FC<RealTimePowerProps> = (props) => {
  const { date, siteId, timeType, subType, rangedate } = props;

  const timerRef = useRef({ stop: false });
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const chartRef = useRef<EChartsReact>();
  const [allLabel, setAllLabel] = useState<string[]>([]);

  const { data: powerData, run } = useRequest(getData, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const { data: electricityData, run: runElectricity } = useRequest(getElectricityData, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });
  const shouldShowLine = timeType === TimeType.DAY && subType == 0;

  useEffect(() => {
    if (!powerData || !electricityData) {
      return;
    }
    let calcData: TypeChartDataType[] = [];
    if (shouldShowLine) {
      const fieldConfig = makeDataVisibleAccordingFlag(
        [...lineFieldMap],
        powerData,
        shouldShowLine,
      );
      calcData = getLineChartData(powerData, fieldConfig);
    } else {
      const fieldConfig = makeDataVisibleAccordingFlag(
        [...barFieldMap],
        electricityData,
        shouldShowLine,
      );
      calcData = getBarChartData(electricityData, fieldConfig, timeType as number);
      if (calcData[calcData.length - 1]) {
        calcData[calcData.length - 1].type = 'line';
        calcData[calcData.length - 1].color = '#FF9AD5';
      }
    }
    chartRef.current?.getEchartsInstance?.()?.clear?.();
    setChartData(calcData);
    // setTotalData(getTotalData([...totalMap], powerData));
    const instance = chartRef?.current?.getEchartsInstance();
    let currentIndex = -1;
    const dataLen = calcData?.[0]?.data?.length || 0;
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
  }, [electricityData, powerData, shouldShowLine, timeType]);

  useEffect(() => {
    if (siteId) {
      const [startTime, endTime] = rangedate;
      run({
        siteId,
        startTime: startTime ? startTime.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
        endTime: endTime ? endTime.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
      });
      runElectricity({
        siteId,
        type: timeType,
        subType,
        date: date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
      });
    }
  }, [siteId, rangedate, run, timeType, subType, runElectricity, date]);

  useEffect(() => {
    chartData?.forEach((item) => {
      const data = item.data;
      if (data && data.length) {
        setAllLabel(data.map(({ label }) => label));
      }
    });
  }, [chartData]);

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
        {!shouldShowLine
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
        type={timeType}
        chartRef={chartRef}
        date={date}
        option={option}
        style={{ height: '340px' }}
        data={chartData}
        allLabel={allLabel}
        step={shouldShowLine ? 2 : 60}
      />
    </div>
  );
};

export default RealTimePower;
