import { Axis, Chart, LineAdvance, Legend } from 'bizcharts';
import { isEmpty, isNumber, sortBy } from 'lodash';
import moment from 'moment';
import type { FC } from 'react';
import styles from './index.less';
import type { ChartDataMap, EnergyStorageChartRes } from '../type';

type Props = {
  chartData: EnergyStorageChartRes | undefined;
};

const PhotovoltaicChart: FC<Props> = ({ chartData }) => {
  // const sourceData = [
  //   { time: '1991', value: 15468, field: 'SOC' },
  //   { time: '1991', value: 32040, field: 'current' },
  //   { time: '1991', value: 12040, field: 'voltage' },
  //   { time: '1991', value: 22040, field: 'power' },
  //   { time: '1992', value: 26100, field: 'SOC' },
  //   { time: '1992', value: 21233, field: 'current' },
  //   { time: '1992', value: 16100, field: 'voltage' },
  //   { time: '1993', value: 31900, field: 'SOC' },
  //   { time: '1993', value: 12900, field: 'current' },
  //   { time: '1993', value: 35900, field: 'voltage' },
  //   { time: '1993', value: 12900, field: 'power' },
  //   { time: '1994', value: 16409, field: 'SOC' },
  //   { time: '1994', value: 15409, field: 'current' },
  //   { time: '1994', value: 14409, field: 'voltage' },
  //   { time: '1995', value: 27000, field: 'SOC' },
  //   { time: '1995', value: 26000, field: 'current' },
  //   { time: '1995', value: 21000, field: 'voltage' },
  //   { time: '1995', value: 17000, field: 'power' },
  //   { time: '1996', value: 21056, field: 'SOC' },
  //   { time: '1996', value: 11056, field: 'current' },
  //   { time: '1996', value: 21056, field: 'voltage' },
  //   { time: '1997', value: 31982, field: 'SOC' },
  //   { time: '1997', value: 21982, field: 'current' },
  //   { time: '1997', value: 31982, field: 'voltage' },
  //   { time: '1998', value: 32040, field: 'SOC' },
  //   { time: '1998', value: 12040, field: 'current' },
  //   { time: '1999', value: 17000, field: 'power' },
  //   { time: '1998', value: 32040, field: 'voltage' },
  // ];
  if (isEmpty(chartData)) {
    return <></>;
  }

  const sourceData: {
    time: string;
    value: number;
    field: 'soc' | 'current' | 'voltage' | 'power';
  }[] = [];
  const fillData = (arr: ChartDataMap[], field: 'soc' | 'current' | 'voltage' | 'power') => {
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
  fillData(chartData?.TotalBatteryCurrent, 'current');
  fillData(chartData?.TotalBatteryVoltage, 'voltage');
  fillData(chartData?.SOC, 'soc');
  fillData(chartData?.PDC, 'power');
  const sortedData = sortBy(sourceData, (o) => o.time);

  const legendConfig = {
    soc: 'SOC',
    current: '电流',
    voltage: '电压',
    power: '功率',
  };

  const scale = {
    value: {
      type: 'linear',
      tickCount: 5,
      ticks: ['0', '25', '50', '75', '100'],
    },
  };

  return (
    <div className={styles.chartWrapper}>
      <Chart height={154} scale={scale} data={sortedData} autoFit>
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
            style: {
              fill: '#6C8097',
            },
            formatter: (text) => {
              return legendConfig[text];
            },
          }}
          itemSpacing={5}
          position="top"
        />
      </Chart>
    </div>
  );
};

export default PhotovoltaicChart;
