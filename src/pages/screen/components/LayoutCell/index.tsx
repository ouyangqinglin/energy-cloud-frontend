import type { FC } from 'react';

export type CellProps = {
  width: number;
  height: number;
  left: number;
  top: number;
  zIndex?: number;
};
const Cell: FC<CellProps> = (props) => {
  const cellStyle = {
    width: props.width,
    height: props.height,
    left: props.left,
    top: props.top,
    zIndex: props.zIndex ?? 'auto',
    position: 'absolute',
  };
  return <div style={cellStyle}>{props.children}</div>;
};
export default Cell;
