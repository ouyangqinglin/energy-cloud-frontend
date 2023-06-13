import { Axis, Chart, Legend, Tooltip, Interval, Coordinate, StackedBarChart } from 'bizcharts';
import { isEmpty, isNumber, sortBy } from 'lodash';
import moment from 'moment';
import type { FC } from 'react';
import type { ChartDataMap, ChartRes } from './type';
import styles from './index.less';
import { DatePicker } from 'antd';
import classnames from 'classnames';
import DataSet from '@antv/data-set';
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
const ChartProcess: FC<Props> = () => {
  const data = [
    {
      地区: '容量',
      细分: '损耗容量',
      销售额: 10,
    },
    {
      地区: '容量',
      细分: '可冲电量',
      销售额: 20,
    },
    {
      地区: '容量',
      细分: '可放电量',
      销售额: 70,
    },
  ];
  return (
    <div className={styles.chartWrapper}>
      <StackedBarChart
        height={60}
        xAxis={{
          visible: false,
          grid: {
            visible: false,
          },
          line: {
            visible: false,
          },
        }}
        yAxis={{
          visible: false,
          grid: {
            visible: false,
          },
          line: {
            visible: false,
          },
        }}
        data={data}
        autoFit
        legend={{ offsetX: 10 }}
        yField="地区"
        xField="销售额"
        stackField="细分"
      />
    </div>
  );
};

export default ChartProcess;
