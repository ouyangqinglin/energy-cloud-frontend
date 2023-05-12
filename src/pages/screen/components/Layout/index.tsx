import { throttle } from 'lodash';
import { FC, useCallback, useRef } from 'react';
import { useEffect, useState } from 'react';
import { useKeyPress } from 'react-use';
import styles from './index.less';

export const enum ScaleMode {
  EQUAL = 1,
  H_SCALE,
  W_SCALE,
}
export type LayoutProps = {
  screenW: number;
  screenH: number;
  scaleMode: ScaleMode;
  disabledBackgroundFill?: boolean;
  palette?: {
    backgroundColor?: string;
    backgroundImage?: string;
  };
};
const Layout: FC<LayoutProps> = (props) => {
  const [overflow, setOverflow] = useState('hidden');
  const [transform, setTransform] = useState('scale(1)');
  const refContainer = useRef<HTMLDivElement>(null);
  const [resize, setResize] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const backgroundImage = props.palette?.backgroundImage ?? 'none';
  const backgroundColor = props.palette?.backgroundColor ?? '#111111';

  const dashBoardStyle = {
    overflow: overflow,
    height: 'calc(100vh - 48px)',
    backgroundColor: '#111111',
  };

  const getContentStyle = () => {
    return {
      width: `${props.screenW}px`,
      height: `${props.screenH}px`,
      backgroundImage: `url(${backgroundImage})`,
      backgroundColor: `${backgroundColor}`,
      transform: transform,
      backgroundSize: '100% 100%',
      backgroundPosition: 'left top',
    };
  };

  const [docClientHeight, setDocClientHeight] = useState(0);
  const [docClientWidth, setDocClientWidth] = useState(0);
  const initLayout = () => {
    const containerDom = refContainer?.current;
    if (containerDom) {
      setDocClientHeight(containerDom.clientHeight);
      setDocClientWidth(containerDom.clientWidth);
    }
  };

  const calLayoutByProps = () => {
    // 宽高等比缩放
    if (props.scaleMode === ScaleMode.EQUAL) {
      const scaleH = docClientHeight / props.screenH;
      const scaleW = docClientWidth / props.screenW;
      setTransform(`scale(${scaleW}, ${scaleH})`);
      setOverflow('hidden');
    }

    // 宽度铺满，高度缩放
    if (props.scaleMode === ScaleMode.H_SCALE) {
      // 计算出宽度的固定比例
      const scaleW = docClientWidth / props.screenW;
      // console.log('zcg', docClientWidth, scaleW);
      setTransform(`scale(${scaleW}, ${scaleW})`);

      if (docClientHeight > props.screenW) {
        setOverflow('hidden auto');
      } else {
        setOverflow('hidden');
      }
    }

    // 高度铺满，宽度缩放
    if (props.scaleMode === ScaleMode.W_SCALE) {
      // 计算出高度的固定比例
      const scaleH = docClientHeight / props.screenH;
      setTransform(`scale(${scaleH}, ${scaleH})`);

      if (docClientHeight > props.screenH) {
        setOverflow('auto hidden');
      } else {
        setOverflow('hidden');
      }
    }
  };

  const resetLayout = throttle(() => {
    initLayout();
    calLayoutByProps();
  }, 300);
  useEffect(() => {
    if (refContainer.current) {
      resetLayout();
    }
    window.addEventListener('resize', resetLayout);
    return () => {
      window.removeEventListener('resize', resetLayout);
    };
  }, [docClientWidth, docClientHeight, resetLayout]);

  const predicate = (event: KeyboardEvent) => {
    return event.code === 'Space';
  };
  const isPressSpace = useKeyPress(predicate);
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
  const dragMove = useCallback(
    (event: MouseEvent) => {
      if (isPressSpace && offsetCache.current.clickDown) {
        const { current } = offsetCache;
        current.offsetX = event.clientX - current.x;
        current.offsetY = event.clientY - current.y;
        // console.log('123: render', current.offsetX, current.offsetY);
        current.shouldMove = true;
      }
    },
    [isPressSpace],
  );
  useEffect(() => {
    window.addEventListener('mousemove', dragMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', dragMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  });

  const handleResize = throttle(
    (event: Event) => {
      if (event.wheelDelta < 0 && resize >= 0.2) {
        // console.log('resize', event.wheelDelta, resize, resize - 0.1);
        setResize(resize - 0.1);
      } else if (event.wheelDelta > 0 && resize < 2) {
        setResize(resize + 0.1);
      }
      // console.log('resize', event.wheelDelta, resize);
    },
    30,
    { leading: false },
  );
  useEffect(() => {
    window.addEventListener('mousewheel', handleResize);
    return () => {
      window.removeEventListener('mousewheel', handleResize);
    };
  }, [handleResize]);

  return (
    <div className={styles.dashboard} ref={refContainer} style={dashBoardStyle}>
      <div
        className={styles.contentWrapper}
        style={{
          width: docClientWidth,
          height: docClientHeight,
          transform: `scale(${resize}) translateX(${offset.x + 'px'}) translateY(${
            offset.y + 'px'
          })`,
        }}
      >
        <div className={styles.content} style={getContentStyle()}>
          {props.children}
        </div>
      </div>
    </div>
  );
};
export default Layout;
