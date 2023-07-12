import type { CardInfo } from '../../type';
import styles from './index.less';

const SliderCard = ({ config }: { config: CardInfo }) => {
  const Icon = config.icon;
  return (
    <div className={styles.sliderCard} style={{ height: '250px', marginRight: 16 }}>
      <div className={styles.statusItem}>
        <div className={styles.title}>{config.title}</div>
        <div className={styles.content}>
          <div className={styles.contentIcon}>
            <Icon className={styles.svgIcon} />
          </div>
          <div className={styles.contentItem}>
            <div className={styles.contentNumber}>{config.value}</div>
            <div className={styles.contentDescription}>{config.description}</div>
          </div>
        </div>
        <div className={styles.detail}>
          {config.items.map(({ label, value }) => (
            <div key={label} className={styles.detailItem}>
              <div className={styles.ellipsis}>{label}：</div>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
