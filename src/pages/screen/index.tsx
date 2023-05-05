import type { FC } from 'react';
import StationLayout from '@/layouts/StationLayout';
import Layout, { ScaleMode } from './components/Layout';
import Scene from './components/Scene';

const Screen: FC = () => {
  return (
    // <StationLayout>
    <Layout
      screenH={1080}
      screenW={1920}
      // palette={{ backgroundImage }}
      scaleMode={ScaleMode.H_SCALE}
    >
      <Scene />
    </Layout>
    // </StationLayout>
  );
};

export default Screen;
