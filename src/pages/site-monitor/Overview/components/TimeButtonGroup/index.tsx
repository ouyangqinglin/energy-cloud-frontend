import type { FC, CSSProperties } from 'react';
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

export const enum TimeType {
  DAY,
  MONTH,
  YEAR,
  TOTAL,
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
      <Radio.Button value={TimeType.DAY}>日</Radio.Button>
      <Radio.Button value={TimeType.MONTH}>月</Radio.Button>
      <Radio.Button value={TimeType.YEAR}>年</Radio.Button>
      <Radio.Button value={TimeType.TOTAL}>总</Radio.Button>
    </Radio.Group>
  );
};
export default TimeButtonGroup;
