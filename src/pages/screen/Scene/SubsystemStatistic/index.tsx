import { Carousel, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio';
import type { CarouselRef } from 'antd/lib/carousel';
import { useRef, useState } from 'react';
import DecorationCarousel from '../../components/DecorationCarousel';
import Cell from '../../components/LayoutCell';
import ChargingStation from './ChargingStation';
import EnergyStorage from './EnergyStorage';
import styles from './index.less';
import Photovoltaic from './Photovoltaic';

const SubsystemStatistic = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);
  const goToPage = (e: RadioChangeEvent) => {
    console.log(e.target);
    carouselRef.current?.goTo(e.target.value);
  };

  return (
    <Cell cursor="default" width={400} height={635} left={1515} top={426}>
      <DecorationCarousel panelStyle={{ padding: 0 }} title="系统运行数据">
        <div className={styles.subsystem}>
          <Radio.Group
            className={styles.tabsBtn}
            onChange={goToPage}
            defaultValue={activeBtn}
            buttonStyle="solid"
          >
            <Radio.Button value={0}>光伏</Radio.Button>
            <Radio.Button value={1}>储能</Radio.Button>
            <Radio.Button value={2}>充电桩</Radio.Button>
          </Radio.Group>
        </div>
        <Carousel
          // autoplay={true}
          // beforeChange={changePagination}
          className={styles.carousel}
          dots={false}
          ref={carouselRef}
        >
          <Photovoltaic />
          <EnergyStorage />
          <div>456</div>
          {/* <ChargingStation /> */}
        </Carousel>
      </DecorationCarousel>
    </Cell>
  );
};
export default SubsystemStatistic;
