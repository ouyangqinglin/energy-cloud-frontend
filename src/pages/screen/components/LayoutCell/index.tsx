import type { FC } from 'react';

export type CellProps = {
  width: number;
  height?: number;
  left: number;
  top: number;
  zIndex?: number;
  cursor?: 'cursor' | 'default';
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseOut?: () => void;
};
const Cell: FC<CellProps> = (props) => {
  const cellStyle = {
    width: props.width,
    height: props.height,
    left: props.left,
    top: props.top,
    zIndex: props.zIndex ?? 'auto',
    position: 'absolute' as 'absolute',
    cursor: props.cursor ?? 'pointer',
  };
  return (
    <div
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseOut={props.onMouseOut}
      style={cellStyle}
    >
      {props.children}
    </div>
  );
};
export default Cell;
