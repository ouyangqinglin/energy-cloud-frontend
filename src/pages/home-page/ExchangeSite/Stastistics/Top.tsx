/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-03 14:33:29
 * @LastEditTime: 2023-12-04 18:21:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\ExchangeSite\Stastistics\Top.tsx
 */
import React, { useEffect, useMemo, useState } from 'react';
import { totalItems } from './helper';
import styles from '../index.less';
import { Col, Row } from 'antd';
import { useBoolean, useInterval } from 'ahooks';

export type TopStatisticsType = {
  data?: Record<string, any>;
};

const TopStatistics: React.FC<TopStatisticsType> = (props) => {
  const { data } = props;

  const [realTimeData, setRealTimeData] = useState<Record<string, any>>({});

  useInterval(() => {
    setRealTimeData((prevData) => {
      prevData.exchangeCount = (prevData?.exchangeCount ?? 0) + 1;
      prevData.totalEnergy = (prevData.totalEnergy ?? 0) + 60;
      prevData.totalMile = (prevData.totalMile ?? 0) + 400;
      prevData.reduceCarbon =
        Math.floor(((prevData.reduceCarbon ?? 0) + (60 * 0.997) / 1000) * 100) / 100;
      return { ...prevData };
    });
  }, 1000 * 60 * 5);

  useEffect(() => {
    if (data) {
      setRealTimeData(data || {});
    }
  }, [data]);

  const items = useMemo(() => {
    return totalItems.map((item) => {
      return (
        <Col span={6}>
          <div key={item.field} className={`${styles.card} flex card-wrap shadow`}>
            <img src={item.icon} />
            <div>
              <div className={styles.title}>{item.label}</div>
              <span className={styles.num}>{realTimeData?.[item.field]}</span>
            </div>
          </div>
        </Col>
      );
    });
  }, [realTimeData]);

  return (
    <>
      <Row gutter={20}>{items}</Row>
    </>
  );
};

export default TopStatistics;
