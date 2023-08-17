import { keepTwoDecimalWithUnit } from '@/utils/math';
import type { CSSProperties } from 'react';
import { Handle, Position } from 'reactflow';
import { ExtraNodeData } from '../../../type';
import styles from './index.less';

const EmptyRootNode = ({ data }: { data: ExtraNodeData }) => {
  const { textContent } = data;
  return (
    <>
      <div className={styles.emptyBox}></div>
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
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{
          visibility: 'hidden',
        }}
      />
    </>
  );
};

export default EmptyRootNode;
