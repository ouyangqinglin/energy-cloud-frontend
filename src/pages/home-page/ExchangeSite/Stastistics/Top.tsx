/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-03 14:33:29
 * @LastEditTime: 2023-12-03 15:15:10
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\Stastistics\Top.tsx
 */
import React, { useMemo } from 'react';
import { totalItems } from './helper';
import styles from '../index.less';
import { Col, Row } from 'antd';

export type TopStatisticsType = {
  data?: Record<string, any>;
};

const TopStatistics: React.FC<TopStatisticsType> = (props) => {
  const { data } = props;

  const items = useMemo(() => {
    return totalItems.map((item) => {
      return (
        <Col span={6}>
          <div key={item.field} className={`${styles.card} flex card-wrap shadow`}>
            <img src={item.icon} />
            <div>
              <div className={styles.title}>{item.label}</div>
              <span className={styles.num}>{data?.[item.field]}</span>
            </div>
          </div>
        </Col>
      );
    });
  }, [data]);

  return (
    <>
      <Row gutter={20}>{items}</Row>
    </>
  );
};

export default TopStatistics;
