import type { CSSProperties } from 'react';

export type PathConfigType = {
  id: string;
  path: string;
  duration: number;
  delay: number;
  repeat: number;
  rotatePath?: boolean;
  rotateAngle?: number;
  style?: CSSProperties;
  reverse?: boolean;
};
