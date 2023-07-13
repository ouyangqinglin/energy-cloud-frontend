import React from 'react';
import { G2, Chart, Tooltip, Interval, Line, Point, View, Axis, Guide } from 'bizcharts';

const data = [
  {
    type: '当日光伏收益(元)',
    date: '2022-1',
    count: 40,
  },
  {
    type: '当日储能收益(元)',
    date: '2022-1',
    count: 24,
  },
  {
    type: '当日收益(元)',
    date: '2022-1',
    total: 166,
  },
  {
    type: '当日光伏收益(元)',
    date: '2022-2',
    count: 28,
  },
  {
    type: '当日储能收益(元)',
    date: '2022-2',
    count: 13,
  },
  {
    type: '当日收益(元)',
    date: '2022-2',
    total: 166,
  },
  {
    type: '当日光伏收益(元)',
    date: '2022-3',
    count: 15,
  },
  {
    type: '当日储能收益(元)',
    date: '2022-3',
    count: 21,
  },
  {
    type: '当日收益(元)',
    date: '2022-3',
    total: 36,
  },
  {
    type: '当日光伏收益(元)',
    date: '2022-4',
    count: 26,
  },
  {
    type: '当日储能收益(元)',
    date: '2022-4',
    count: 18,
  },
  {
    type: '当日收益(元)',
    date: '2022-4',
    total: 46,
  },
  {
    type: '当日光伏收益(元)',
    date: '2022-5',
    count: 21,
  },
  {
    type: '当日储能收益(元)',
    date: '2022-5',
    count: 22,
  },
  {
    type: '当日收益(元)',
    date: '2022-5',
    total: 46,
  },
  {
    type: '当日光伏收益(元)',
    date: '2022-6',
    count: 38,
  },
  {
    type: '当日储能收益(元)',
    date: '2022-6',
    count: 22,
  },
  {
    type: '当日收益(元)',
    date: '2022-6',
    total: 76,
  },
];

const position = 'date*count';
export default function Grouped() {
  return (
    <Chart
      height={400}
      padding="20px"
      data={data}
      scale={{
        name: {},
      }}
      autoFit
    >
      <View data={data} padding={0}>
        <Axis name="date" visible={false} />
        <Axis name="total" visible={false} />
        <Line position="date*total" color={['type', ['#11DA81', '#00C9EC']]} />
        <Point position="date*total" color={['type', ['#11DA81', '#00C9EC']]} />
      </View>
      <Interval
        adjust={[
          {
            type: 'stack',
          },
        ]}
        size={20}
        color={['type', ['#18b1f7', '#01c1b2']]}
        position={position}
      />
      <Axis
        name="date"
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
      <Axis
        name="count"
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
            },
          },
        }}
      />
      <Tooltip shared />
    </Chart>
  );
}
