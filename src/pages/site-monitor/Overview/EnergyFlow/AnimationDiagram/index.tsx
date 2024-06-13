import type { SystemDiagramRes } from '../type';
import { SubSystemType } from '../type';
import styles from './index.less';
import { isEmpty } from 'lodash';
import { paths } from './config';
import { memo } from 'react';

const AnimationDiagram = ({ data, siteType }: { data: SystemDiagramRes; siteType: string }) => {
  const pv = data?.[SubSystemType.PV] ?? {};
  const electricSupply = data?.[SubSystemType.E] ?? {};
  const energyStore = data?.[SubSystemType.ES] ?? {};
  const chargingStation = data?.[SubSystemType.CS] ?? {};
  const load = data?.[SubSystemType.L] ?? {};
  const currentPaths = paths(electricSupply, energyStore, pv, chargingStation, load, siteType);
  return (
    <div className={styles.animationWrapper}>
      {currentPaths.map((p) => {
        let styleConfig = {
          animationPlayState: 'running',
          offsetPath: `path('${p.path}')`,
          animationDirection: p.reverse ? 'reverse' : 'normal',
          display: p.hide || isEmpty(data) ? 'none' : 'block',
        };

        if (p.style) {
          styleConfig = { ...styleConfig, ...p.style };
        }

        return (
          <div
            className={`${styles.flow}`}
            key={Math.floor(Math.random() * 10000000)}
            id={p.id}
            style={styleConfig}
          />
        );
      })}
    </div>
  );
};

export default memo(AnimationDiagram);
