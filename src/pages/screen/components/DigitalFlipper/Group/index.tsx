import classnames from 'classnames';
import { uniqueId } from 'lodash';
import QueueAnim from 'rc-queue-anim';
import type { FC, ReactNode } from 'react';
import type { DigitalFlipperItemProps } from '../Item';
import DigitalFlipperItem from '../Item';
import styles from './index.less';

export type DigitalFlipperProps = {
  config: DigitalFlipperItemProps[];
  className?: string;
};

const DigitalFlipperGroup: FC<DigitalFlipperProps> = ({ config, className }) => {
  function ItemList() {
    const nodes: ReactNode[] = [];
    config.forEach((ceil, index) => {
      const isLastCeil = index === config.length - 1;
      nodes.push(<DigitalFlipperItem key={ceil.title} {...ceil} />);
      if (!isLastCeil) {
        nodes.push(<div key={uniqueId()} className={styles.divider} />);
      }
    });
    return <>{nodes}</>;
  }
  return (
    <QueueAnim
      className={styles.content}
      type={['top', 'bottom']}
      duration={1500}
      delay={500}
      ease="easeInOutQuart"
    >
      <div key="animation" className={classnames([styles.content, className])}>
        <ItemList />
      </div>
    </QueueAnim>
  );
};
export default DigitalFlipperGroup;
