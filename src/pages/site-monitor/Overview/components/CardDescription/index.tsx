import { Card } from 'antd';
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
    <RowBox>
      <div className={styles['kpi-box']}>
        <div>
          <Icon className={classnames(styles['svg-icon'], styles['icon'])} />
          <p className={styles['left-title']}>{config.title}</p>
        </div>
        <div className={styles.content}>{cardItemList}</div>
      </div>
    </RowBox>
  );
};

export default DescriptionCard;
