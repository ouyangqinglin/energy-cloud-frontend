import QueueAnim from 'rc-queue-anim';
import type { CSSProperties, ReactNode, RefObject } from 'react';
import React from 'react';

export interface CellProps extends Pick<CSSProperties, 'zIndex' | 'cursor'> {
  width: number;
  height?: number;
  style?: CSSProperties;
  left: number;
  top: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseOut?: () => void;
  children?: ReactNode;
}

const Cell = React.forwardRef<HTMLDivElement, CellProps>(
  (
    {
      width,
      height,
      left,
      top,
      zIndex = 'auto',
      cursor = 'pointer',
      style = {},
      onClick,
      onMouseEnter,
      onMouseOut,
      children,
    },
    ref = null,
  ) => {
    const cellStyle = {
      width: width,
      height: height,
      left: left,
      top: top,
      zIndex: zIndex,
      cursor: cursor,
      position: 'absolute' as 'absolute',
      ...style,
    };

    return (
      <QueueAnim type={['top', 'bottom']} duration={1500} ease="easeInOutQuart">
        <div
          key="animation"
          ref={ref}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseOut={onMouseOut}
          style={cellStyle}
        >
          {children}
        </div>
      </QueueAnim>
    );
  },
);
export default Cell;
