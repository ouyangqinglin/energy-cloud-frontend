import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen, useEventListener } from 'ahooks';
import Cell from '../../components/LayoutCell';
import styles from './index.less';

type FullScreenType = {
  target?: Element | (() => Element) | React.MutableRefObject<Element>;
};

const FullScreen = (props: FullScreenType) => {
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(props.target);

  useEventListener('keydown', (e) => {
    if (e.key == 'F11') {
      e.preventDefault();
      enterFullscreen();
    }
  });

  const button = !isFullscreen ? (
    <div className={styles.fullscreenContent} onClick={enterFullscreen}>
      <div className={styles.iconWrapper}>
        <FullscreenOutlined style={{ fontSize: 22 }} />
      </div>
      <span>进入全屏</span>
    </div>
  ) : (
    <div className={styles.fullscreenContent} onClick={exitFullscreen}>
      <div className={styles.iconWrapper}>
        <FullscreenExitOutlined style={{ fontSize: 22 }} />
      </div>
      <span>退出全屏</span>
    </div>
  );

  return (
    <Cell width={104} height={32} left={1792} top={12}>
      <div className={styles.fullscreen}>{button}</div>
    </Cell>
  );
};

export default FullScreen;
