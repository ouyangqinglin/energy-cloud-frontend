import type { FC } from 'react';
import styles from './index.less';
import Cell from '../../components/LayoutCell';
import TitleBG from './TitleBackGround';
import TitleImage from '@/assets/image/multi-site/title.png';

const Title: FC = () => {
  return (
    <>
      <TitleBG />
      <Cell width={474} height={78} left={723} top={-15} cursor={'default'}>
        <div className={styles.title} style={{ backgroundImage: `url(${TitleImage})` }} />
      </Cell>
    </>
  );
};

export default Title;
