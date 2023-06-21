/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-09 17:23:28
 * @LastEditTime: 2023-06-21 09:38:52
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\Scene\RealTimePower\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { Axis, Chart, LineAdvance, Legend, Annotation } from 'bizcharts';
import moment from 'moment';
import { getSiteId } from '../helper';
import type { Moment } from 'moment';
import styles from './index.less';
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
  const siteId = getSiteId();
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
        height={249}
        scale={{
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
          offsetX={-25}
          offsetY={-25}
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
          color={['field', ['#FF8144', '#FFE04D', '#159AFF', '#11DA81', '#00C9EC']]}
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
