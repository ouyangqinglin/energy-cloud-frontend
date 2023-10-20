import type { FC } from 'react';
import Layout, { ScaleMode } from '../components/Layout';
import Scene from '../Scene';
import CustomLayout from './customLayout'
import LayoutVideo from '@/assets/image/custom-screen/background-video.mp4';
import styles from './index.less';
import LayoutBg from '@/assets/image/screen/background/示范站_背景@2x.png';

const JiechengScreen: FC = () => {

  return (
    <>
      <video  autoPlay loop className={styles.fillWidth} muted>
        <source src={LayoutVideo} type="video/mp4"/>
     </video>

     <Layout
      id="jiecheng-screen"
      screenH={1080}
      screenW={1920}
      palette={{
        backgroundImage: '',
        backgroundColor:'transparent'
      }}
      scaleMode={ScaleMode.EQUAL}//等比缩放
    >
      <CustomLayout />
    </Layout>
    </>
  );
};

export default JiechengScreen;
