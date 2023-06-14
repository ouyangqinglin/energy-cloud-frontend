import { Carousel, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import type { CarouselRef } from 'antd/lib/carousel';
import { useEffect, useRef, useState } from 'react';
import DecorationCarousel from '../../components/DecorationCarousel';
import Cell from '../../components/LayoutCell';
import ChargingStation from './ChargingStation';
import EnergyStorage from './EnergyStorage';
import styles from './index.less';
import Photovoltaic from './Photovoltaic';

const SubsystemStatistic = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  const carouselRef = useRef<CarouselRef>(null);

  useEffect(() => {
    if (carouselRef?.current) {
      carouselRef.current.goTo(activeBtn);
    }
  }, [activeBtn, carouselRef]);

  return (
    <Cell cursor="default" width={400} height={635} left={1515} top={426}>
      <DecorationCarousel panelStyle={{ padding: 0 }} title="系统运行数据">
        <div className={styles.subsystem}>
          <Radio.Group
            className={styles.tabsBtn}
            value={activeBtn}
            onChange={(e) => setActiveBtn(e?.target?.value)}
            buttonStyle="solid"
          >
            <Radio.Button value={0}>光伏</Radio.Button>
            <Radio.Button value={1}>储能</Radio.Button>
            <Radio.Button value={2}>充电桩</Radio.Button>
          </Radio.Group>
        </div>
        <Carousel className={styles.carousel} dots={false} ref={carouselRef}>
          <Photovoltaic />
          <EnergyStorage />
          <ChargingStation />
        </Carousel>
      </DecorationCarousel>
    </Cell>
  );
};
export default SubsystemStatistic;
