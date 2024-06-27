import type { Moment } from 'moment';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.less';
import { DatePicker } from 'antd';
import type { RangePickerSharedProps } from 'rc-picker/lib/RangePicker';
import { isEmpty } from 'lodash';
import { defaultOptions, getDatesInRange } from './config';
import TypeChart from '@/components/Chart/TypeChart';
import type { TypeChartDataType } from '@/components/Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';

type Props = {
  chartData: TypeChartDataType[];
  showDatePicker?: boolean;
  title?: string;
  height?: number;
  series: any[];
  date?: Moment;
  type?: chartTypeEnum;
  onDateChange?: RangePickerSharedProps<Moment>['onChange'];
};

const dateFormat = 'YYYY.MM.DD';
const defaultValue = [dayjs().subtract(1, 'w'), dayjs()];
const StatisticChart: FC<Props> = ({
  chartData: rawChartData,
  title,
  height = 200,
  showDatePicker = true,
  onDateChange,
  series = [],
  type = chartTypeEnum.Label,
}) => {
  const [options, setOptions] = useState(defaultOptions());
  const [allLabel, setAllLabel] = useState<string[]>([]);
  const [chartData, setChartData] = useState<TypeChartDataType[]>([]);
  const [dateValue, setDateValue] = useState<Dayjs[]>(defaultValue);

  const onChange: RangePickerSharedProps<Moment>['onChange'] = useCallback(
    (dates) => {
      setDateValue(dates);
      if (onDateChange) {
        onDateChange(dates, [dateFormat, dateFormat]);
      }
    },
    [onDateChange],
  );
  useEffect(() => {
    if (onDateChange) {
      onDateChange(defaultValue as any, [dateFormat, dateFormat]);
    }
  }, [onDateChange]);

  useEffect(() => {
    setOptions(defaultOptions(series));
  }, [series]);

  useEffect(() => {
    if (isEmpty(rawChartData)) {
      setChartData([{ data: [], name: '' }]);
    } else {
      let lable: string[] = [];
      rawChartData[0].data?.forEach((i) => {
        lable.push(i.label);
      });
      if (!lable.length) {
        const [startTime, endTime] = dateValue;
        lable = getDatesInRange(startTime, endTime);
      }
      setAllLabel(lable);
      setChartData(rawChartData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawChartData]);

  return (
    <div className={styles.chartWrapper}>
      {showDatePicker && (
        <div className={styles.topBar}>
          <h3 className={styles.chartTitle} title={title}>
            {title}
          </h3>
          <DatePicker.RangePicker
            defaultValue={defaultValue as any}
            format={dateFormat}
            popupClassName={styles.rangePickerPanel}
            size={'small'}
            onChange={onChange}
            className={styles.rangePicker}
          />
        </div>
      )}
      <TypeChart
        height={height}
        option={options}
        data={chartData}
        type={type}
        allLabel={allLabel}
      />
    </div>
  );
};

export default StatisticChart;
