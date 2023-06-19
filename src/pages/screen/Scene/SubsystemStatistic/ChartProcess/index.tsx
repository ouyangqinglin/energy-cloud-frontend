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
  charge?: number;
  discharge?: number;
  capacity?: number;
};
const ChartProcess: FC<Props> = ({ charge = 0, discharge = 0, capacity = 0 }) => {
  const loss = capacity - charge - discharge;
  const data = [
    {
      type: '电池状态',
      field: '损耗容量',
      value: isNaN(loss) ? 0 : loss,
    },
    {
      type: '电池状态',
      field: '可冲电量',
      value: charge ?? 0,
    },
    {
      type: '电池状态',
      field: '可放电量',
      value: discharge ?? 0,
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
              return '可放电量' + discharge + 'kwh';
              // (
              //   <div>
              //     可放电量<span style={{ color: '#01CFA1' }}>{dataItem?.value + 'kwh'}</span>
              //   </div>
              // );
            }
            if (field === '可冲电量') {
              return '可冲电量' + charge + 'kwh';
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
