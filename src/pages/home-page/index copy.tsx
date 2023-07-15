import React, { useEffect, useRef, useState } from 'react';
import EmptyPage from '@/components/EmptyPage';
import { Carousel, Tabs } from 'antd';
import styles from './index.less';
import SliderCard from './components/SliderCard';
import { config } from './config';
import { useSize } from 'ahooks';
import ChartPV from './components/ChartPV';
import ChartES from './components/ChartES';
// import ChartEI from './components/ChartEI';
import ChartEI from './components/ChartEI/index-mock';
import ChartBox from './components/ChartBox';

export const enum SubSystemType {
  PV = 'PV',
  ES = 'ES',
  // economic incoming
  EI = 'EI',
}

const HomePage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  const [slidesPerRow, setSlidesPerRow] = useState(3);
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const [subSystemType, setSubSystemType] = useState(SubSystemType.PV);

  useEffect(() => {
    if (!size?.width) {
      return;
    }
    if (size.width <= 1250) {
      setSlidesPerRow(2);
      return;
    }
    if (size.width > 1400 && size.width <= 1700) {
      setSlidesPerRow(3);
      return;
    }
    if (size.width > 1600) {
      setSlidesPerRow(4);
    }
  }, [size]);

  return (
    <div ref={ref} className="bg-white card-wrap p24">
      <Carousel className={styles.sliderWrapper} slidesPerRow={slidesPerRow} afterChange={onChange}>
        {config.map((item) => (
          <div key={item.title} style={styles.sliderItem}>
            <SliderCard config={item} />
          </div>
        ))}
      </Carousel>
      <Tabs
        className={styles.chartCard}
        defaultActiveKey={SubSystemType.PV}
        onChange={(key) => setSubSystemType(key as SubSystemType)}
        items={[
          {
            label: `光伏`,
            key: SubSystemType.PV,
            children: <ChartBox type={subSystemType} Chart={ChartPV} />,
          },
          {
            label: `储能`,
            key: SubSystemType.ES,
            children: <ChartBox type={subSystemType} Chart={ChartES} />,
          },
          {
            label: `收益`,
            key: SubSystemType.EI,
            children: <ChartBox type={subSystemType} Chart={ChartEI} />,
          },
        ]}
      />
    </div>
  );
};

export default HomePage;
