import { Axis, Chart, LineAdvance, Legend, Tooltip } from 'bizcharts';
import { isEmpty, isNumber, sortBy } from 'lodash';
import moment from 'moment';
import type { FC } from 'react';
import styles from './index.less';
import type { ChartDataMap, EnergyStorageChartRes } from '../type';

type Props = {
  chartData: EnergyStorageChartRes | undefined;
};

const PhotovoltaicChart: FC<Props> = ({ chartData }) => {
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
        <Tooltip />
      </Chart>
    </div>
  );
};

export default PhotovoltaicChart;
