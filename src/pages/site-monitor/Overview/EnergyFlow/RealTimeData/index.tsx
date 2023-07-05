import { useToggle } from 'ahooks';
import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';
import styles from './index.less';

const RealTimeData: React.FC = () => {
  const [show, { toggle }] = useToggle(true);

  const columns = [
    {
      label: '当日总收益',
      unit: '(元)',
      value: 2454.83,
    },
    {
      label: '当日光伏收益',
      unit: '(元)',
      value: 1644.43,
    },
    {
      label: '当日储能收益',
      unit: '(元)',
      value: 811.67,
    },
  ];

  const toggleButton = show ? (
    <Button type="link" onChange={toggle} size={'small'}>
      显示实时信息
    </Button>
  ) : (
    <Button type="link" onChange={toggle} size={'small'}>
      隐藏
    </Button>
  );

  return (
    <div className={styles.realTimeData}>
      {toggleButton}
      <div className={classNames(styles.realContent)}>
        {columns.map((row) => {
          return (
            <div key={row.label} className={styles.descItem}>
              <p className={styles.realTitle}>
                <span className={styles.indexLabel}>{row.label}</span>
                <span className={styles.indexUnit}>{row.unit}</span>
              </p>
              <p className={styles.realValue}>
                <span>{row.value}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RealTimeData;
