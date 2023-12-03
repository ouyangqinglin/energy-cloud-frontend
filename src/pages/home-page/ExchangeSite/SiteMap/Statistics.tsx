/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-02 15:31:02
 * @LastEditTime: 2023-12-02 17:24:50
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\SiteMap\index.tsx
 */
import React from 'react';
import Detail from '@/components/Detail';
import { statisticsItems } from './helper';
import styles from '../index.less';

export type StatisticType = {
  data?: Record<string, any>;
};

const Statistics: React.FC<StatisticType> = (props) => {
  const { data } = props;

  return (
    <>
      <Detail className={styles.statistics} items={statisticsItems} data={data} column={1} />
    </>
  );
};

export default Statistics;
