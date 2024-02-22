import { Axis, Chart, Legend, Tooltip, Interval, Interaction } from 'bizcharts';
import type { Moment } from 'moment';
import type { FC } from 'react';
import { useEffect } from 'react';
import type { ChartData } from './type';
import styles from './index.less';
import { DatePicker } from 'antd';
import type { RangePickerSharedProps } from 'rc-picker/lib/RangePicker';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import type { LegendCfg } from 'bizcharts/lib/interface';
import useToolTip from '@/hooks/useTooltip';
import { formatMessage } from '@/utils';
type Props = {
  chartData: ChartData;
  legendLayout?: LegendCfg['layout'];
  color?: string[];
  chartConfigMap?: Record<
    string,
    {
      name: string;
      unit: string;
    }
  >;
  showDatePicker?: boolean;
  showLegend?: boolean;
  title?: string;
  height?: number;
  barSize?: number;
  onDateChange?: RangePickerSharedProps<Moment>['onChange'];
};

const dateFormat = 'YYYY.MM.DD';
const defaultValue = [dayjs().subtract(1, 'w'), dayjs()] as any;

const StatisticChart: FC<Props> = ({
  chartData: rawChartData,
  title,
  color = ['#46F9EA'],
  barSize = 8,
  showLegend,
  legendLayout = 'horizontal',
  chartConfigMap,
  height = 200,
  showDatePicker = true,
  onDateChange,
}) => {
  // const [chartRef, { run, clear }] = useToolTip();

  // useEffect(() => {
  //   run();
  //   return () => {
  //     clear();
  //   };
  // }, []);

  useEffect(() => {
    if (onDateChange) {
      onDateChange(defaultValue, [dateFormat, dateFormat]);
    }
  }, [onDateChange]);

  let chartData = rawChartData;
  if (isEmpty(chartData)) {
    chartData = [{ value: 0, date: '', field: '' }];
  }

  return (
    <div className={styles.chartWrapper}>
      {showDatePicker && (
        <div className={styles.topBar}>
          <h3 className={styles.chartTitle} title={title}>
            {title}
          </h3>
          <DatePicker.RangePicker
            defaultValue={defaultValue}
            format={dateFormat}
            popupClassName={styles.rangePickerPanel}
            size={'small'}
            onChange={onDateChange}
            className={styles.rangePicker}
          />
        </div>
      )}
      {/* <div className={styles.axisTitle}>单位(kW·h)</div> */}
      <Chart height={height} data={chartData} autoFit>
        <Interval
          size={barSize}
          adjust={[
            {
              type: 'dodge',
              marginRatio: 0,
            },
          ]}
          color={['field', color]}
          position="date*value"
        />
        <Tooltip shared />
        <Interaction type="active-region" />
        <Axis
          name="value"
          label={{
            style: {
              fill: '#6C8097',
              fontSize: 12,
              fontWeight: 400,
            },
          }}
          title={{
            text: formatMessage({ id: 'common.unit', defaultMessage: '单位' }) + '(kW·h)',
            position: 'end',
            autoRotate: false,
            offset: 0,
            style: {
              fill: '#ACCCEC ',
              rotate: 90,
              y: 65,
              x: 40,
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
        <Tooltip
          domStyles={{
            'g2-tooltip': {
              border: '1px solid rgba(21, 154, 255, 0.8)',
              backgroundColor: 'rgba(9,12,21,0.8)',
              'box-shadow': '0 0 6px 0 rgba(21,154,255,0.7)',
              boxShadow: 'none',
              color: 'white',
              opacity: 1,
            },
          }}
        />
        <Legend
          flipPage={false}
          position="top-right"
          layout={legendLayout}
          itemName={{
            spacing: 5,
            style: {
              fill: '#6C8097',
            },
          }}
          visible={!!showLegend}
          offsetX={0}
          offsetY={0}
          itemSpacing={5}
        />
      </Chart>
    </div>
  );
};

export default StatisticChart;
