import type { FC } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import decoration from './lottie/decoration.json';
import play from './lottie/play.json';
import { Lottie } from '@/components/Lottie';
import { CodeSandboxOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import TimeButtonGroup from '../TimeButtonGroup';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { RangePickerProps } from 'antd/lib/date-picker';

export type DecorationValueType = 'pagination' | 'timeButtonGroup' | 'datePicker';
export type DecorationProp = {
  title: string;
  valueType?: DecorationValueType;
  disableDecoration?: boolean;
};

const Decoration: FC<DecorationProp> = ({ title, valueType = 'datePicker', children }) => {
  const getOperation = () => {
    if (valueType === 'pagination') {
      return (
        <Pagination
          size="small"
          className={styles.pagination}
          defaultCurrent={1}
          total={2}
          defaultPageSize={1}
        />
      );
    }

    if (valueType === 'timeButtonGroup') {
      return <TimeButtonGroup />;
    }

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
      return current && current > dayjs().endOf('day');
    };
    if (valueType === 'datePicker') {
      return (
        <div className={styles.datePicker}>
          <DatePicker popupClassName={styles.datePicker} disabledDate={disabledDate} size="small" />
        </div>
      );
    }
  };

  return (
    <div className={classnames([styles.wrapper, styles.wrapperRect])}>
      <div className={classnames(styles.boxHeader)}>
        <div className={styles.leftContent}>
          <CodeSandboxOutlined className={styles.icon} />
          {/* <Lottie width={24} height={24} animationData={play} /> */}
          <span className={styles.text}>{title}</span>
        </div>
        <div className={styles.rightContent}>{getOperation()}</div>
      </div>
      <div className={styles.boxContent}>{children}</div>
    </div>
  );
};

export default Decoration;
