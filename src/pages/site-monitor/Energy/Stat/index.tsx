/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 10:22:39
 * @LastEditTime: 2023-07-26 16:54:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\Stat\index.tsx
 */
import React, { useState, useMemo, useEffect } from 'react';
import { useRequest } from 'umi';
import {} from 'ahooks';
import { Row, Col, Card, Badge, Skeleton } from 'antd';
import { getStat } from '../service';
import styles from '../index.less';
import { ComProps } from '../type';

const statOptions = [
  { title: '额定容量（kW/kWh）', field: 'ratedOutputPower', extralField: 'ratedCapacity' },
  { title: '当日充电量（kWh）', field: 'todayCharge' },
  { title: '当日放电量（kWh）', field: 'todayDischarge' },
  { title: '累计充电量（kWh）', field: 'totalCharge' },
  { title: '累计放电量（kWh）', field: 'totalDischarge' },
  { title: '当日收益（元）', field: 'todayGains' },
  { title: '累计收益（元）', field: 'totalGains' },
];

const Stat: React.FC<ComProps> = (props) => {
  const { className, siteId } = props;

  const {
    loading,
    data: statData,
    run,
  } = useRequest(getStat, {
    manual: true,
    pollingInterval: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (siteId) {
      run({ siteId });
    }
  }, [siteId]);

  const statItems = useMemo(() => {
    return statOptions.map((item) => {
      return (
        <>
          <Col className={styles.col}>
            <div className={`card-wrap pl20 py16 ${styles.card}`}>
              {loading ? (
                <>
                  <Skeleton.Input size="small" active />
                  <div className="mb4" />
                  <Skeleton.Button size="small" active />
                </>
              ) : (
                <>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.num}>
                    <Badge
                      className={styles.badge}
                      count={statData?.[item.field] ?? '-'}
                      showZero
                      overflowCount={999999999}
                    />
                    {item?.extralField && (
                      <>
                        <Badge className={styles.badge} count="/" showZero />
                        <Badge
                          className={styles.badge}
                          count={statData?.[item.extralField] ?? '-'}
                          showZero
                          overflowCount={999999999}
                        />
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </Col>
        </>
      );
    });
  }, [statData, loading]);

  return (
    <>
      <Row className={className} gutter={20}>
        {statItems}
      </Row>
    </>
  );
};

export default Stat;
