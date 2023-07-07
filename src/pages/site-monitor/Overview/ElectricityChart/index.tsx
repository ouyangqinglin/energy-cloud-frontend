import { useToggle } from 'ahooks';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import RowBox from '../components/RowBox';
import TimeButtonGroup, { TimeType } from '../components/TimeButtonGroup';
import RealTimePower from './Chart';
import styles from './index.less';

const ElectricityChart = ({ siteId }: { siteId?: number }) => {
  const [picker, setPicker] = useState<
    'year' | 'month' | 'time' | 'date' | 'week' | 'quarter' | undefined
  >();
  const [showDatePicker, { set }] = useToggle(true);
  const [date, setDate] = useState(moment());

  const onChange = (value) => {
    setDate(value);
  };
  const timeTypeChange = (type: TimeType) => {
    switch (type) {
      case TimeType.DAY:
        setPicker('date');
        set(true);
        break;
      case TimeType.MONTH:
        setPicker('month');
        set(true);
        break;
      case TimeType.YEAR:
        setPicker('year');
        set(true);
        break;
      case TimeType.TOTAL:
        set(false);
        break;

      default:
        break;
    }
  };
  return (
    <RowBox span={18} className={styles.chartWrapper}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>站点实时功率</h1>
        <div>
          {showDatePicker && <DatePicker defaultValue={date} onChange={onChange} picker={picker} />}
          <TimeButtonGroup
            style={{
              marginLeft: 20,
            }}
            onChange={timeTypeChange}
          />
        </div>
      </div>
      <RealTimePower date={date} siteId={siteId} />
    </RowBox>
  );
};

export default ElectricityChart;
