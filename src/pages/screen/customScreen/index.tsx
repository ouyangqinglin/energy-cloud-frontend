import type { FC } from 'react';
import Layout, { ScaleMode } from '../components/Layout';
import CustomLayout from './customLayout';
import LayoutVideo from '@/assets/image/customScreen/background-video.mp4';
import styles from './index.less';

const JiechengScreen: FC = () => {
  return (
    <>
      <Layout
        id="jiecheng-screen"
        screenH={1080}
        screenW={1920}
        palette={{
          backgroundImage: '',
          backgroundColor: 'rgba(10,14,23,1)',
        }}
        scaleMode={ScaleMode.EQUAL} //等比缩放
      >
        <video autoPlay loop className={styles.fillWidth} muted>
          <source src={LayoutVideo} type="video/mp4" />
        </video>
        <CustomLayout />
      </Layout>
    </>
  );
};

export default JiechengScreen;
