import { Axis, Chart, Legend, Tooltip, Interval } from 'bizcharts';
import type { Moment } from 'moment';
import type { FC } from 'react';
import { useEffect } from 'react';
import type { ChartData } from './type';
import styles from './index.less';
import { DatePicker } from 'antd';
import type { RangePickerSharedProps } from 'rc-picker/lib/RangePicker';
import dayjs from 'dayjs';
type Props = {
  chartData: ChartData;
  chartConfigMap?: Record<
    string,
    {
      name: string;
      unit: string;
    }
  >;
  showLegend?: boolean;
  title?: string;
  onDateChange?: RangePickerSharedProps<Moment>['onChange'];
};

const dateFormat = 'YYYY.MM.DD';
const defaultValue = [dayjs().subtract(1, 'w'), dayjs()] as any;

const StatisticChart: FC<Props> = ({ chartData, title, chartConfigMap = {}, onDateChange }) => {
  useEffect(() => {
    if (onDateChange) {
      onDateChange(defaultValue, [dateFormat, dateFormat]);
    }
  }, [onDateChange]);

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.topBar}>
        <h3 className={styles.chartTitle}>{title}</h3>
        <DatePicker.RangePicker
          defaultValue={defaultValue}
          format={dateFormat}
          popupClassName={styles.rangePickerPanel}
          size={'small'}
          onChange={onDateChange}
          className={styles.rangePicker}
        />
      </div>
      <div className={styles.axisTitle}>单位(kW·h)</div>
      {chartData && (
        <Chart height={200} data={chartData} autoFit>
          <Interval
            adjust={[
              {
                type: 'dodge',
                marginRatio: 0,
              },
            ]}
            color="field"
            position="date*value"
          />
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
            name="date"
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
          {chartConfigMap && (
            <Tooltip showCrosshairs>
              {(t, items: any) => {
                return (
                  <>
                    <div style={{ paddingTop: 10 }}>{t}</div>
                    {items.map((it: any, idx: number) => {
                      const name = chartConfigMap[it.data.field]?.name;
                      const unit = chartConfigMap[it.data.field]?.unit;
                      return (
                        <>
                          <div style={{ paddingTop: 10 }} key={idx}>
                            {name}: {it.value + ' ' + unit}
                          </div>
                          <br />
                        </>
                      );
                    })}
                  </>
                );
              }}
            </Tooltip>
          )}
          {chartConfigMap && (
            <Legend
              itemName={{
                spacing: 5,
                style: {
                  fill: '#6C8097',
                },
                formatter: (text) => {
                  return chartConfigMap[text]?.name ?? '';
                },
              }}
              offsetX={0}
              offsetY={0}
              itemSpacing={5}
              position="top-right"
            />
          )}
        </Chart>
      )}
    </div>
  );
};

export default StatisticChart;
