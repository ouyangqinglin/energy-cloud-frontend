/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-09 17:23:28
 * @LastEditTime: 2023-10-24 17:22:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\Scene\RealTimePower\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { Axis, Chart, LineAdvance, Legend, Annotation, Tooltip } from 'bizcharts';
import moment from 'moment';
import { getSiteId } from '../helper';
import type { Moment } from 'moment';
import styles from './index.less';
import { getData } from './service';
import { useToolTip } from '@/hooks';
import { formatMessage } from '@/utils';

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
//动态
const legendMap = new Map([
  ['me', formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' })],
  ['pv', formatMessage({ id: 'device.pv', defaultMessage: '光伏' })],
  ['es', formatMessage({ id: 'device.storage', defaultMessage: '储能' })],
  ['cs', formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' })],
  ['load', formatMessage({ id: 'device.otherLoad', defaultMessage: '其他负载' })],
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
    result.push({
      time: allMinute[i],
      value: valueMap.get(allMinute[i]),
      field,
    });
    if (nowMinute == allMinute[i]) {
      break;
    }
  }

  return result;
};

const RealTimePower: React.FC<RealTimePowerProps> = (props) => {
  const { date } = props;

  const [chartData, setChartData] = useState<DataType[]>();
  const [ticks, setTicks] = useState<string[]>();
  const siteId = getSiteId();
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
      siteId,
      date: date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
    });
  }, [siteId, date]);

  return (
    <div className={styles.chartWrapper}>
      <Chart
        padding={[50, 20, 20, 30]}
        ref={chartRef}
        height={266}
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
        <Tooltip
          domStyles={{
            'g2-tooltip': {
              border: '1px solid rgba(21, 154, 255, 0.8)',
              backgroundColor: 'rgba(9,12,21,0.8)',
              'box-shadow': '0 0 6px 0 rgba(21,154,255,0.7)',
              boxShadow: 'none',
              color: 'white',
              opacity: 1,
            },
          }}
        />
        <Annotation.Text
          position={['min', 'max']}
          content={formatMessage({ id: 'common.power', defaultMessage: '功率' }) + '(KW)'}
          offsetX={-10}
          offsetY={-10}
          style={{
            textAlign: 'left',
            fontSize: 12,
            fill: '#ACCCEC',
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
          itemName={{
            style: {
              fill: '#ACCCEC',
            },
          }}
          itemSpacing={0}
        />
        <LineAdvance
          shape="smooth"
          area
          color={['field', ['#ff7b7b', '#FFD15C', '#159AFF', '#11DA81', '#00C9EC']]}
          position="time*value"
        />
        <Axis
          name="value"
          label={{
            style: {
              fill: '#ACCCEC',
              fontSize: 12,
              fontWeight: 400,
            },
          }}
          grid={{
            line: {
              type: 'line',
              style: {
                stroke: '#2E3A45 ',
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
              fill: '#ACCCEC',
              fontSize: 12,
              fontWeight: 400,
            },
          }}
          line={{
            style: {
              stroke: '#475D72',
              lineWidth: 1,
              opacity: 0.6,
            },
          }}
          tickLine={null}
        />
      </Chart>
    </div>
  );
};

export default RealTimePower;
