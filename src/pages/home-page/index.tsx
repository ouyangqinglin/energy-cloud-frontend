import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Carousel, Tabs } from 'antd';
import styles from './index.less';
import SliderCard from './components/SliderCard';
import { config } from './config';
import { useSize } from 'ahooks';
import ChartPV from './components/ChartPV';
import ChartES from './components/ChartES';
import ChartEI from './components/ChartEI';
import ChartBox from './components/ChartBox';
import {
  getAlarmMonitoring,
  getEconomicBenefit,
  getElectricStack,
  getEnvironmentalRevenueIndex,
  getEssIndex,
  getPhotovoltaicIndex,
  getPowerStationOverview,
} from './service';
import { assign } from 'lodash';

export const enum SubSystemType {
  PV = 0,
  ES,
  EI,
}

const HomePage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const [statistic, setStatistic] = useState({});

  const getStatisticData = useCallback(
    async () =>
      await Promise.all([
        getPowerStationOverview(),
        getPhotovoltaicIndex(),
        getEssIndex(),
        getAlarmMonitoring(),
        getEconomicBenefit(),
        getEnvironmentalRevenueIndex(),
        getElectricStack(),
      ]),
    [],
  );

  useEffect(() => {
    getStatisticData().then((res) => {
      const rawData = {};
      res.forEach(({ data }) => {
        if (!data) {
          return;
        }
        assign(rawData, data);
      });
      setStatistic({ ...rawData });
    });
  }, []);

  return (
    <div ref={ref} className="bg-white card-wrap p24">
      <Carousel className={styles.sliderWrapper} slidesPerRow={4} afterChange={onChange}>
        {config.map((item) => (
          <div key={item.title} style={styles.sliderItem}>
            <SliderCard data={statistic} config={item} />
          </div>
        ))}
      </Carousel>
      <Tabs
        className={styles.chartCard}
        defaultActiveKey="1"
        items={[
          {
            label: `光伏`,
            key: '1',
            children: <ChartBox type={SubSystemType.PV} Chart={ChartPV} />,
          },
          {
            label: `储能`,
            key: '2',
            children: <ChartBox type={SubSystemType.ES} Chart={ChartES} />,
          },
          {
            label: `收益`,
            key: '3',
            children: <ChartBox type={SubSystemType.EI} Chart={ChartEI} />,
          },
        ]}
      />
    </div>
  );
};

export default HomePage;
