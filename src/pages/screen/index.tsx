import { useRequest } from 'umi';
import type { FC } from 'react';

import numeral from 'numeral';
import WrapContent from '@/components/WrapContent';
import Layout, { ScaleMode } from './components/Layout';
import Scene from './components/Scene';

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
