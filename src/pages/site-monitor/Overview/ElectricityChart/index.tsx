import { useToggle } from 'ahooks';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import RowBox from '../components/RowBox';
import TimeButtonGroup, { TimeType, SubTypeEnum } from '../components/TimeButtonGroup';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import RealTimePower from './ChartNew';
import { subTypeMap } from './ChartNew/config';
import styles from './index.less';
import { formatMessage } from '@/utils';

const ElectricityChart = ({ siteId }: { siteId?: number }) => {
  const [picker, setPicker] = useState<
    'year' | 'month' | 'time' | 'date' | 'week' | 'quarter' | undefined
  >();
  const [timeType, setTimeType] = useState<TimeType>(TimeType.DAY);
  const [subType, setSubType] = useState<SubTypeEnum>(SubTypeEnum.Power);
  const [showDatePicker, { set }] = useToggle(true);
  const [date, setDate] = useState(moment());

  const onChange = (value: any) => {
    setDate(value);
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
          {timeType === TimeType.DAY
            ? formatMessage({ id: 'siteMonitor.siteRealtimepower', defaultMessage: '站点实时功率' })
            : formatMessage({
                id: 'siteMonitor.siteAccumulatedpower',
                defaultMessage: '站点累计电量',
              })}
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
      <RealTimePower date={date} siteId={siteId} timeType={timeType} subType={subType} />
    </RowBox>
  );
};

export default ElectricityChart;
