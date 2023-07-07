import { ReactComponent as SVGStatic } from './SVGStatic.svg';
import SVGActive from './SVGActive';
import AnimationDiagram from '../AnimationDiagram';
import styles from './index.less';
const SystemDiagram = () => {
  return (
    <div className={styles.systemDiagram}>
      <SVGStatic style={{ width: 557, height: 332 }} />
      <SVGActive
        style={{
          position: 'absolute',
          width: '100%',
          height: 332,
          top: 0,
          left: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: 332,
          top: 0,
          left: 0,
        }}
      >
        {/* <AnimationDiagram /> */}
      </div>
    </div>
  );
};

export default SystemDiagram;
