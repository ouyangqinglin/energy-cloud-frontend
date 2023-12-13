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
import { keepAnyDecimal } from '@/utils/math';
import { formatMessage } from '@/utils';
type Props = {
  charge?: number;
  discharge?: number;
  capacity?: number;
};
const ChartProcess: FC<Props> = ({ charge = 0, discharge = 0, capacity = 0 }) => {
  const chargePercent = keepAnyDecimal(
    (capacity ? charge / capacity : charge / (charge + discharge)) * 100,
  );
  const dischargePercent = keepAnyDecimal(
    (capacity ? discharge / capacity : discharge / (charge + discharge)) * 100,
  );
  const data = [
    {
      type: formatMessage({ id: 'screen.batteryStatus', defaultMessage: '电池状态' }),
      field: formatMessage({ id: 'screen.rechargeableCapacity', defaultMessage: '可充电量' }),
      value: charge ?? 0,
      unit: 'kWh',
      color: '#01CFA1',
    },
    {
      type: formatMessage({ id: 'screen.batteryStatus', defaultMessage: '电池状态' }),
      field: formatMessage({ id: 'screen.dischargeCapacity', defaultMessage: '可放电量' }),
      value: discharge ?? 0,
      unit: 'kWh',
      color: '#FFE04D',
    },
  ];

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.bar}>
        <div className={styles.charging} style={{ width: `${chargePercent}%` }} />
        <div className={styles.discharging} style={{ width: `${dischargePercent}%` }} />
      </div>
      <div className={styles.legend}>
        {data.map((item) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div className={styles.content} key={item.field}>
              <div className={styles.mark} style={{ backgroundColor: item.color }} />
              <div className={styles.desc}>
                <div className={styles.title}>{item.field}</div>
                <span className={styles.unit} style={{ color: item.color }}>
                  {item.value + item.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartProcess;
