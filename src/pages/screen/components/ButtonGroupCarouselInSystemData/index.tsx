import type { FC, ReactNode } from 'react';
import { useRef, useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { Carousel } from 'antd';
import type { CarouselRef } from 'antd/lib/carousel';

export const enum ChartType {
  REAL_POWER = 'REAL_POWER',
  ELECTRICITY = 'ELECTRICITY',
}

const ButtonGroupCarouselInSystemData: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const carouselRef = useRef<CarouselRef>(null);
  const [type, setType] = useState<ChartType>(ChartType.REAL_POWER);

  const goNextPage = () => {
    carouselRef?.current?.next();
  };

  const handleClick = (value: ChartType) => {
    goNextPage();
    setType(value);
  };

  return (
    <>
      <div className={styles.buttonGroupWrapper}>
        <div className={styles.rect} />
        <div
          className={classnames(
            styles.label,
            type === ChartType.REAL_POWER ? styles.activeLabel : '',
          )}
          onClick={() => handleClick(ChartType.REAL_POWER)}
        >
          实时功率
        </div>
        <div
          className={classnames(
            styles.label,
            type === ChartType.ELECTRICITY ? styles.activeLabel : '',
          )}
          onClick={() => handleClick(ChartType.ELECTRICITY)}
        >
          电量
        </div>
      </div>
      <Carousel className={styles.carousel} dots={false} ref={carouselRef}>
        {children}
      </Carousel>
    </>
  );
};

export default ButtonGroupCarouselInSystemData;
