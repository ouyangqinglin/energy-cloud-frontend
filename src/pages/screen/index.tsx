import type { FC } from 'react';
import Layout, { ScaleMode } from './components/Layout';
import Scene from './Scene';
import LayoutBg from '@/assets/image/screen/background/示范站_背景@2x.png';

const Screen: FC = () => {
  return (
    <Layout
      id="demo-staion"
      screenH={1080}
      screenW={1920}
      palette={{
        backgroundImage: LayoutBg,
      }}
      scaleMode={ScaleMode.EQUAL}
    >
      <Scene />
    </Layout>
  );
};

export default Screen;
