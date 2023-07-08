import { isEmpty } from 'lodash';
import type { SystemDiagramRes } from '../type';
import { SubSystemType } from '../type';
import styles from './index.less';
const AnimationDiagram = ({ data }: { data: SystemDiagramRes }) => {
  const pv = data?.[SubSystemType.PV] ?? {};
  const electricSupply = data?.[SubSystemType.E] ?? {};
  const energyStore = data?.[SubSystemType.ES] ?? {};
  console.log(data);

  const paths = [
    {
      id: 'electric-supply',
      path: 'm61.275 21.471 224.849 152.183',
      duration: 3,
      delay: 0,
      repeat: 5,
      reverse: electricSupply.direction === 1,
      hide: electricSupply?.direction === 0,
      style: {},
    },
    {
      id: 'energy_store',
      duration: 3,
      delay: 1,
      repeat: 1,
      path: 'M61.273 21.47c22.689 40.195 26.086 75.704 10.192 106.528C55.571 158.822 31.749 177.666 0 184.528',
      reverse: energyStore.direction === 1,
      hide: energyStore?.direction === 0,
      style: {},
    },
    {
      id: 'pv',
      duration: 3,
      delay: 2,
      repeat: 1,
      path: 'M61.275 21.47C93.922 33.898 131.719 38.4 174.663 34.978 217.607 31.555 252.041 19.896 277.965 0',
      reverse: pv.direction === 1,
      hide: pv?.direction === 0,
      style: {},
    },
  ];
  return (
    <div className={styles.animationWrapper}>
      {paths.map((p) => {
        let styleConfig = {
          animationDelay: `-${p.delay}s`,
          animationDuration: `${p.duration}s`,
          animationPlayState: 'running',
          offsetPath: `path('${p.path}')`,
          animationDirection: p.reverse ? 'reverse' : 'normal',
          display: p.hide || isEmpty(data) ? 'none' : 'block',
        };

        if (p.style) {
          styleConfig = { ...styleConfig, ...p.style };
        }

        return <div className={styles.flow} key={p.id} id={p.id} style={styleConfig} />;
      })}
    </div>
  );
};

export default AnimationDiagram;
