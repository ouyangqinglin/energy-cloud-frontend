import { Card, Col } from 'antd';
import classnames from 'classnames';
import type { ReactNode } from 'react';
import styles from './index.less';

const RowBox = ({
  className,
  span = 6,
  children,
}: {
  className?: string;
  children: ReactNode;
  span: number;
}) => {
  return (
    <Col span={span}>
      <Card className={classnames(styles['grow-card'], className)}>{children}</Card>
    </Col>
  );
};

export default RowBox;
