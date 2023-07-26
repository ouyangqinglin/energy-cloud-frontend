import React, { useCallback, useEffect, useState } from 'react';
import { Axis, Chart, LineAdvance, Legend, Tooltip, Interval } from 'bizcharts';
import { useToolTip } from '@/hooks';
import { TimeType } from '@/components/TimeButtonGroup';
import { getBarChartData, getLineChartData } from '../ChartBox/helper';

type RealTimePowerProps = {
  chartData?: any;
  timeType: TimeType;
};

export const lineLegendMap = new Map([
  ['power', '储能总功率(kW)'],
  // ['chargePower', '储能总充电功率(kW)'],
  // ['dischargePower', '储能总放电功率(kW)'],
]);

export const barLegendMap = new Map([
  ['charge', '发电量'],
  ['discharge', '放电量'],
]);

const RealTimePower: React.FC<RealTimePowerProps> = (props) => {
  const { chartData: powerData, timeType } = props;
  const [chartData, setChartData] = useState<any[]>();
  const shouldShowLine = timeType === TimeType.DAY;

  useEffect(() => {
    if (shouldShowLine) {
      setChartData(getLineChartData(lineLegendMap, powerData));
      return;
    }
    setChartData(getBarChartData(barLegendMap, powerData, timeType));
  }, [powerData, shouldShowLine, timeType]);

  return (
    <Chart
      height={384}
      // padding={40}
      // bugfix: ticks的设置会导致slider出现白屏（看来像是放大到没有tick定义的时候会出现这个问题）
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
      <Legend
        position="bottom"
        marker={{
          symbol: shouldShowLine ? 'circle' : 'square',
        }}
        itemName={{
          style: {
            fill: '#606266',
          },
        }}
        itemSpacing={shouldShowLine ? 0 : 10}
      />
      {!shouldShowLine ? (
        <Interval
          size={timeType === TimeType.TOTAL ? 20 : timeType === TimeType.YEAR ? 10 : 5}
          adjust={[
            {
              type: 'dodge',
              marginRatio: 0,
            },
          ]}
          color={['field', ['#159AFF', '#11DA81', '#00C9EC']]}
          position="time*value"
        />
      ) : (
        <LineAdvance
          shape="smooth"
          color={['field', ['#159AFF', '#11DA81', '#00C9EC']]}
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
        title={{
          text: shouldShowLine ? '单位(kW)' : '单位(kWh)',
          position: 'end',
          autoRotate: false,
          offset: 0,
          style: {
            rotate: 90,
            y: 10,
            x: 40,
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
      {/* <Slider start={0} end={1} minLimit={0.2} /> */}
    </Chart>
  );
};

export default RealTimePower;
