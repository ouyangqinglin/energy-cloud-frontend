import { Col, Row } from 'antd';
import classnames from 'classnames';
import { get, isFunction } from 'lodash';
import RowBox from '../RowBox';
import styles from './index.less';
import type { DescriptionCardConfig } from './type';

const DescriptionCard = ({
  config,
  data,
  span,
}: {
  config: DescriptionCardConfig;
  data: Record<string, any>;
  span: number;
}) => {
  const isLongItem = config.statistics.length > 3;
  const isLongSpan = span >= 8;
  // existChargingPile 为false不应该显示充电桩
  const shouldShowCharge = (label: string) =>
    label.includes('充电桩') && !get(data, 'existChargingPile');
  const cardItemList = config.statistics.map(({ label, labelUnit, value, valueUnit, field }) => {
    if (shouldShowCharge(label)) {
      return <></>;
    }
    return (
      <div key={label} className={styles['card-item']}>
        <div className={styles['card-left']}>
          <span className={styles['card-kpi-label']}>{label}</span>
          {/* <span className={styles['card-kpi-unit']}>{labelUnit}</span> */}
        </div>
        <div className={styles['card-right']}>
          <span className={styles['card-kpi-value']}>
            {(field ? data?.[field] : isFunction(value) ? value(data) : value) ?? '--'}
          </span>
          {valueUnit && <span className={styles['card-kpi-unit']}>{valueUnit}</span>}
        </div>
      </div>
    );
  });

  const Icon = config.icon;
  return (
    <RowBox span={span}>
      <Row className={styles['kpi-box']}>
        <Col span={4} className={styles.boxLeft}>
          <Icon className={classnames(styles['svg-icon'], styles['icon'])} />
          <p className={styles['left-title']}>{config.title}</p>
        </Col>
        <Col
          span={20}
          className={`${styles.content} ${
            isLongSpan ? styles['short-content'] : isLongItem ? styles['long-content'] : ''
          }`}
        >
          {cardItemList}
        </Col>
      </Row>
    </RowBox>
  );
};

export default DescriptionCard;
