import type { FC } from 'react';
import styles from './index.less';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import TweenOne from 'rc-tween-one';
import Cell from '../../components/LayoutCell';

const Title: FC = () => {
  return (
    <>
      <Cell width={289} height={36} left={815.5} top={12}>
        <Texty
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
        >
          永泰光储充示范站
        </Texty>
      </Cell>
    </>
  );
};

export default Title;
