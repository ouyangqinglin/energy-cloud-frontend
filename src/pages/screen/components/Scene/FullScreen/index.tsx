import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useToggle } from 'ahooks';
import { useModel } from 'umi';
import Cell from '../../LayoutCell';
import styles from './index.less';

const FullScreen = () => {
  const [visible, { toggle: toggleVisible }] = useToggle(true);
  const { outlined, setOutlined } = useModel('screen');

  const button = !outlined ? (
    <FullscreenOutlined onClick={() => setOutlined(true)} style={{ color: '#fff', fontSize: 32 }} />
  ) : (
    <FullscreenExitOutlined
      onClick={() => setOutlined(false)}
      style={{ color: '#fff', fontSize: 32 }}
    />
  );

  return (
    <Cell width={50} height={50} left={1750} top={0} zIndex={9999}>
      <div
        className={styles.iconWrapper}
        style={{ opacity: visible ? 1 : 0 }}
        onMouseOver={() => toggleVisible(true)}
        onMouseOut={() => toggleVisible(false)}
      >
        {button}
      </div>
    </Cell>
  );
};

export default FullScreen;
