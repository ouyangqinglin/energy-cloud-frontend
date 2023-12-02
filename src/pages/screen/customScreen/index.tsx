import type { FC } from 'react';
import Layout, { ScaleMode } from '../components/Layout';
import CustomLayout from './customLayout';
import LayoutVideo from '@/assets/image/customScreen/background-video.mp4';
import styles from './index.less';
import FullScreen from '../components/FullScreen';
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
const JiechengScreen: FC = () => {
  return (
    <>
      <Layout
        id="jiecheng-screen"
        screenH={screenHeight}
        screenW={screenWidth}
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
        <FullScreen />
      </Layout>
    </>
  );
};

export default JiechengScreen;
