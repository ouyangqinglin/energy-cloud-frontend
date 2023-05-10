import type { FC } from 'react';
import styles from './index.module.less';
import { ReactComponent as Decoration1 } from '@/assets/image/screen/decoration/decoration1.svg';
import Play from '@/assets/image/screen/siteInfo/play.png';
import classnames from 'classnames';

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
          {!disableIcon && (
            <div className={styles.icon} style={{ backgroundImage: `url(${Play})` }} />
          )}
          <span className={styles.text}>{title}</span>
        </div>
        {!disableDecoration && <Decoration1 />}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Decoration;
