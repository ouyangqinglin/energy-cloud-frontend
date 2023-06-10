import { throttle } from 'lodash';
import { FC, useRef } from 'react';
import { useEffect, useState } from 'react';
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

  const backgroundImage = props.palette?.backgroundImage ?? 'none';
  const backgroundColor = props.palette?.backgroundColor ?? '#111111';

  const dashBoardStyle = {
    overflow: overflow,
    height: '100vh',
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

  return (
    <div className={styles.dashboard} ref={refContainer} style={dashBoardStyle}>
      <div
        className={styles.contentWrapper}
        style={{
          width: docClientWidth,
          height: docClientHeight,
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
