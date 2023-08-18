import { keepTwoDecimalWithUnit } from '@/utils/math';
import classnames from 'classnames';
import type { ExtraNodeData } from '../../../TypeAll/type';
import styles from './index.less';

export function StatisticCardForME({ data }: { data: ExtraNodeData }) {
  const { width = 80, height = 100, textContent } = data;

  return (
    <div
      className={classnames(styles.boxContent)}
      style={{
        width,
        height,
      }}
    >
      {textContent && (
        <div className={styles.boxTextContent}>
          {textContent.column?.map(({ label, value, field }) => {
            return (
              <div key={label} className={styles.boxItem}>
                <div className={styles.label}>{label}</div>
                <span className={styles.value}>{keepTwoDecimalWithUnit(value)}</span>
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.leftTopCorner} />
    </div>
  );
}
