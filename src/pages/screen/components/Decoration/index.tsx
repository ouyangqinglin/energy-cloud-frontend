import type { FC } from 'react';
import styles from './index.module.less';
import classnames from 'classnames';
import decoration from './lottie/decoration.json';
import play from './lottie/play.json';
import { Lottie } from '@/components/Lottie';

export type DecorationProp = {
  title: string;
  disableIcon?: boolean;
  disableDecoration?: boolean;
};

const Decoration: FC<DecorationProp> = ({ title, disableIcon, disableDecoration, children }) => {
  return (
    <div className={classnames(styles.wrapper, { [styles.wrapperRect]: !disableDecoration })}>
      <div className={classnames(styles.titleWrapper, { [styles.borderLeft]: !disableDecoration })}>
        <div className={styles.leftContent}>
          {!disableIcon && <Lottie width={24} height={24} animationData={play} />}
          <span className={styles.text}>{title}</span>
        </div>
        {!disableDecoration && (
          <Lottie className={styles.decoration} width={29} height={32} animationData={decoration} />
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Decoration;
