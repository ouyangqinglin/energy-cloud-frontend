import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen, useToggle } from 'ahooks';
import { throttle } from 'lodash';
import { useEffect } from 'react';
import { useModel } from 'umi';
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

  const [_, { setFull, exitFull }] = useFullscreen(document.body);

  function markScreenOutlined() {
    setOutlined(true);
    setFull();
  }

  function markScreenExitOutlined() {
    setOutlined(false);
    exitFull();
  }

  const button = !outlined ? (
    <FullscreenOutlined onClick={markScreenOutlined} style={{ color: '#fff', fontSize: 22 }} />
  ) : (
    <FullscreenExitOutlined
      onClick={markScreenExitOutlined}
      style={{ color: '#fff', fontSize: 22 }}
    />
  );

  return <div className={styles.iconWrapper}>{button}</div>;
};

export default FullScreen;
