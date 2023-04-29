import { FC, useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import styles from './index.less';

export type TimeButtonGroupProps = {
  requestData?: () => void;
};

export const enum TimeType {
  DAY,
  MONTH,
  YEAR,
  TOTAL,
}

const TimeButtonGroup: FC<TimeButtonGroupProps> = ({ requestData }) => {
  const [size, setSize] = useState<TimeType>(TimeType.DAY);
  const handleClick = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  return (
    <Radio.Group
      className={styles.buttonGroupWrapper}
      size="small"
      value={size}
      onChange={handleClick}
    >
      <Radio.Button value={TimeType.DAY}>日</Radio.Button>
      <Radio.Button value={TimeType.MONTH}>月</Radio.Button>
      <Radio.Button value={TimeType.YEAR}>年</Radio.Button>
      <Radio.Button value={TimeType.TOTAL}>总</Radio.Button>
    </Radio.Group>
  );
};
export default TimeButtonGroup;
