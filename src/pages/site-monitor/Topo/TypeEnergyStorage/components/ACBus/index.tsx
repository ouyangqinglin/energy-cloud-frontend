import type { CSSProperties } from 'react';
import { Handle, Position } from 'reactflow';
import BoxText from '../../../components/BoxText';
import styles from './index.less';
const ACBus = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.line} />
        <BoxText label={'交流母线'} />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{
          visibility: 'hidden',
        }}
      />
    </>
  );
};

export default ACBus;
