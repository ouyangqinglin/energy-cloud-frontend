/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-03 14:55:18
 * @LastEditTime: 2023-12-04 18:29:00
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\Stastistics\Right.tsx
 */
import React, { useCallback, useMemo, useState } from 'react';
import { vehicleItems } from './helper';
import styles from '../index.less';
import { useInterval } from 'ahooks';

export type RightStatisticsType = {
  data?: Record<string, any>;
  className?: string;
  onChange?: (key: PieTypeEnum) => void;
};

export enum PieTypeEnum {
  Vehicle,
  Site,
  Battery,
}

const RightStatistics: React.FC<RightStatisticsType> = (props) => {
  const { data, className, onChange } = props;

  const [activeKey, setActiveKey] = useState<PieTypeEnum>(0);

  const onClick = useCallback(
    (index) => {
      setActiveKey(index);
      onChange?.(index);
    },
    [onChange],
  );

  useInterval(() => {
    let nextKey = activeKey + 1;
    if (nextKey > 2) {
      nextKey = 0;
    }
    onClick(nextKey);
  }, 5000);

  const items = useMemo(() => {
    return vehicleItems.map((item, index) => {
      return (
        <>
          {index ? <div className={styles.separate}></div> : <></>}
          <div
            className={`cursor ${activeKey == index ? styles.active : ''}`}
            key={item.field}
            onClick={() => onClick(index)}
          >
            <div className={styles.title}>{item.label}</div>
            <span className={styles.num}>{data?.[item.field]}</span>
          </div>
        </>
      );
    });
  }, [data, activeKey, onClick]);

  return (
    <>
      <div className={`p24 ${styles.card} flex flex-between card-wrap shadow ${className}`}>
        {items}
      </div>
    </>
  );
};

export default RightStatistics;
