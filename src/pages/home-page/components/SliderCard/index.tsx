import { keepTwoDecimalWithUnit } from '@/utils/math';
import { Col, Row, Tooltip } from 'antd';
import type { AllCardRes, CardInfo } from '../../type';
import styles from './index.less';

const SliderCard = ({ config, data }: { config: CardInfo; data: AllCardRes }) => {
  const Icon = config.icon;
  return (
    <div className={styles.sliderCard} style={{ height: '250px', marginRight: 16 }}>
      <div className={styles.statusItem}>
        <div className={styles.title}>
          <span>{config.title}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.contentIcon}>
            <Icon className={styles.svgIcon} />
          </div>
          <div className={styles.contentItem}>
            <div className={styles.contentNumber}>
              {keepTwoDecimalWithUnit(data?.[config.field])}
            </div>
            <div className={styles.contentDescription}>{config.description}</div>
          </div>
        </div>
        <Row gutter={16} className={styles.detail}>
          {config.items.map(({ label, field, render }) => (
            <Col span={8} key={label} className={styles.detailItem}>
              <Tooltip title={label}>
                <div className={styles.ellipsis}>{label}：</div>
              </Tooltip>
              {render ? render(data) : <span>{keepTwoDecimalWithUnit(data?.[field])}</span>}
            </Col>
          ))}
        </Row>
        {/* <div className={styles.detail}>
          {config.items.map(({ label, field }) => (
            <div key={label} className={styles.detailItem}>
              <div className={styles.ellipsis}>{label}：</div>
              <span>{keepTwoDecimalWithUnit(data?.[field])}</span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default SliderCard;
