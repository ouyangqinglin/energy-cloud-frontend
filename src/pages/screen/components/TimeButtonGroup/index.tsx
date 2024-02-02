import type { FC } from 'react';
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import styles from './index.less';
import { formatMessage } from '@/utils';

export const enum TimeType {
  DAY,
  MONTH,
  YEAR,
  TOTAL,
}
export type TimeButtonGroupProps = {
  onChange?: (type: TimeType) => void;
};

const TimeButtonGroup: FC<TimeButtonGroupProps> = ({ onChange }) => {
  const [size, setSize] = useState<TimeType>(TimeType.DAY);
  const handleClick = (e: RadioChangeEvent) => {
    setSize(e.target.value);
    onChange?.(e.target.value as TimeType);
  };

  return (
    <Radio.Group
      className={styles.buttonGroupWrapper}
      size="small"
      value={size}
      onChange={handleClick}
    >
      <Radio.Button value={TimeType.DAY}>
        {formatMessage({ id: 'screen.Day', defaultMessage: '日' })}
      </Radio.Button>
      <Radio.Button value={TimeType.MONTH}>
        {formatMessage({ id: 'screen.Month', defaultMessage: '月' })}
      </Radio.Button>
      <Radio.Button value={TimeType.YEAR}>
        {formatMessage({ id: 'screen.Year', defaultMessage: '年' })}
      </Radio.Button>
      <Radio.Button value={TimeType.TOTAL}>
        {formatMessage({ id: 'screen.Total', defaultMessage: '累计' })}
      </Radio.Button>
    </Radio.Group>
  );
};
export default TimeButtonGroup;
