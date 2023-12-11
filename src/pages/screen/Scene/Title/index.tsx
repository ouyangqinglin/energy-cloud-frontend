import { useRef, type FC, useMemo } from 'react';
import styles from './index.less';
import 'rc-texty/assets/index.css';
import Cell from '../../components/LayoutCell';
import TitleBG from './TitleBackGround';
import { useSize } from 'ahooks';

type TitleType = {
  title?: string;
};

const Title: FC<TitleType> = (props) => {
  const { title } = props;

  const titleRef = useRef(null);
  const titleSize = useSize(titleRef);

  const scaleNum = useMemo(() => {
    const num = 435 / (titleSize?.width ?? 435);
    return num > 1 ? 1 : num < 0.315 ? 0.315 : num;
  }, [titleSize]);

  return (
    <>
      <TitleBG />
      <Cell width={435} height={60} left={743} top={0} cursor={'default'}>
        <div className={styles.titleContain}>
          <div
            ref={titleRef}
            className={styles.title}
            style={{
              transform: `scale(${scaleNum})`,
            }}
          >
            {title}
          </div>
        </div>
      </Cell>
    </>
  );
};

export default Title;
