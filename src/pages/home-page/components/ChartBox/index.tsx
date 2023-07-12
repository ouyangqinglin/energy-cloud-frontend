import TimeButtonGroup, { TimeType } from '@/components/TimeButtonGroup';
import { useToggle } from 'ahooks';
import { DatePicker } from 'antd';
import moment from 'moment';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { SubSystemType } from '../..';
import styles from './index.less';
const ChartBox = ({ Chart, type: subSystemType }: { Chart: ReactNode; type: SubSystemType }) => {
  const [picker, setPicker] = useState<
    'year' | 'month' | 'time' | 'date' | 'week' | 'quarter' | undefined
  >();
  const [timeType, setTimeType] = useState<TimeType>(TimeType.DAY);
  const [showDatePicker, { set }] = useToggle(true);
  const [date, setDate] = useState(moment());

  const onChange = (value) => {
    setDate(value);
  };
  const timeTypeChange = (type: TimeType) => {
    setTimeType(type);
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

  const renderTitle = () => {
    if (subSystemType === SubSystemType.PV)
      return (
        <div className={styles.title}>
          日发电量/kWh:<span>7694.40</span>
        </div>
      );
    if (subSystemType === SubSystemType.ES)
      return (
        <div className={styles.title}>
          日充电量/kWh: <span>981.30</span>
          日放电量/kWh: <span>597.10</span>
        </div>
      );
    if (subSystemType === SubSystemType.EI)
      return (
        <div className={styles.title}>
          日光伏收益/元: <span>7437.70</span>
          日储能收益/元: <span>559.55</span>
        </div>
      );
  };

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.topBar}>
        <div className={styles.timeForm}>
          {showDatePicker && <DatePicker defaultValue={date} onChange={onChange} picker={picker} />}
          <TimeButtonGroup
            style={{
              marginLeft: 20,
            }}
            onChange={timeTypeChange}
          />
        </div>
        {renderTitle()}
      </div>
      <Chart date={date} timeType={timeType} />
      {/* <RealTimePower date={date} siteId={siteId} timeType={timeType} /> */}
    </div>
  );
};

export default ChartBox;
