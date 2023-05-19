import { Axis, Chart, LineAdvance, Legend } from 'bizcharts';
import { isEmpty, isNumber, sortBy } from 'lodash';
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
      const time = moment(item.ts).format('HH: mm');
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
  const sortedData = sortBy(sourceData, (o) => o.time);

  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.chartTitle}>光伏发电功率及辐照度曲线(KW)</h3>
      <Chart height={154} data={sortedData} autoFit>
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
              return text === 'radiancy' ? '辐照度' : '发电功率';
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
