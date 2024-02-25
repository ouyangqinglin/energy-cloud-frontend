import { useFullscreen, useEventListener } from 'ahooks';
import Cell from '../LayoutCell';
import styles from './index.less';

import { ReactComponent as EnterFullScreenIcon } from '@/assets/image/screen/fullscreen/icon_进入全屏.svg';
import { ReactComponent as ExitFullScreenIcon } from '@/assets/image/screen/fullscreen/icon_退出全屏.svg';
import { formatMessage } from '@/utils';

const FullScreen = () => {
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(document.body, {
    onEnter() {
      document.body.classList.add('full-screen');
    },
    onExit() {
      document.body.classList.remove('full-screen');
    },
  });

  useEventListener('keydown', (e) => {
    if (e.key == 'F11') {
      e.preventDefault();
      enterFullscreen();
    }
  });

  const button = !isFullscreen ? (
    <div className={styles.fullscreenContent} onClick={enterFullscreen}>
      <div className={styles.iconWrapper}>
        <EnterFullScreenIcon width={38} height={38} />
      </div>
      <span>{formatMessage({ id: 'screen.fullScreen', defaultMessage: '进入全屏' })}</span>
    </div>
  ) : (
    <div className={styles.fullscreenContent} onClick={exitFullscreen}>
      <div className={styles.iconWrapper}>
        <ExitFullScreenIcon width={38} height={38} />
      </div>
      <span>{formatMessage({ id: 'screen.exitFullScreen', defaultMessage: '退出全屏' })}</span>
    </div>
  );

  return (
    <Cell width={135} height={32} right={20} top={12} zIndex={99999}>
      <div className={styles.fullscreen}>{button}</div>
    </Cell>
  );
};

export default FullScreen;
