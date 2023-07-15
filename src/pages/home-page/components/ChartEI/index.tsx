import React, { useEffect, useState } from 'react';
import { Axis, Chart, Legend, Tooltip, Interval, View, Line, Point } from 'bizcharts';
// import { useToolTip } from '@/hooks';
import { TimeType } from '@/components/TimeButtonGroup';
import { DataType, getChartData, TimeFormat } from '../ChartBox/helper';
import { ChartItem } from '../ChartBox/type';
import moment from 'moment';
// import { getBarChartData } from '../ChartBox/helper';

type RealTimePowerProps = {
  chartData?: any;
  timeType: TimeType;
};

export const barLegendMap = new Map([
  ['pvIncome', '当日光伏收益(元)'],
  ['esIncome', '当日储能收益(元)'],
  ['income', '当日收益(元)'],
]);

export const yearBarLegendMap = new Map([
  ['pvIncome', '月光伏收益(元)'],
  ['esIncome', '月储能收益(元)'],
  ['income', '月收益(元)'],
]);

export const totalBarLegendMap = new Map([
  ['pvIncome', '年光伏收益(元)'],
  ['esIncome', '年储能收益(元)'],
  ['income', '年收益(元)'],
]);

const barSizeMap = new Map([
  [TimeType.DAY, 5],
  [TimeType.MONTH, 10],
  [TimeType.YEAR, 15],
  [TimeType.TOTAL, 20],
]);

export const getBarChartData = (rawSourceData: Record<string, ChartItem[]>, timeType: TimeType) => {
  const result: DataType[] = [];
  const legendMap = () => {
    if (timeType === TimeType.YEAR) {
      return yearBarLegendMap;
    }
    if (timeType === TimeType.TOTAL) {
      return totalBarLegendMap;
    }
    return barLegendMap;
  };
  if (timeType === TimeType.DAY) {
    legendMap().forEach((item, key) => {
      result.push(
        ...getChartData(
          rawSourceData?.[key] || [],
          item,
          { time: 'timeDimension', value: 'amount' },
          key === 'income' ? 'total' : 'value',
        ),
      );
    });
    return result;
  }
  legendMap().forEach((field, key) => {
    const transformData =
      rawSourceData?.[key]?.map(({ amount, timeDimension }) => {
        const valueObj = key === 'income' ? { total: amount } : { value: amount };
        return {
          time: moment(timeDimension).format(TimeFormat.get(timeType)),
          field,
          ...valueObj,
        };
      }) ?? [];
    result.push(...transformData);
  });
  return result;
};

const RealTimePower: React.FC<RealTimePowerProps> = (props) => {
  const { chartData: powerData, timeType } = props;
  const [chartData, setChartData] = useState<any[]>();
  // const [chartRef, { clear, run: runForTooltip }] = useToolTip();

  useEffect(() => {
    setChartData(getBarChartData(powerData, timeType));
  }, [powerData, timeType]);
  console.log(chartData);

  return (
    // <div onMouseEnter={clear} onMouseOut={runForTooltip}>
    <Chart
      // ref={chartRef}
      height={384}
      // padding={40}
      // bugfix: ticks的设置会导致slider出现白屏（看来像是放大到没有tick定义的时候会出现这个问题）
      data={chartData}
      autoFit
    >
      <Legend
        position="bottom"
        itemName={{
          style: {
            fill: '#606266',
          },
        }}
      />
      <View data={powerData} padding={0}>
        <Axis name="time" visible={false} />
        <Axis name="total" visible={false} />
        <Line position="time*total" color={['field', ['#FFD15C', '#00C9EC']]} />
        <Point position="time*total" color={['field', ['#FFD15C', '#00C9EC']]} />
      </View>
      <Interval
        adjust={[
          {
            type: 'stack',
          },
        ]}
        size={barSizeMap.get(timeType)}
        color={['field', ['#18b1f7', '#01c1b2']]}
        position="time*value"
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
            },
          },
        }}
      />
      <Tooltip shared />
    </Chart>
    // </div>
  );
};

export default RealTimePower;
