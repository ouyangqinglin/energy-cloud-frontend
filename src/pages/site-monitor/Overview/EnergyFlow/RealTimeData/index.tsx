import { useToggle } from 'ahooks';
import { Button, Col, Radio, Row, Statistic } from 'antd';
import classNames from 'classnames';
import React from 'react';
import TimeButtonGroup from '../../components/TimeButtonGroup';
import styles from './index.less';

const RealTimeData: React.FC = () => {
  const [show, { toggle }] = useToggle(true);

  const columns = [
    {
      label: '总收益',
      unit: '(元)',
      value: 2454.83,
    },
    {
      label: '光伏收益',
      unit: '(元)',
      value: 1644.43,
    },
    {
      label: '储能收益',
      unit: '(元)',
      value: 811.67,
    },
    {
      label: '充电桩收益',
      unit: '(元)',
      value: 811.67,
    },
  ];

  const toggleButton = show ? (
    <Button type="link" onClick={toggle} size={'small'}>
      隐藏
    </Button>
  ) : (
    <Button type="link" onClick={toggle} size={'small'}>
      显示实时信息
    </Button>
  );

  return (
    <div className={styles.realTimeData}>
      <div className={styles.realBtn}>{toggleButton}</div>
      {show && (
        <div className={classNames(styles.realContent)}>
          <TimeButtonGroup className={styles.timeBtn} onChange={() => {}} />
          <Row gutter={[16, 16]}>
            {columns.map((row) => {
              return (
                <Col key={row.label} span={12}>
                  <Statistic
                    className={styles.boxContent}
                    title={
                      <span
                        style={{
                          color: '#606266',
                          fontSize: 14,
                          fontWeight: 400,
                        }}
                      >
                        {row.label + row.unit}
                      </span>
                    }
                    value={row.value}
                    valueStyle={{
                      fontWeight: 600,
                      color: '#1D2129',
                      fontSize: 20,
                    }}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </div>
  );
};

export default RealTimeData;
