import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import styles from './index.module.less';
import classnames from 'classnames';
import Lottie from 'lottie-web';

export type DecorationProp = {
  title: string;
  disableIcon?: boolean;
  disableDecoration?: boolean;
};

const Decoration: FC<DecorationProp> = ({ title, disableIcon, disableDecoration, children }) => {
  const playAnimation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (playAnimation.current) {
      Lottie.loadAnimation({
        container: playAnimation.current,
        path: '/lottie/play.json',
        renderer: 'svg',
        loop: true,
        autoplay: true,
      });
    }
  }, [playAnimation]);

  const decorationAnimation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (decorationAnimation.current) {
      Lottie.loadAnimation({
        container: decorationAnimation.current,
        path: '/lottie/decoration.json',
        renderer: 'svg',
        loop: true,
        autoplay: true,
      });
    }
  }, [decorationAnimation]);

  return (
    <div className={classnames(styles.wrapper, { [styles.wrapperRect]: !disableDecoration })}>
      <div className={classnames(styles.titleWrapper, { [styles.borderLeft]: !disableDecoration })}>
        <div className={styles.leftContent}>
          {!disableIcon && <div className={styles.icon} ref={playAnimation} />}
          <span className={styles.text}>{title}</span>
        </div>
        {!disableDecoration && <div className={styles.decoration} ref={decorationAnimation} />}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Decoration;
