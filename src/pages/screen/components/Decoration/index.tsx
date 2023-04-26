import type { FC } from 'react';
import styles from './index.module.less';
import { ReactComponent as Decoration1 } from '@/assets/image/screen/decoration/decoration1.svg';
// import { ReactComponent as Play } from '@/assets/image/screen/decoration/play.svg';
import Play from '@/assets/image/screen/decoration/play.png';

export type DecorationProp = {
  title: string;
};

const Decoration: FC<DecorationProp> = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.leftContent}>
          <div className={styles.icon} style={{ backgroundImage: `url(${Play})` }} />
          <span className={styles.text}>{title}</span>
        </div>
        <Decoration1 />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Decoration;
