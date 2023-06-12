import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
import { throttle } from 'lodash';
import { useEffect } from 'react';
import { useModel } from 'umi';
import Cell from '../../components/LayoutCell';
import styles from './index.less';

/**
 * 暂时不支持自动全屏
 * issue: 尝试过模拟点击事件，也会报异常
 * // MDN: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API/Guide
 */
export const useWatchFullScreen = () => {
  const { setOutlined } = useModel('screen');

  useEffect(() => {
    const checkFullScreen = () => {
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      return screen.height === clientHeight;
    };
    const onResize = throttle(() => {
      if (checkFullScreen()) {
        setOutlined(true);
        return;
      }

      setOutlined(false);
    }, 300);

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return null;
};

const FullScreen = () => {
  const { outlined, setOutlined } = useModel('screen');
  const [_, { enterFullscreen, exitFullscreen }] = useFullscreen(document.body);

  const markScreenOutlined = () => {
    setOutlined(true);
    enterFullscreen();
  };

  const markScreenExitOutlined = () => {
    setOutlined(false);
    exitFullscreen();
  };

  const button = !outlined ? (
    <div className={styles.fullscreenContent} onClick={markScreenOutlined}>
      <div className={styles.iconWrapper}>
        <FullscreenOutlined style={{ fontSize: 22 }} />
      </div>
      <span>进入全屏</span>
    </div>
  ) : (
    <div className={styles.fullscreenContent} onClick={markScreenExitOutlined}>
      <div className={styles.iconWrapper}>
        <FullscreenExitOutlined style={{ fontSize: 22 }} />
      </div>
      <span>退出全屏</span>
    </div>
  );

  return (
    <Cell width={104} height={32} left={1792} top={12} zIndex={9999}>
      <div className={styles.fullscreen}>{button}</div>
    </Cell>
  );
};

export default FullScreen;
