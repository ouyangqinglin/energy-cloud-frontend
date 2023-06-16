import type { CombineDeviceRes } from '../type';
import styles from './index.less';
import type { DeviceConfigItem } from './type';
const DeviceCardItem = ({
  title,
  unit,
  render,
  data,
  field = '',
  defaultValue,
}: DeviceConfigItem & { data: CombineDeviceRes }) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>{title}</div>
      <div className={styles.digital}>
        {render ? (
          render(data)
        ) : (
          <>
            <span className={styles.value}>{data[field] ?? defaultValue}</span>
            <span className={styles.unit}>{unit}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default DeviceCardItem;
