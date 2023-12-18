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
import { formatMessage } from '@/utils';

const SubsystemStatistic = () => {
  const [activeBtn, setActiveBtn] = useState(1);

  return (
    <Cell cursor="default" width={400} height={635} left={1515} top={426}>
      <DecorationCarousel
        onSiteTypeButtonChange={setActiveBtn}
        panelStyle={{ padding: 0 }}
        valueType={'siteType'}
        title={formatMessage({
          id: 'screen.subsystemRunningData',
          defaultMessage: '子系统运行数据',
        })}
      >
        <Photovoltaic />
        <EnergyStorage />
        <ChargingStation />
      </DecorationCarousel>
    </Cell>
  );
};
export default SubsystemStatistic;
