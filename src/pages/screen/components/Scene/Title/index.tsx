import type { FC } from 'react';
import styles from './index.less';
import Cell from '../../LayoutCell';

const Title: FC = () => {
  return (
    <Cell width={289} height={36} left={815.5} top={12}>
      <span className={styles.title}>永泰光储充示范站</span>
    </Cell>
  );
};

export default Title;
