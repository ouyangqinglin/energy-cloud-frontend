import { fill, uniqueId } from 'lodash';
import { CSSProperties, FC, useEffect, useState } from 'react';
import Cell from '../../../LayoutCell';
import styles from './index.module.less';

export type PathConfigType = {
  id: string;
  path: string;
  duration: number;
  delay: number;
  repeat: number;
  style?: CSSProperties;
};

const EnergyFlow: FC = () => {
  const [paths, setPaths] = useState<PathConfigType[]>([
    {
      id: '1',
      path: 'M0,187.940396 L85.5584372,237.759111 C91.4105522,241.181811 98.6214805,241.269222 104.545437,238.014275',
      duration: 2,
      delay: 0,
      repeat: 0,
    },
    {
      id: '2',
      path: 'M98.6214805,241.269222 104.545437,238.014275 L104.906497,237.810816 L397.127315,68.9905683',
      duration: 6,
      delay: 0,
      repeat: 3,
      style: {
        transform: 'translate(-3px, 1px)',
      },
    },
  ]);

  const finalPaths: PathConfigType[] = [];
  const handleRepeatItem = () => {
    return paths.reduce((pre, cur) => {
      pre.push(cur);

      if (cur && cur.repeat) {
        const copyPaths: PathConfigType[] = [];
        for (let i = 0; i < cur.repeat; i++) {
          copyPaths.push({ ...cur, id: uniqueId(), delay: i * 2 });
        }
        pre.push(...copyPaths);
        return pre;
      }

      return pre;
    }, finalPaths);
  };

  useEffect(() => {
    const newPaths = handleRepeatItem();
    setPaths(newPaths);
    console.log(newPaths);
  }, []);

  return (
    <Cell width={684} height={332} left={640} top={372}>
      {paths.map((p) => {
        let styleConfig = {
          animationDelay: `-${p.delay}s`,
          animationDuration: `${p.duration}s`,
          animationPlayState: 'running',
          offsetPath: `path('${p.path}')`,
        };

        if (p.style) {
          styleConfig = { ...styleConfig, ...p.style };
        }

        return <div key={p.id} className={styles.point3} style={styleConfig} />;
      })}
    </Cell>
  );
};

export default EnergyFlow;
