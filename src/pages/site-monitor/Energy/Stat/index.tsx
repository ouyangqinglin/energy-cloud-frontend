/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-12 10:22:39
 * @LastEditTime: 2023-07-12 13:39:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\Stat\index.tsx
 */
import React, { useState, useMemo } from 'react';
import { useRequest } from 'umi';
import { Row, Col, Card, Badge, Skeleton } from 'antd';
import { getStat } from '../service';
import styles from '../index.less';
import { isEmpty } from '@/utils';

const statOptions = [
  { title: '额定容量（kW/kWh）', field: '', value: 0, extrolValue: 0 },
  { title: '当日充电（kWh）', field: '', value: 0 },
  { title: '当日放电（kWh）', field: '', value: 0 },
  { title: '累计充电（kWh）', field: '', value: 0 },
  { title: '累计放电（kWh）', field: '', value: 0 },
  { title: '当日收益（元）', field: '', value: 0 },
  { title: '累计收益（元）', field: '', value: 0 },
];

export type StatProps = {
  className?: string;
};

const Stat: React.FC<StatProps> = (props) => {
  const { className } = props;

  const {
    loading,
    data: statData,
    run,
  } = useRequest(getStat, {
    manual: true,
  });

  const statItems = useMemo(() => {
    return statOptions.map((item) => {
      return (
        <>
          <Col className={styles.col}>
            <div className={`card-wrap px20 py16 ${styles.card}`}>
              {loading ? (
                <>
                  <Skeleton.Input size="small" active />
                  <Skeleton.Button size="small" active />
                </>
              ) : (
                <>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.num}>
                    <Badge
                      className={styles.badge}
                      count={item.value}
                      showZero
                      overflowCount={999999999}
                    />
                    {!isEmpty(item?.extrolValue) && (
                      <>
                        <Badge className={styles.badge} count="/" showZero />
                        <Badge
                          className={styles.badge}
                          count={item.extrolValue}
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
