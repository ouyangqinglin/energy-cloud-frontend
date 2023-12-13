import React, { useEffect, useState } from 'react';
import { Axis, Chart, Legend, Tooltip, Interval, View, Line, Point, LineAdvance } from 'bizcharts';
// import { useToolTip } from '@/hooks';
import { TimeType } from '@/components/TimeButtonGroup';
import { DataType, getChartData, TimeFormat } from '../ChartBox/helper';
import { ChartItem } from '../ChartBox/type';
import moment from 'moment';
// import { getBarChartData } from '../ChartBox/helper';
import { SiteTypeEnum, SiteTypeEnumType } from '@/utils/dict';
import { formatMessage } from '@/utils';

type RealTimePowerProps = {
  chartData?: any;
  timeType: TimeType;
  siteType?: SiteTypeEnumType;
};

export const barLegendMap = new Map([
  ['pvIncome', formatMessage({ id: 'index.chart.pvIncome', defaultMessage: '光伏收益/元' })],
  ['esIncome', formatMessage({ id: 'index.chart.energyIncome', defaultMessage: '储能收益/元' })],
  ['csIncome', formatMessage({ id: 'index.chart.chargeIncome', defaultMessage: '充电桩收益/元' })],
  ['income', formatMessage({ id: 'index.chart.totalIncome', defaultMessage: '总收益/元' })],
]);

const barSizeMap = new Map([
  [TimeType.DAY, 5],
  [TimeType.MONTH, 10],
  [TimeType.YEAR, 15],
  [TimeType.TOTAL, 20],
]);

export const getBarChartData = (
  rawSourceData: Record<string, ChartItem[]>,
  timeType: TimeType,
  siteType?: SiteTypeEnumType,
) => {
  const result: DataType[] = [];
  if (!rawSourceData) return result;
  const legendMap = () => {
    return barLegendMap;
  };
  if (timeType === TimeType.DAY) {
    legendMap().forEach((item, key) => {
      if (key == 'pvIncome') {
        if (
          ![SiteTypeEnum.ES + '', SiteTypeEnum.CS + '', SiteTypeEnum.ES_CS + ''].includes(
            siteType || '',
          )
        ) {
          result.push(
            ...getChartData(
              rawSourceData?.[key] || [],
              item,
              { time: 'timeDimension', value: 'amount' },
              'value',
            ),
          );
        }
      } else if (key == 'esIncome') {
        if (![SiteTypeEnum.PV + '', SiteTypeEnum.CS + ''].includes(siteType || '')) {
          result.push(
            ...getChartData(
              rawSourceData?.[key] || [],
              item,
              { time: 'timeDimension', value: 'amount' },
              'value',
            ),
          );
        }
      } else if (key == 'csIncome') {
        if (
          ![SiteTypeEnum.PV + '', SiteTypeEnum.ES + '', SiteTypeEnum.PV_ES + ''].includes(
            siteType || '',
          )
        ) {
          result.push(
            ...getChartData(
              rawSourceData?.[key] || [],
              item,
              { time: 'timeDimension', value: 'amount' },
              'value',
            ),
          );
        }
      } else {
        result.push(
          ...getChartData(
            rawSourceData?.[key] || [],
            item,
            { time: 'timeDimension', value: 'amount' },
            'total',
          ),
        );
      }
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
  const { chartData: powerData, timeType, siteType } = props;
  const [chartData, setChartData] = useState<any[]>();
  // const [chartRef, { clear, run: runForTooltip }] = useToolTip();

  useEffect(() => {
    (async () => {
      setChartData(await getBarChartData(powerData, timeType, siteType));
    })();
  }, [powerData, timeType]);

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
      {/* <View data={powerData} padding={0}>
        <Axis name="time" visible={false} />
        <Axis name="total" visible={false} />
        <Line position="time*total" color={['field', ['#FFD15C', '#00C9EC']]} />
        <Point position="time*total" color={['field', ['#FFD15C', '#00C9EC']]} />
      </View> */}
      <Interval
        adjust={[
          {
            type: 'stack',
          },
        ]}
        size={barSizeMap.get(timeType)}
        color={['field', ['#ffd15c', '#159aff', '#01cfa1', '#FF7B7B']]}
        position="time*value"
      />
      <Line position="time*total" color={['field', ['#FF7B7B']]} />
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
