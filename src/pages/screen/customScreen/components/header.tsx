import type { FC } from 'react';
import styles from '../index.less';
import 'rc-texty/assets/index.css';
import Cell from '../../components/LayoutCell';
import TitleImage from '@/assets/image/customScreen/header-back.png';

const Header: FC = () => {
  return (
    <>
      <div>
        <div className={styles.titleFont}>杰成光储充低碳园区示范站</div>
        <div className={styles.enFont}>
          Jiecheng Optical Storage and Charging Low Carbon Park Demonstration Station
        </div>
      </div>
      <Cell width={1920} left={0} top={0}>
        <div className={styles.titleBg} />
      </Cell>
    </>
  );
};

export default Header;
