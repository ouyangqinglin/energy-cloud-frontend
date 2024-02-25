import QueueAnim from 'rc-queue-anim';
import type { CSSProperties, MouseEventHandler, ReactNode, RefObject } from 'react';
import React from 'react';

export interface CellProps extends Pick<CSSProperties, 'zIndex' | 'cursor'> {
  width: number | string;
  height?: number;
  style?: CSSProperties;
  left?: number;
  top?: number;
  className?: string;
  bottom?: number;
  right?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseOut?: () => void;
  onContextMenu?: MouseEventHandler<HTMLDivElement> | undefined;
  children?: ReactNode;
}

const Cell = React.forwardRef<HTMLDivElement, CellProps>(
  (
    {
      width,
      height,
      left,
      bottom,
      right,
      top,
      zIndex = 'auto',
      cursor = 'pointer',
      style = {},
      onClick,
      onMouseEnter,
      onMouseOut,
      onContextMenu,
      children,
      className,
    },
    ref,
  ) => {
    const cellStyle = {
      width: width,
      height: height,
      left: left,
      top: top,
      bottom,
      right,
      zIndex: zIndex,
      cursor: cursor,
      position: 'absolute' as 'absolute',
      ...style,
    };

    return (
      <div
        key="animation"
        ref={ref}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseOut={onMouseOut}
        onContextMenu={onContextMenu}
        style={cellStyle}
        className={className}
      >
        {children}
      </div>
    );
  },
);
export default Cell;
