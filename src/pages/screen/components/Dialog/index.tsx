import type { FC } from 'react';
import WrapContent from '@/components/WrapContent';
import Layout, { ScaleMode } from '../Layout';
import Scene from '../Scene';

const Screen: FC = () => {
  return (
    <WrapContent>
      <Layout
        screenH={1080}
        screenW={1920}
        // palette={{ backgroundImage }}
        scaleMode={ScaleMode.H_SCALE}
      >
        <Scene />
      </Layout>
    </WrapContent>
  );
};

export default Screen;
