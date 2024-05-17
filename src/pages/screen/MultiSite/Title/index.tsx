import type { FC } from 'react';
import styles from './index.less';
import Cell from '../../components/LayoutCell';
import TitleBG from './TitleBackGround';
import { useModel } from 'umi';

const Title: FC = () => {
  const { initialState } = useModel('@@initialState');
  const title =
    initialState?.currentUser?.systemInfo?.multiSiteLargeScreenTitle || '新能源能量管理云平台';

  return (
    <>
      <TitleBG />
      <Cell width={474} height={78} left={723} top={-15} cursor={'default'}>
        <div className={styles.title}>{title}</div>
      </Cell>
    </>
  );
};

export default Title;
