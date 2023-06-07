import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen, useToggle } from 'ahooks';
import { useModel } from 'umi';
import Cell from '../../LayoutCell';
import styles from './index.less';

/**
 * 暂时不支持自动全屏
 * issue: 尝试过模拟点击事件，也会报异常
 * // MDN: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API/Guide
 */
const FullScreen = () => {
  const [visible, { toggle: toggleVisible }] = useToggle(true);
  const { outlined, setOutlined } = useModel('screen');
  const [_, { setFull, exitFull }] = useFullscreen(document.body);

  const markScreenOutlined = () => {
    setOutlined(true);
    setFull();
  };

  const markScreenExitOutlined = () => {
    setOutlined(false);
    exitFull();
  };

  const button = !outlined ? (
    <FullscreenOutlined onClick={markScreenOutlined} style={{ color: '#fff', fontSize: 32 }} />
  ) : (
    <FullscreenExitOutlined
      onClick={markScreenExitOutlined}
      style={{ color: '#fff', fontSize: 32 }}
    />
  );

  return (
    // <Cell width={50} height={50} left={1750} top={0} zIndex={9999}>
    <div
      className={styles.iconWrapper}
      // style={{ opacity: visible ? 1 : 0 }}
      onMouseOver={() => toggleVisible(true)}
      onMouseOut={() => toggleVisible(false)}
    >
      {button}
    </div>
    // </Cell>
  );
};

export default FullScreen;
