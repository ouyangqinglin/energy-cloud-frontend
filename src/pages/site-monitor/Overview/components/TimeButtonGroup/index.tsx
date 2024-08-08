import type { FC, CSSProperties } from 'react';
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { formatMessage } from '@/utils';
import { chartTypeEnum } from '@/components/Chart/config';

export const enum SubTypeEnum {
  Power,
  Electricity,
}

export type TimeButtonGroupProps = {
  onChange?: (type: chartTypeEnum) => void;
  className?: string;
  style?: CSSProperties;
};

const TimeButtonGroup: FC<TimeButtonGroupProps> = ({ onChange, className, style }) => {
  const [size, setSize] = useState<chartTypeEnum>(chartTypeEnum.Day);
  const handleClick = (e: RadioChangeEvent) => {
    setSize(e.target.value);
    onChange?.(e.target.value as chartTypeEnum);
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
      <Radio.Button value={chartTypeEnum.Day}>
        {formatMessage({ id: 'common.time.day', defaultMessage: '日' })}
      </Radio.Button>
      <Radio.Button value={chartTypeEnum.Month}>
        {formatMessage({ id: 'common.time.month', defaultMessage: '月' })}
      </Radio.Button>
      <Radio.Button value={chartTypeEnum.Year}>
        {formatMessage({ id: 'common.time.year', defaultMessage: '年' })}
      </Radio.Button>
      <Radio.Button value={chartTypeEnum.Label}>
        {formatMessage({ id: 'common.time.total', defaultMessage: '累计' })}
      </Radio.Button>
    </Radio.Group>
  );
};
export default TimeButtonGroup;
