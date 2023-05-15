import { useCallback, useEffect, useRef, useState } from 'react';
import { useKeyPress } from 'ahooks';

const useDragging = (target?: HTMLDialogElement, resize: number = 1) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [pressSpace, setPressSpace] = useState(false);

  const predicate = (event: KeyboardEvent) => {
    return event.code === 'Space';
  };

  useKeyPress(
    'space',
    () => {
      setPressSpace(false);
    },
    {
      events: ['keyup'],
    },
  );
  useKeyPress('space', () => {
    if (pressSpace) return;
    setPressSpace(true);
  });

  const offsetCache = useRef({
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0,
    clickDown: false,
    shouldMove: false,
  });

  const onMouseDown = useCallback((event: MouseEvent) => {
    const { current } = offsetCache;
    current.clickDown = true;
    current.x = event.clientX;
    current.y = event.clientY;
  }, []);
  const onMouseUp = useCallback(() => {
    const { current } = offsetCache;
    current.clickDown = false;

    if (current.shouldMove === true) {
      const gapX = Math.floor(current.offsetX / 2);
      const gapY = Math.floor(current.offsetY / 2);
      setOffset({ x: offset.x + gapX, y: offset.y + gapY });
      current.shouldMove = false;
    }
  }, [offset]);
  const dragMove = useCallback((event: MouseEvent) => {
    if (offsetCache.current.clickDown) {
      const { current } = offsetCache;
      current.offsetX = event.clientX - current.x;
      current.offsetY = event.clientY - current.y;
      current.shouldMove = true;
    }
  }, []);
  useEffect(() => {
    if (pressSpace) {
      target?.addEventListener?.('mousedown', onMouseDown);
    } else {
      target?.removeEventListener?.('mousedown', onMouseDown);
    }
    window.addEventListener('mousemove', dragMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', dragMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [pressSpace]);

  return {
    offset,
  };
};

export default useDragging;
