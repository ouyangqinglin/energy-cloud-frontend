import type { DetailItem } from '@/components/Detail';
import Detail from '@/components/Detail';
import { uniqueId } from 'lodash';
import type { FC, ReactNode } from 'react';
import { useRequest } from 'umi';
import Decoration from '../../Decoration';
import Cell from '../../LayoutCell';
import DigitalFlipperItem, { DigitalFlipperItemProps } from '../Item';
import styles from './index.less';

export type DigitalFlipperProps = {
  config: DigitalFlipperItemProps[];
};

const DigitalFlipperGroup: FC<DigitalFlipperProps> = ({ config }) => {
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
    <div className={styles.content}>
      <ItemList />
    </div>
  );
};
export default DigitalFlipperGroup;
