import Cell from '@/pages/screen/components/LayoutCell';
import QueueAnim from 'rc-queue-anim';
import { useEffect, useState } from 'react';
import { leftPathsConfig } from './configLeftPaths';
import { rightPathsConfig, rightPathsNeedCalc, rightPathsDynamical } from './configRightPaths';
import styles from './index.less';
import type { PathConfigType } from './type';

const EnergyFlow = () => {
  const [paths, setPaths] = useState<PathConfigType[]>([
    ...leftPathsConfig,
    // ...rightPathsConfig,
    // ...rightPathsNeedCalc,
    // ...rightPathsDynamical,
  ]);

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

    return [
      ...calcPointWithRadian({ x: startX, y: startY, cx, cy, angle }),
      ...calcPointWithRadian({ x: endX, y: endY, cx, cy, angle }),
    ].join(' ');
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
      const transformedCur = handlePath(cur);
      pre.push(transformedCur);

      if (transformedCur && transformedCur.repeat) {
        const copyPaths: PathConfigType[] = [];
        for (let i = 1; i <= transformedCur.repeat; i++) {
          copyPaths.push({
            ...transformedCur,
            id: transformedCur.id + '_copy'.repeat(i),
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

  return paths.map((p) => {
    let styleConfig = {
      begin: `${p.delay}s`,
      dur: `${p.duration}s`,
      path: p.path,
    };

    if (p.style) {
      styleConfig = { ...styleConfig, ...p.style };
    }
    return (
      <use key={p.id} id={p.id} className={styles.flow} xlinkHref="#circleAnimation" x="0" y="0">
        <animateMotion {...styleConfig} rotate="auto" repeatCount="indefinite" />
      </use>
    );
  });
};

export default EnergyFlow;
