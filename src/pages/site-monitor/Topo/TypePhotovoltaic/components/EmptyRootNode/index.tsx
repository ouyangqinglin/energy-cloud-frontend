import type { CSSProperties } from 'react';
import { Handle, Position } from 'reactflow';
import styles from './index.less';
const EmptyRootNode = () => {
  return (
    <>
      <div className={styles.emptyBox}></div>
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
