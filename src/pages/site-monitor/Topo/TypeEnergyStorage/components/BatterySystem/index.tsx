import type { CSSProperties } from 'react';
import { Handle, Position } from 'reactflow';
import BoxText from '../../../components/BoxText';
import type { ExtraNodeData } from '../../../type';
import styles from './index.less';
import { formatMessage } from '@/utils';
const BatterySystem = ({ data }: { data: ExtraNodeData }) => {
  const { width = 80, height = 600 } = data;
  return (
    <>
      <div
        className={styles.wrapper}
        style={{
          width,
          height,
        }}
      >
        <BoxText
          boxStyle={{
            position: 'absolute',
            left: 45,
            top: -16,
            border: '1px solid #00B42A',
            background: '#fff',
          }}
          label={formatMessage({ id: 'siteMonitor.batterySystem', defaultMessage: '电池系统'})}
        />
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{
          visibility: 'hidden',
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{
          visibility: 'hidden',
        }}
      />
    </>
  );
};

export default BatterySystem;
