import React, { useEffect, useState, useRef } from 'react';
import { TimeType, SubTypeEnum } from '@/components/TimeButtonGroup';
import TypeChart, { TypeChartDataType } from '@/components/Chart/TypeChart';
import { useRequest } from 'umi';
import moment from 'moment';
import { formatMessage } from '@/utils';
import type { Moment } from 'moment';
import { getData } from '../service';
import styles from './index.less';
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
  const [allLabel, setAllLabel] = useState<string[]>([]);

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
      const fieldConfig = makeDataVisibleAccordingFlag(
        [...lineFieldMap],
        powerData.flag,
        timeType as number,
      );
      calcData = getLineChartData(powerData, fieldConfig);
    } else {
      const fieldConfig = makeDataVisibleAccordingFlag(
        [...barFieldMap],
        powerData.flag,
        timeType as number,
      );
      calcData = getBarChartData(powerData, fieldConfig, timeType as number);
    }
    console.log('calcData>>', calcData);
    setChartData(calcData);
    // setTotalData(getTotalData([...totalMap], powerData));
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

  useEffect(() => {
    chartData?.forEach((item) => {
      const data = item.data;
      if (data && data.length&&data.length>allLabel.length) {
        setAllLabel(data.map(({ label }) => label));
      }
    });
  }, [chartData]);

  const option = {
    yAxis: {
      type: 'value',
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
      formatter: function (params: any[]) {
        const currentTime = moment('2023-01-01 ' + params[0].name);
        const time =
          subType == 0
            ? currentTime.add(2, 'm').format('HH:mm')
            : currentTime.add(1, 'h').format('HH:mm');
        let result =
          (timeType === TimeType.DAY ? `${params[0].name}-${time}` : params[0].name) + '<br />';
        params.forEach((item) => {
          let seriesName = item.seriesName;
          if (seriesName == formatMessage({ id: 'index.tab.income' })) {
            //收益
            seriesName += `(${formatMessage({ id: 'common.rmb', defaultMessage: '元' })})`;
          } else {
            seriesName += shouldShowLine ? '(kW)' : '(kWh)';
          }
          let lable = `${item.marker} ${seriesName}: ${item.value || 0}`;
          if (seriesName == formatMessage({ id: 'device.storage' })) {
            //储能系统
            if (item.value) item.value >= 0 ? (lable += `(充电)`) : (lable += `(放电)`);
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
    series: chartData,
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
        calculateMax={false}
        notMerge
      />
    </div>
  );
};

export default RealTimePower;
