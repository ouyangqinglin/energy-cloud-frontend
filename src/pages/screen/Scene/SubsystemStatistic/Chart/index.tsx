import { Axis, Chart, Legend, Tooltip, Interval } from 'bizcharts';
import { isEmpty, isNumber, sortBy } from 'lodash';
import moment from 'moment';
import type { FC } from 'react';
import type { ChartDataMap, ChartRes } from './type';
import styles from './index.less';
import { DatePicker } from 'antd';
import classnames from 'classnames';
type Props = {
  chartData: ChartRes;
  chartConfigMap: Record<
    string,
    {
      name: string;
      unit: string;
    }
  >;
  showLegend?: boolean;
  title?: string;
};
const StatisticChart: FC<Props> = ({
  chartData,
  title,
  chartConfigMap = {},
  showLegend = false,
}) => {
  // if (isEmpty(chartData)) {
  //   return <></>;
  // }

  const sourceData: {
    date: string;
    value: number;
    field: string;
  }[] = [];
  const fillData = (arr: ChartDataMap[], field: string) => {
    if (isEmpty(arr)) {
      return;
    }
    arr.forEach((item) => {
      if (!isNumber(item.ts)) {
        return;
      }
      const date = moment(item.ts).format('HH: mm');
      const value = Math.floor(item.value * 100) / 100;
      sourceData.push({
        date,
        value,
        field,
      });
    });
  };
  Object.keys(chartConfigMap).forEach((key) => {
    fillData(chartData[key], key);
  });
  const sortedData = sortBy(sourceData, (o) => o.date);

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.topBar}>
        <h3 className={styles.chartTitle}>{title}</h3>
        <DatePicker.RangePicker
          popupClassName={styles.rangePickerPanel}
          size={'small'}
          className={styles.rangePicker}
        />
      </div>
      <div className={styles.axisTitle}>单位(kW·h)</div>
      <Chart height={200} data={sortedData} autoFit>
        <Interval
          adjust={[
            {
              type: 'dodge',
              marginRatio: 6,
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
        {showLegend && (
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
    </div>
  );
};

export default StatisticChart;
