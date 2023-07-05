import type { ReactNode } from 'react';
import styles from './index.less';
const CardDecoration = ({ children }: { children: ReactNode }) => {
  return <div className={styles.rowBox}>{children}</div>;
};

export default CardDecoration;
