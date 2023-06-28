// import { Lottie } from '@/components/Lottie';
import Cell from '../../components/LayoutCell';
import styles from './index.less';
// import data from './lottie/background.json';

const TitleBG = () => {
  return (
    <Cell width={1920} height={69} left={0} top={0}>
      <div className={styles.titleBG} />
      {/* <Lottie width={1920} height={69} className={styles.titleBG} animationData={data} /> */}
    </Cell>
  );
};

export default TitleBG;
