import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
// 441 289
const useResize = (target: HTMLElement | Document | Window | null = window) => {
  const [resize, setResize] = useState(1);
  const handleWheel = throttle(
    (event: Event) => {
      event.stopPropagation();
      if (event.wheelDelta < 0 && resize >= 0.2) {
        setResize(resize - 0.1);
      } else if (event.wheelDelta > 0 && resize < 3) {
        setResize(resize + 0.1);
      }
    },
    30,
    { leading: false },
  );

  // const handleScroll = (event: Event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  // };

  useEffect(() => {
    target?.addEventListener?.('mousewheel', handleWheel, false);
    return () => {
      target?.removeEventListener?.('mousewheel', handleWheel, false);
    };
  }, [target, handleWheel]);

  return {
    resize,
  };
};

export default useResize;
