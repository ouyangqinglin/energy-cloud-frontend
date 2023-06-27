import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { Axis, Chart, LineAdvance, Legend, Annotation } from 'bizcharts';
import moment from 'moment';
import type { Moment } from 'moment';
import { getData } from './service';

type RealTimePowerProps = {
  date?: Moment;
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

const allMinute = Array.from({ length: (24 * 60) / 2 }).map((_, index) => {
  return moment()
    .startOf('day')
    .add(index * 2, 'minute')
    .format('HH:mm');
});

const getNowMinute = () => {
  let nowMinute = moment().minute();
  if (nowMinute % 2) {
    nowMinute++;
  }
  return moment().minute(nowMinute).format('HH:mm');
};

const getChartData = (data: ChartDataType[], field: string): DataType[] => {
  const valueMap = new Map(
    data.map((item) => {
      return [moment(item?.eventTs).format('HH:mm'), item?.doubleVal];
    }),
  );

  const result: DataType[] = [];
  const length = allMinute.length;
  const nowMinute = getNowMinute();
  for (let i = 0; i < length; i++) {
    if (nowMinute == allMinute[i]) {
      break;
    } else {
      result.push({
        time: allMinute[i],
        value: valueMap.get(allMinute[i]),
        field,
      });
    }
  }

  return result;
};

const RealTimePower: React.FC<RealTimePowerProps> = (props) => {
  const { date } = props;

  const [chartData, setChartData] = useState<DataType[]>();
  const [ticks, setTicks] = useState<string[]>();
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
    const step = result.length / legendMap.size / 8;
    setTicks(
      step * 8 > 8
        ? [
            result[0].time,
            result[Math.floor(step * 1)].time,
            result[Math.floor(step * 2)].time,
            result[Math.floor(step * 3)].time,
            result[Math.floor(step * 4)].time,
            result[Math.floor(step * 5)].time,
            result[Math.floor(step * 6)].time,
            result[step * 8 - 1].time,
          ]
        : [],
    );
  }, [powerData]);

  useEffect(() => {
    run({
      date: date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
    });
  }, [date]);

  return (
    <Chart
      height={249}
      scale={{
        time: {
          ticks: ticks,
        },
        value: {
          type: 'linear',
        },
      }}
      data={chartData}
      autoFit
    >
      <Annotation.Text
        position={['min', 'max']}
        content="功率(KW)"
        offsetX={-10}
        offsetY={-25}
        style={{
          textAlign: 'left',
          fontSize: 12,
        }}
      />
      <Legend
        position="top-right"
        marker={{
          symbol: (x, y, radius) => {
            const r = radius / 2;
            return [
              ['M', x - 3 * r, y],
              ['L', x + 3 * r, y],
              ['M', x - r, y],
              ['A', r, r, 0, 0, 0, x + r, y],
              ['A', r, r, 0, 0, 0, x - r, y],
            ];
          },
          style: {
            fill: null,
          },
        }}
        itemSpacing={0}
      />
      <LineAdvance
        shape="smooth"
        area
        color={['field', ['#FF8144', '#FFE04D', '#159AFF', '#11DA81', '#00C9EC']]}
        position="time*value"
      />
      <Axis
        name="value"
        label={{
          style: {
            fontSize: 12,
            fontWeight: 400,
          },
        }}
        grid={{
          line: {
            type: 'line',
            style: {
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
            fontSize: 12,
            fontWeight: 400,
          },
        }}
        title={false}
        line={{
          style: {
            lineWidth: 1,
            opacity: 0.6,
          },
        }}
        tickLine={null}
      />
    </Chart>
  );
};

export default RealTimePower;
