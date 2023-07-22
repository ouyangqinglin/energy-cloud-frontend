import Cell from '@/pages/screen/components/LayoutCell';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import { useEffect, useState } from 'react';
import { PathConfigType } from '../../Geometry/EnergyFlowAnimation/type';
import { pathsConfig } from './config';
import styles from './index.less';

const FlowPathAnimation = () => {
  const [paths, setPaths] = useState<PathConfigType[]>([...pathsConfig]);

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

      if (transformedCur && transformedCur.repeat >= 2) {
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

  return (
    <>
      {paths.map((p) => {
        let styleConfig = {
          animationDelay: `-${p.delay}s`,
          animationDuration: `${p.duration}s`,
          animationPlayState: 'running',
          offsetPath: `path('${p.path}')`,
          animationDirection: p.reverse ? 'reverse' : 'normal',
        };

        if (p.style) {
          styleConfig = { ...styleConfig, ...p.style };
        }

        return (
          <div
            key={p.id}
            id={p.id}
            className={classnames([styles.flow, p.reverse ? styles.flowReverse : ''])}
            style={styleConfig}
          />
        );
      })}
    </>
  );
};

export default FlowPathAnimation;
