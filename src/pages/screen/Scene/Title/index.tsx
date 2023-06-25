import type { FC } from 'react';
import styles from './index.less';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import TweenOne from 'rc-tween-one';
import Cell from '../../components/LayoutCell';
import TitleBG from './TitleBackGround';
// import { ReactComponent as TitleImage } from '@/assets/image/screen/title/永泰光储充示范站_大标题.svg';
import TitleImage from '@/assets/image/screen/title/永泰光储充示范站_大标题@2x.png';

const Title: FC = () => {
  return (
    <>
      <TitleBG />
      <Cell width={352} height={78} left={794} top={-15} cursor={'default'}>
        <div className={styles.title} style={{ backgroundImage: `url(${TitleImage})` }} />
        {/* <TitleImage width={352} height={78} /> */}
        {/* <div className={styles.title} /> */}
        {/* </Texty> */}
      </Cell>
    </>
  );
};

export default Title;
