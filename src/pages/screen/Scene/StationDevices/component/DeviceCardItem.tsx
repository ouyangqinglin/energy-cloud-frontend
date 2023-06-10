import styles from './index.less';
import { DeviceConfigItem } from './type';
const DeviceCardItem = ({ title, value, unit, render }: DeviceConfigItem) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>{title}</div>
      <div className={styles.digital}>
        {render ? (
          render()
        ) : (
          <>
            <span className={styles.value}>{value}</span>
            <span className={styles.unit}>{unit}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default DeviceCardItem;
