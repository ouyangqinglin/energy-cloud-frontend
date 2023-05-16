import type { FC } from 'react';
import styles from './index.less';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import TweenOne from 'rc-tween-one';
import Cell from '../../LayoutCell';

const Title: FC = () => {
  const getEnter = (e: any) => {
    const t = {
      opacity: 0,
      scale: 0.8,
      y: '-100%',
    };
    if (e.index >= 2 && e.index <= 6) {
      return { ...t, y: '-30%', duration: 150 };
    }
    return t;
  };

  return (
    <>
      <Cell width={289} height={36} left={815.5} top={12}>
        <Texty
          className={styles.title}
          type="mask-top"
          delay={100}
          enter={getEnter}
          // interval={this.geInterval}
          component={TweenOne}
          componentProps={{
            animation: [
              { x: 130, type: 'set' },
              { x: 100, delay: 500, duration: 450 },
              {
                ease: 'easeOutQuart',
                duration: 300,
                x: 0,
              },
              {
                letterSpacing: 0,
                delay: -300,
                scale: 0.9,
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
