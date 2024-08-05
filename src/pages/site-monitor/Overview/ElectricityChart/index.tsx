import { useToggle } from 'ahooks';
import { DatePicker } from 'antd';
import moment from 'moment';
import type { Moment } from 'moment';
import { useState } from 'react';
import RowBox from '../components/RowBox';
import TimeButtonGroup, { TimeType, SubTypeEnum } from '../components/TimeButtonGroup';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import RealTimePower from './ChartNew';
import { subTypeMap } from './ChartNew/config';
import styles from './index.less';
import { formatMessage } from '@/utils';

const { RangePicker } = DatePicker;
type RangeValue = [Moment | null, Moment | null] | null;

const ElectricityChart = ({ siteId }: { siteId?: number }) => {
  const [picker, setPicker] = useState<
    'year' | 'month' | 'time' | 'date' | 'week' | 'quarter' | undefined
  >();
  const [timeType, setTimeType] = useState<TimeType>(TimeType.DAY);
  const [subType, setSubType] = useState<SubTypeEnum>(SubTypeEnum.Power);
  const [showDatePicker, { set }] = useToggle(true);
  const [date, setDate] = useState(moment());
  const [rangedate, setRangeDate] = useState<RangeValue>([moment(), moment()]);
  const [dates, setDates] = useState<RangeValue>(null);

  const onChange = (value: any) => {
    setDate(value);
  };

  const onRangePickerChange = (value: any) => {
    setRangeDate(value);
  };

  const disabledDate = (current: Moment) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 6;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 6;
    return !!tooEarly || !!tooLate;
  };
  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const changesubType = ({ target: { value } }: RadioChangeEvent) => {
    setSubType(value);
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
  return (
    <RowBox span={18} className={styles.chartWrapper}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>
          {formatMessage({ id: 'siteMonitor.siteRealtimepower', defaultMessage: '站点运行数据图' })}
        </h1>
        {timeType === TimeType.DAY ? (
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            options={subTypeMap}
            onChange={changesubType}
            value={subType}
          />
        ) : (
          ''
        )}
        <div className={styles.picker}>
          {showDatePicker && subType == 0 && timeType === TimeType.DAY ? (
            <RangePicker
              value={dates || rangedate}
              onChange={onRangePickerChange}
              disabledDate={disabledDate}
              onOpenChange={onOpenChange}
              onCalendarChange={(val) => setDates(val)}
              picker="date"
            />
          ) : (
            <DatePicker defaultValue={date} onChange={onChange} picker={picker} />
          )}
          <TimeButtonGroup
            style={{
              marginLeft: 20,
            }}
            onChange={timeTypeChange}
          />
        </div>
      </div>
      <RealTimePower
        rangedate={rangedate}
        date={date}
        siteId={siteId}
        timeType={timeType}
        subType={subType}
      />
    </RowBox>
  );
};

export default ElectricityChart;
