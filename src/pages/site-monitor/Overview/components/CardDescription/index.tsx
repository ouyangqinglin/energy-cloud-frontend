import { Card, Col, Row } from 'antd';
import classnames from 'classnames';
import RowBox from '../RowBox';
import styles from './index.less';
import type { DescriptionCardConfig } from './type';

const DescriptionCard = ({ config }: { config: DescriptionCardConfig }) => {
  const cardItemList = config.statistics.map(({ label, labelUnit, value, valueUnit }) => {
    return (
      <div key={label} className={styles['card-item']}>
        <div className={styles['card-left']}>
          <span className={styles['card-kpi-label']}>{label}</span>
          <span className={styles['card-kpi-unit']}>{labelUnit}</span>
        </div>
        <div className={styles['card-right']}>
          <span className={styles['card-kpi-value']}>{value}</span>
          {valueUnit && <span className={styles['card-kpi-unit']}>{valueUnit}</span>}
        </div>
      </div>
    );
  });

  const Icon = config.icon;

  return (
    <RowBox span={6}>
      <Row className={styles['kpi-box']}>
        <Col span={4} className={styles.boxLeft}>
          <Icon className={classnames(styles['svg-icon'], styles['icon'])} />
          <p className={styles['left-title']}>{config.title}</p>
        </Col>
        <Col span={20} className={styles.content}>
          {cardItemList}
        </Col>
      </Row>
    </RowBox>
  );
};

export default DescriptionCard;
