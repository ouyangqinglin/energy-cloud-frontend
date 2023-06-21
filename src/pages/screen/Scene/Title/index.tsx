import type { FC } from 'react';
import styles from './index.less';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import TweenOne from 'rc-tween-one';
import Cell from '../../components/LayoutCell';
import TitleBG from './TitleBackGround';
import { ReactComponent as TitleImage } from '@/assets/image/screen/title/永泰光储充示范站_大标题.svg';

const Title: FC = () => {
  return (
    <>
      <TitleBG />
      <Cell width={352} height={78} left={794} top={-15} cursor={'default'}>
        {/* <Texty
          className={styles.title}
          type="mask-top"
          delay={500}
          duration={1000}
          component={TweenOne}
          componentProps={{
            animation: [
              { x: 0, delay: 500, duration: 1000 },
              {
                ease: 'easeOutQuart',
                duration: 300,
                x: 0,
              },
              {
                letterSpacing: 0,
                delay: -300,
                scale: 0.85,
                ease: 'easeInOutQuint',
                duration: 1000,
              },
              { scale: 1, width: '100%', delay: -300, duration: 1000, ease: 'easeInOutQuint' },
            ],
          }}
        > */}
        <TitleImage width={352} height={78} />
        {/* <div className={styles.title} /> */}
        {/* </Texty> */}
      </Cell>
    </>
  );
};

export default Title;
