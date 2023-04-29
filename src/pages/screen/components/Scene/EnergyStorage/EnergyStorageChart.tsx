import { Axis, Chart, LineAdvance, Legend } from 'bizcharts';
import type { FC } from 'react';
import styles from './EnergyStorageChart.less';

const PhotovoltaicChart: FC = () => {
  const data = [
    { year: '1991', value: 15468, field: 'SOC' },
    { year: '1991', value: 32040, field: 'current' },
    { year: '1991', value: 12040, field: 'voltage' },
    { year: '1991', value: 22040, field: 'power' },
    { year: '1992', value: 26100, field: 'SOC' },
    { year: '1992', value: 21233, field: 'current' },
    { year: '1992', value: 16100, field: 'voltage' },
    { year: '1992', value: 24233, field: 'power' },
    { year: '1993', value: 31900, field: 'SOC' },
    { year: '1993', value: 12900, field: 'current' },
    { year: '1993', value: 35900, field: 'voltage' },
    { year: '1993', value: 12900, field: 'power' },
    { year: '1994', value: 16409, field: 'SOC' },
    { year: '1994', value: 15409, field: 'current' },
    { year: '1994', value: 14409, field: 'voltage' },
    { year: '1994', value: 13409, field: 'power' },
    { year: '1995', value: 27000, field: 'SOC' },
    { year: '1995', value: 26000, field: 'current' },
    { year: '1995', value: 21000, field: 'voltage' },
    { year: '1995', value: 17000, field: 'power' },
    { year: '1996', value: 21056, field: 'SOC' },
    { year: '1996', value: 11056, field: 'current' },
    { year: '1996', value: 21056, field: 'voltage' },
    { year: '1996', value: 11056, field: 'power' },
    { year: '1997', value: 31982, field: 'SOC' },
    { year: '1997', value: 21982, field: 'current' },
    { year: '1997', value: 31982, field: 'voltage' },
    { year: '1997', value: 21982, field: 'power' },
    { year: '1998', value: 32040, field: 'SOC' },
    { year: '1998', value: 12040, field: 'current' },
    { year: '1998', value: 32040, field: 'voltage' },
    { year: '1998', value: 12040, field: 'power' },
  ];

  const legendConfig = {
    SOC: 'SOC',
    current: '电流',
    voltage: '电压',
    power: '功率',
  };

  return (
    <div className={styles.chartWrapper}>
      <Chart height={154} data={data} autoFit>
        <LineAdvance shape="smooth" area color="field" position="year*value" />
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
          name="year"
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
