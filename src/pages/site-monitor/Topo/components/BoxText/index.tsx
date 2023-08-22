import type { CSSProperties } from 'react';
import { Handle, Position } from 'reactflow';
import { ExtraNodeData } from '../../type';
import styles from './index.less';

export type BoxTextProp = {
  label?: string;
  width?: number;
  height?: number;
  boxStyle?: CSSProperties;
  labelStyle?: CSSProperties;
};

const BoxText = ({ label, width, height = 42, boxStyle = {}, labelStyle = {} }: BoxTextProp) => {
  return (
    <div
      className={styles.boxWrapper}
      style={{
        ...boxStyle,
        width,
        height,
      }}
    >
      <span className={styles.label} style={labelStyle}>
        {label}
      </span>
    </div>
  );
};

export default BoxText;

export const BoxTextNode = ({ data }: { data: ExtraNodeData }) => {
  return (
    <>
      <BoxText {...(data?.boxText ?? {})} />
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
