/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-29 19:04:26
 * @LastEditTime: 2023-11-29 19:39:37
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\TimeRangePicker\index.tsx
 */

import React, { useCallback, useMemo } from 'react';
import { TimePicker } from 'antd';
import type { TimeRangePickerProps } from 'antd';
import moment, { Moment } from 'moment';

export type TimeRangePickerType = Omit<TimeRangePickerProps, 'value' | 'onChange' | 'format'> & {
  value?: string;
  onChange?: (value?: string) => void;
  format?: string;
};

const TimeRangePicker: React.FC<TimeRangePickerType> = (props) => {
  const { value, onChange, format = 'HH:mm' } = props;

  const mergedValue = useMemo<any>(() => {
    const result = value?.split('-')?.map?.((item) => moment('2023-01-01 ' + item));
    if (result?.length != 2) {
      return [];
    } else {
      return result;
    }
  }, [value]);

  const mergedOnChange = useCallback((params) => {
    onChange?.(params?.map?.((item: Moment) => item.format(format)).join('-'));
  }, []);

  return (
    <>
      <TimePicker.RangePicker
        value={mergedValue}
        className="w-full"
        order={true}
        format={format}
        onChange={mergedOnChange}
      />
    </>
  );
};

export default TimeRangePicker;
