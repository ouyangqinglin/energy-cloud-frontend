import { uniqueId } from 'lodash';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import Cell from '../../../LayoutCell';
import { leftPathsConfig } from './configLeftPaths';
import { rightPathsConfig, rightPathsNeedCalc } from './configRightPaths';
import styles from './index.module.less';
import type { PathConfigType } from './type';

const EnergyFlow: FC = () => {
  const [paths, setPaths] = useState<PathConfigType[]>([...rightPathsNeedCalc]);

  const calcPointWithRadian = ({
    x,
    y,
    cx,
    cy,
    angle,
  }: {
    x: number;
    y: number;
    cx: number;
    cy: number;
    angle: number;
  }) => {
    // 弧度计算
    const c = (Math.PI / 180) * angle;
    const rx = (x - cx) * Math.cos(c) - (y - cy) * Math.sin(c) + cx;
    const ry = (y - cy) * Math.cos(c) + (x - cx) * Math.sin(c) + cy;
    return [Math.round(rx), Math.round(ry)];
  };

  const calcPathAfterRotate = ({ path, rotateAngle: angle = -30 }: PathConfigType) => {
    const pathArr = path.split(' ');

    const [startX, startY] = [Number(pathArr[0]), Number(pathArr[1])];
    const [endX, endY] = [Number(pathArr[2]), Number(pathArr[3])];
    const [cx, cy] = [Math.abs((startX - endX) / 2), Math.abs((startY - endY) / 2)];
    console.log('zgg before', startX, startY, endX, endY, cx, cy);
    const res = [
      ...calcPointWithRadian({ x: startX, y: startY, cx, cy, angle }),
      ...calcPointWithRadian({ x: endX, y: endY, cx, cy, angle }),
    ].join(' ');
    console.log('zgg after', res);
    return res;
  };

  const finalPaths: PathConfigType[] = [];
  const handlePath = (cur: PathConfigType) => {
    if (cur.rotatePath) {
      return {
        ...cur,
        path: cur.rotatePath ? `M${calcPathAfterRotate(cur)}` : cur.path,
      };
    }
    return cur;
  };
  const handleRepeatItem = () => {
    return paths.reduce((pre, cur) => {
      pre.push(handlePath(cur));
      console.log('zgg', pre);

      if (cur && cur.repeat) {
        const copyPaths: PathConfigType[] = [];
        for (let i = 0; i < cur.repeat; i++) {
          copyPaths.push({
            ...cur,
            id: uniqueId(),
            delay: i * 2,
          });
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
