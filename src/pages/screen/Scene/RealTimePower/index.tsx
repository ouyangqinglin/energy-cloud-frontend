/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-09 17:23:28
 * @LastEditTime: 2023-06-10 10:54:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\Scene\RealTimePower\index.tsx
 */
import React, { useEffect, useState } from 'react';
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
  value: number;
  field: string;
};

type ChartDataType = {
  eventTs: string;
  doubleVal: number;
};

const legendMap = new Map([
  ['pv', '光伏'],
  ['es', '储能'],
  ['cs', '充电桩'],
  ['me', '市电'],
  ['load', '负载'],
]);

const getChartData = (data: ChartDataType[], field: string): DataType[] => {
  return data.map((item) => {
    return {
      time: moment(item?.eventTs).format('HH:mm'),
      value: item?.doubleVal,
      field: field,
    };
  });
};

const RealTimePower: React.FC<RealTimePowerProps> = (props) => {
  const { date } = props;

  const [chartData, setChartData] = useState<DataType[]>();
  const siteId = getSiteId();

  useEffect(() => {
    getData({
      siteId,
      date: date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
    }).then(({ data }) => {
      const result: DataType[] = [];
      legendMap.forEach((_, key) => {
        result.push(...getChartData(data?.[key] || [], key));
      });
      setChartData(result);
    });
  }, [siteId, date]);

  return (
    <div className={styles.chartWrapper}>
      <Chart
        height={240}
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
            symbol: 'circle',
          }}
          itemName={{
            style: {
              fill: '#ACCCEC',
            },
            formatter: (text) => {
              return legendMap.get(text);
            },
          }}
          itemSpacing={0}
        />
        <LineAdvance
          shape="smooth"
          area
          color={['field', ['#FFE04D', '#159AFF', '#11DA81', '#FF8144', '#00C9EC']]}
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
