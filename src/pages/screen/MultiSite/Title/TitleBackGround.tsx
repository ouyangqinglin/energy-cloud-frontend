import Cell from '../../components/LayoutCell';
import styles from './index.less';

const TitleBG = () => {
  return (
    <Cell width={1920} height={69} left={0} top={0}>
      <div className={styles.titleBG} />
    </Cell>
  );
};

export default TitleBG;
