import type { FC, CSSProperties } from 'react';
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { formatMessage } from '@/utils';

export const enum TimeType {
  DAY,
  MONTH,
  YEAR,
  TOTAL,
}

export const enum SubTypeEnum {
  Power,
  Electricity,
}
export type TimeButtonGroupProps = {
  onChange?: (type: TimeType) => void;
  className?: string;
  style?: CSSProperties;
};

const TimeButtonGroup: FC<TimeButtonGroupProps> = ({ onChange, className, style }) => {
  const [size, setSize] = useState<TimeType>(TimeType.DAY);
  const handleClick = (e: RadioChangeEvent) => {
    setSize(e.target.value);
    onChange?.(e.target.value as TimeType);
  };

  return (
    <Radio.Group
      size="middle"
      className={className}
      style={style}
      value={size}
      onChange={handleClick}
      buttonStyle="solid"
    >
      <Radio.Button value={TimeType.DAY}>
        {formatMessage({ id: 'common.time.day', defaultMessage: '日' })}
      </Radio.Button>
      <Radio.Button value={TimeType.MONTH}>
        {formatMessage({ id: 'common.time.month', defaultMessage: '月' })}
      </Radio.Button>
      <Radio.Button value={TimeType.YEAR}>
        {formatMessage({ id: 'common.time.year', defaultMessage: '年' })}
      </Radio.Button>
      <Radio.Button value={TimeType.TOTAL}>
        {formatMessage({ id: 'common.time.total', defaultMessage: '累计' })}
      </Radio.Button>
    </Radio.Group>
  );
};
export default TimeButtonGroup;
