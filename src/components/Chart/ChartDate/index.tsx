/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-04-19 17:09:52
 * @LastEditTime: 2024-04-22 09:18:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Chart\ChartDate\index.tsx
 */

import { DatePicker, DatePickerProps, Select, Spin } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { chartTypeEnum } from '../config';
import { formatMessage } from '@/utils';
import moment, { Moment } from 'moment';

const typeMap = [
  {
    value: chartTypeEnum.Day,
    label: formatMessage({ id: 'common.time.day', defaultMessage: '日' }),
    dateType: 'date',
    format: 'YYYY-MM-DD',
  },
  {
    value: chartTypeEnum.Month,
    label: formatMessage({ id: 'common.time.month', defaultMessage: '月' }),
    dateType: 'month',
    format: 'YYYY-MM',
  },
  {
    value: chartTypeEnum.Year,
    label: formatMessage({ id: 'common.time.year', defaultMessage: '年' }),
    dateType: 'year',
    format: 'YYYY',
  },
  {
    value: chartTypeEnum.Label,
    label: formatMessage({ id: 'common.time.total', defaultMessage: '累计' }),
    dateType: 'year',
    format: 'YYYY',
  },
];

type ChartDateType = {
  defaultType?: chartTypeEnum;
  loading?: boolean;
  onTypeChange?: (value: chartTypeEnum) => void;
  onChange?: (value: Moment | null) => void;
};

const ChartDate: React.FC<ChartDateType> = (props) => {
  const { defaultType = chartTypeEnum.Day, loading, onTypeChange, onChange } = props;

  const [chartType, setChartType] = useState(defaultType);

  const onSelect = (value: chartTypeEnum) => {
    setChartType(value);
    onTypeChange?.(value);
  };

  useEffect(() => {
    onTypeChange?.(defaultType);
    onChange?.(moment());
  }, []);

  return (
    <>
      <Select className="mr8" defaultValue={defaultType} options={typeMap} onSelect={onSelect} />
      {chartType != chartTypeEnum.Label && (
        <DatePicker
          picker={
            typeMap.find((item) => chartType == item.value)?.dateType as DatePickerProps['picker']
          }
          defaultValue={moment()}
          format={typeMap.find((item) => chartType == item.value)?.format}
          onChange={onChange}
          allowClear={false}
        />
      )}
      {loading && <Spin className="ml12" />}
    </>
  );
};

export default memo(ChartDate);
