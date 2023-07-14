import React, { useEffect, useState } from 'react';
import { Axis, Chart, Legend, Tooltip, Interval, View, Line, Point } from 'bizcharts';
import { useToolTip } from '@/hooks';
import { getBarChartData, getLineChartData } from './helper';
import { TimeType } from '@/components/TimeButtonGroup';

type RealTimePowerProps = {
  chartDate?: any;
  timeType: TimeType;
};

const RealTimePower: React.FC<RealTimePowerProps> = (props) => {
  const { chartDate: powerData, timeType } = props;
  const [chartData, setChartData] = useState<any[]>();
  const [chartRef, { clear, run: runForTooltip }] = useToolTip();

  useEffect(() => {
    setChartData(getBarChartData(powerData, timeType));
  }, [powerData, timeType]);

  return (
    <div onMouseEnter={clear} onMouseOut={runForTooltip}>
      <Chart
        ref={chartRef}
        height={384}
        padding={40}
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
          <Line position="time*total" color={['type', ['#11DA81', '#00C9EC']]} />
          <Point position="time*total" color={['type', ['#11DA81', '#00C9EC']]} />
        </View>
        <Interval
          adjust={[
            {
              type: 'stack',
            },
          ]}
          size={20}
          color={['type', ['#18b1f7', '#01c1b2']]}
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
    </div>
  );
};

export default RealTimePower;
