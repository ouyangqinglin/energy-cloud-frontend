import TimeButtonGroup, { TimeType } from '@/components/TimeButtonGroup';
import { useToggle } from 'ahooks';
import { DatePicker } from 'antd';
import moment from 'moment';
import { ReactNode } from 'react';
import { useState } from 'react';
import { SubSystemType } from '../..';
import styles from './index.less';
import RenderTitle from './RenderTitle';
import { useFetchChartData } from './useFetchChartData';

const ChartBox = ({ Chart, type: subSystemType }: { Chart: ReactNode; type: SubSystemType }) => {
  const [picker, setPicker] = useState<
    'year' | 'month' | 'time' | 'date' | 'week' | 'quarter' | undefined
  >();
  const [timeType, setTimeType] = useState<TimeType>(TimeType.DAY);
  const [showDatePicker, { set }] = useToggle(true);
  const [date, setDate] = useState(moment());
  const resetDate = () => setDate(moment());

  const { chartData } = useFetchChartData(date, subSystemType, timeType);

  const onChange = (value) => {
    setDate(value);
  };

  const timeTypeChange = (type: TimeType) => {
    setTimeType(type);
    resetDate();
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
    }
  };

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.topBar}>
        <div className={styles.timeForm}>
          {showDatePicker && (
            <DatePicker defaultValue={date} value={date} onChange={onChange} picker={picker} />
          )}
          <TimeButtonGroup
            style={{
              marginLeft: 20,
            }}
            onChange={timeTypeChange}
          />
        </div>
        <RenderTitle timeType={timeType} chartData={chartData} subSystemType={subSystemType} />
      </div>
      <Chart chartData={chartData} timeType={timeType} />
    </div>
  );
};

export default ChartBox;
