import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import {
  Axis,
  Chart,
  LineAdvance,
  Legend,
  Tooltip,
  Slider,
  Interval,
  Interaction,
} from 'bizcharts';
import moment from 'moment';
import type { Moment } from 'moment';
import { getData } from '../service';
import { useToolTip } from '@/hooks';
import { TimeType } from '../../components/TimeButtonGroup';
import { getBarChartData, getLineChartData, makeDataVisibleAccordingFlag } from './helper';
import type { DataType } from '../type';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { barFieldMap, lineFieldMap } from './config';
import { formatMessage } from '@/utils';

type RealTimePowerProps = {
  date?: Moment;
  siteId?: number | string;
  timeType: TimeType;
};

const RealTimePower: React.FC<RealTimePowerProps> = (props) => {
  const { date, siteId, timeType } = props;

  const [chartData, setChartData] = useState<DataType[]>();
  // const [ticks, setTicks] = useState<string[]>();
  const [chartRef, { clear, run: runForTooltip }] = useToolTip();
  const { data: powerData, run } = useRequest(getData, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });
  const shouldShowLine = timeType === TimeType.DAY;

  useEffect(() => {
    if (!powerData) {
      return;
    }
    if (shouldShowLine) {
      const fieldConfig = makeDataVisibleAccordingFlag([...lineFieldMap], powerData.flag);
      setChartData(getLineChartData(powerData, fieldConfig));
      return;
    }
    const fieldConfig = makeDataVisibleAccordingFlag([...barFieldMap], powerData.flag);
    const convertData = getBarChartData(powerData, fieldConfig, timeType);
    setChartData(convertData);
  }, [powerData, shouldShowLine, timeType]);

  useEffect(() => {
    if (siteId) {
      run({
        siteId,
        type: timeType,
        date: date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
      });
    }
  }, [siteId, date, run, timeType]);

  return (
    <div onMouseEnter={clear} onMouseOut={runForTooltip}>
      <Chart
        ref={chartRef}
        height={!chartData?.length ? 320 : 340}
        // bugfix: ticks的设置会导致slider出现白屏（看来像是放大到没有tick定义的时候会出现这个问题）
        scale={{}}
        data={chartData}
        autoFit
      >
        <Tooltip shared />
        <Interaction type="active-region" />
        <Legend
          visible={!!chartData?.length}
          position="top"
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
            size={timeType === TimeType.TOTAL ? 20 : timeType === TimeType.YEAR ? 7 : 3}
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
          title={{
            text: formatMessage({ id: 'common.unit', defaultMessage: '单位' }) + shouldShowLine ? `(kW)` : `(kWh)`,
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
        <Slider start={0} end={1} minLimit={0.2} />
      </Chart>
    </div>
  );
};

export default RealTimePower;
