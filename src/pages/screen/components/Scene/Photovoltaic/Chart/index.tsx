import { Axis, Chart, LineAdvance, Legend } from 'bizcharts';
import { isEmpty, isNumber } from 'lodash';
import moment from 'moment';
import type { FC } from 'react';
import type { ChartDataMap, PVChartRes } from '../type';
import styles from './index.less';
type Props = {
  chartData: PVChartRes;
};
const PhotovoltaicChart: FC<Props> = ({ chartData }) => {
  if (isEmpty(chartData)) {
    return <></>;
  }

  // const data = [
  //   { year: '1991', value: 15468, field: 'powerGeneration' },
  //   { year: '1991', value: 32040, field: 'radiancy' },
  //   { year: '1992', value: 16100, field: 'powerGeneration' },
  //   { year: '1992', value: 33233, field: 'radiancy' },
  //   { year: '1993', value: 15900, field: 'powerGeneration' },
  //   { year: '1993', value: 15900, field: 'radiancy' },
  //   { year: '1994', value: 17409, field: 'powerGeneration' },
  //   { year: '1994', value: 17409, field: 'radiancy' },
  //   { year: '1995', value: 17000, field: 'powerGeneration' },
  //   { year: '1995', value: 17000, field: 'radiancy' },
  //   { year: '1996', value: 21056, field: 'powerGeneration' },
  //   { year: '1996', value: 11056, field: 'radiancy' },
  //   { year: '1997', value: 31982, field: 'powerGeneration' },
  //   { year: '1997', value: 21982, field: 'radiancy' },
  //   { year: '1998', value: 32040, field: 'powerGeneration' },
  //   { year: '1998', value: 12040, field: 'radiancy' },
  // ];

  const sourceData: {
    time: string;
    value: number;
    field: 'powerGeneration' | 'radiancy';
  }[] = [];
  const fillData = (arr: ChartDataMap[], field: 'powerGeneration' | 'radiancy') => {
    if (isEmpty(arr)) {
      return;
    }
    arr.forEach((item) => {
      if (!isNumber(item.ts)) {
        return;
      }
      const time = moment(item.ts).format('hh: mm');
      const value = Math.floor(item.value * 100) / 100;
      sourceData.push({
        time,
        value,
        field,
      });
    });
  };
  fillData(chartData?.activePower, 'powerGeneration');
  fillData(chartData?.irradiance, 'radiancy');

  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.chartTitle}>光伏发电功率及辐照度曲线(KW)</h3>
      <Chart height={154} data={sourceData} autoFit>
        <LineAdvance shape="smooth" area color="field" position="time*value" />
        <Axis
          name="value"
          label={{
            style: {
              fill: '#6C8097',
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
              fill: '#6C8097',
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
        <Legend
          marker={{
            symbol: 'hyphen',
          }}
          itemName={{
            spacing: 5,
            style: {
              fill: '#6C8097',
            },
            formatter: (text) => {
              return text === 'radiancy' ? '辐射度' : '发电功率';
            },
          }}
          offsetX={0}
          offsetY={0}
          itemSpacing={5}
          position="top-right"
        />
      </Chart>
    </div>
  );
};

export default PhotovoltaicChart;
