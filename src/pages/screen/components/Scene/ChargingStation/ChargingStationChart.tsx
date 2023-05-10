import { Axis, Chart, Area, Line, LineAdvance } from 'bizcharts';
import { ScaleOption } from 'bizcharts/lib/interface';
import type { FC } from 'react';
import styles from './ChargingStationChart.less';

const ChargingStation: FC = () => {
  const data = [
    { year: '1991', value: 15468 },
    { year: '1992', value: 16100 },
    { year: '1993', value: 15900 },
    { year: '1994', value: 17409 },
    { year: '1995', value: 17000 },
    { year: '1996', value: 21056 },
    { year: '1997', value: 31982 },
    { year: '1998', value: 32040 },
    { year: '1999', value: 33233 },
  ];

  const scale: Record<string, ScaleOption> = {
    value: {
      alias: '充电功率曲线(KW)',
    },
  };

  return (
    <>
      <h3 className={styles.chartTitle}>充电功率曲线(KW)</h3>
      <Chart scale={scale} height={154} data={data} autoFit>
        <LineAdvance shape="smooth" area position="year*value" />
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
      </Chart>
    </>
  );
};

export default ChargingStation;
