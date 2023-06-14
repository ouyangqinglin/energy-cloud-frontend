import {
  Axis,
  Chart,
  Legend,
  Tooltip,
  Interval,
  Coordinate,
  StackedBarChart,
  ProgressChart,
} from 'bizcharts';
import { find, isEmpty, isNumber, sortBy } from 'lodash';
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
      type: '电池状态',
      field: '损耗容量',
      value: 10,
    },
    {
      type: '电池状态',
      field: '可冲电量',
      value: 20,
    },
    {
      type: '电池状态',
      field: '可放电量',
      value: 70,
    },
  ];
  return (
    <div className={styles.chartWrapper}>
      <StackedBarChart
        autoFit
        height={60}
        width={368}
        padding={[0, 0, 20, 0]}
        color={['#01CFA1', '#FFE04D', '#6F84A1']}
        data={data}
        xAxis={{
          label: null,
          grid: null,
        }}
        yAxis={{ visible: false }}
        legend={{
          offsetX: 10,
          position: 'bottom-left',
          formatter: (field, item) => {
            if (field === '可放电量') {
              const dataItem = find(data, (it) => it.field === '可放电量');
              return '可冲电量' + dataItem?.value + 'kwh';
              // (
              //   <div>
              //     可放电量<span style={{ color: '#01CFA1' }}>{dataItem?.value + 'kwh'}</span>
              //   </div>
              // );
            }
            if (field === '可冲电量') {
              const dataItem = find(data, (it) => it.field === '可冲电量');
              return '可冲电量' + dataItem?.value + 'kwh';
              // (
              //   <div>
              //     可放电量<span style={{ color: '#FFE04D' }}>{dataItem?.value + 'kwh'}</span>
              //   </div>
              // );
            }
            return null;
          },
          itemSpacing: 10,
        }}
        yField="type"
        xField="value"
        stackField="field"
      />
    </div>
  );
};

export default ChartProcess;
