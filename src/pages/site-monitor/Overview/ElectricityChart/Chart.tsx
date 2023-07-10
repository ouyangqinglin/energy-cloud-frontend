import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { Axis, Chart, LineAdvance, Legend, Annotation, Tooltip, Slider, Interval } from 'bizcharts';
import moment from 'moment';
import type { Moment } from 'moment';
import { getData } from './service';
import { useToolTip } from '@/hooks';
import { TimeType } from '../components/TimeButtonGroup';

type RealTimePowerProps = {
  date?: Moment;
  siteId?: number | string;
  timeType: TimeType;
};

type DataType = {
  time: string;
  value: number | undefined;
  field: string;
};

type ChartDataType = {
  eventTs: string;
  doubleVal: number;
};

const legendMap = new Map([
  ['me', '市电'],
  ['pv', '光伏'],
  ['es', '储能'],
  ['cs', '充电桩'],
  ['load', '其他负载'],
]);

const allMinute = Array.from({ length: (24 * 60) / 10 }).map((_, index) => {
  return moment()
    .startOf('day')
    .add(index * 10, 'minute')
    .format('HH:mm');
});

const getChartData = (data: ChartDataType[], field: string): DataType[] => {
  const valueMap = new Map(
    data.map((item) => {
      return [moment(item?.eventTs).format('HH:mm'), item?.doubleVal];
    }),
  );

  const result: DataType[] = [];
  const length = allMinute.length;
  for (let i = 0; i < length; i++) {
    result.push({
      time: allMinute[i],
      value: valueMap.get(allMinute[i]) ?? 0,
      field,
    });
  }

  return result;
};

const RealTimePower: React.FC<RealTimePowerProps> = (props) => {
  const { date, siteId, timeType } = props;

  const [chartData, setChartData] = useState<DataType[]>();
  const [ticks, setTicks] = useState<string[]>();
  const [chartRef] = useToolTip();
  const { data: powerData, run } = useRequest(getData, {
    manual: true,
    pollingInterval: 2 * 60 * 1000,
  });

  useEffect(() => {
    const result: DataType[] = [];
    legendMap.forEach((item, key) => {
      result.push(...getChartData(powerData?.[key] || [], item));
    });
    setChartData(result);
    const tickNum = 24;
    const step = result.length / legendMap.size / tickNum;
    setTicks(
      step * tickNum > tickNum
        ? new Array(tickNum).map((_, index) => {
            return result[Math.floor(step * index)].time;
          })
        : [],
    );
    console.log(ticks, step * tickNum > tickNum);
  }, [powerData]);

  useEffect(() => {
    if (siteId) {
      run({
        siteId,
        date: date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
      });
    }
  }, [siteId, date]);

  const shouldShowLine = timeType === TimeType.DAY;

  return (
    <Chart
      ref={chartRef}
      height={340}
      // bugfix: ticks的设置会导致slider出现白屏（看来像是放大到没有tick定义的时候会出现这个问题）
      scale={{
        value: {
          type: 'linear',
          min: -100,
        },
      }}
      data={chartData}
      autoFit
    >
      <Tooltip
        domStyles={{
          'g2-tooltip': {
            backgroundColor: 'rgba(9,12,21,0.8)',
            boxShadow: 'none',
            color: 'white',
            opacity: 1,
          },
        }}
      />
      <Annotation.Text
        position={['min', 'max']}
        content="单位(KW)"
        offsetX={-25}
        offsetY={0}
        style={{
          textAlign: 'left',
          fontSize: 12,
          fill: '#909399',
        }}
      />
      <Legend
        position="top"
        marker={{
          symbol: 'circle',
        }}
        itemName={{
          style: {
            fill: '#606266',
          },
        }}
        itemSpacing={0}
      />
      {!shouldShowLine ? (
        <Interval
          size={4}
          adjust={[
            {
              type: 'dodge',
              marginRatio: 0,
            },
          ]}
          color={['field', ['#ff7b7b', '#FFD15C', '#159AFF', '#11DA81', '#00C9EC']]}
          position="time*value"
        />
      ) : (
        <LineAdvance
          shape="smooth"
          color={['field', ['#ff7b7b', '#FFD15C', '#159AFF', '#11DA81', '#00C9EC']]}
          position="time*value"
        />
      )}
      <Axis
        name="value"
        label={{
          style: {
            fill: '#909399',
            fontSize: 12,
            fontWeight: 400,
          },
        }}
        grid={{
          line: {
            type: 'line',
            style: {
              stroke: '#E9E9E9',
              lineWidth: 1,
              lineDash: [4, 4],
            },
          },
        }}
      />
      <Axis
        name="time"
        label={{
          style: {
            fill: '#909399',
            fontSize: 12,
            fontWeight: 400,
          },
        }}
        line={{
          style: {
            stroke: '#E9E9E9',
            lineWidth: 1,
            opacity: 0.6,
          },
        }}
        tickLine={null}
      />
      <Slider start={0} end={1} minLimit={0.2} />
    </Chart>
  );
};

export default RealTimePower;
