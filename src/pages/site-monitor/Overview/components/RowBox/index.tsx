import { Card } from 'antd';
import classnames from 'classnames';
import { ReactNode } from 'react';
import styles from './index.less';

const RowBox = ({ className, children }: { className?: string; children: ReactNode }) => {
  return <Card className={classnames(styles['grow-card'], className)}>{children}</Card>;
};

export default RowBox;
