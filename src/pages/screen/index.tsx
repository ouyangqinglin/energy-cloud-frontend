import type { FC } from 'react';
import StationLayout from '@/layouts/StationLayout';
import Layout, { ScaleMode } from './components/Layout';
import Scene from './Scene';

const Screen: FC = () => {
  return (
    <Layout
      id="demo-staion"
      screenH={1080}
      screenW={1920}
      // palette={{ backgroundImage }}
      scaleMode={ScaleMode.H_SCALE}
    >
      <Scene />
    </Layout>
  );
};

export default Screen;
