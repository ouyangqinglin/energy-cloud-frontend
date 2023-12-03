/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-03 14:55:18
 * @LastEditTime: 2023-12-03 15:18:57
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\Stastistics\Right.tsx
 */
import React, { useMemo } from 'react';
import { vehicleItems } from './helper';
import styles from '../index.less';

export type RightStatisticsType = {
  data?: Record<string, any>;
  className?: string;
};

const RightStatistics: React.FC<RightStatisticsType> = (props) => {
  const { data, className } = props;

  const items = useMemo(() => {
    return vehicleItems.map((item, index) => {
      return (
        <>
          {index ? <div className={styles.separate}></div> : <></>}
          <div key={item.field}>
            <div className={styles.title}>{item.label}</div>
            <span className={styles.num}>{data?.[item.field]}</span>
          </div>
        </>
      );
    });
  }, [data]);

  return (
    <>
      <div className={`p24 ${styles.card} flex flex-between card-wrap shadow ${className}`}>
        {items}
      </div>
    </>
  );
};

export default RightStatistics;
