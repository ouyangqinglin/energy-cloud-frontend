import { FC } from 'react';
import styles from './index.module.less';
import { useRequest } from 'umi';
import Cell from '../../LayoutCell';
import Decoration from '../../Decoration';
import type { DetailItem } from '@/components/Detail';
import { getChargingStation } from './service';
import ChargingStationChart from './PhotovoltaicChart';
import { DigitalFlipperItemProps } from '../../DigitalFlipper/Item';
import DigitalFlipperGroup from '../../DigitalFlipper/Group';
import TimeButtonGroup from '../../TimeButtonGroup';

const Photovoltaic: FC = () => {
  const { data = {} } = useRequest(getChargingStation);

  const gunInfoItem: DetailItem[] = [
    { label: '充电功率', field: 'chargingPower' },
    { label: '今日充电量', field: 'chargingCapacityToday' },
    { label: '充电枪空闲/使用', field: 'gunStatus' },
    { label: '今日收益', field: 'earningsToday' },
  ];

  const formatterData = () => {
    data['gunStatus'] = (
      <>
        <span>{data.gunIdle}</span>/<span style={{ color: '#50F0FF' }}>{data.gunInUse}</span>
      </>
    );
    return data;
  };

  const config: DigitalFlipperItemProps[] = [
    {
      title: '发电量',
      unit: 'kWh',
      num: 1397,
      titleStyle: {
        fontWeight: 400,
        fontSize: '14px',
        color: '#D0DEEE',
      },
      unitStyle: {
        fontSize: '12px',
        color: '#28F0EE',
      },
      numStyle: {
        backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, #28F0EE 100%), linear-gradient(180deg, #FFFFFF 0%, rgba(40, 240, 238, 0.6) 67%, #28F0EE 100%)`,
        fontSize: '16px',
        color: '#28F0EE',
        height: 'auto',
        lineHeight: 'inherit',
        fontFamily: 'DIN-Bold, DIN',
        fontWeight: 'bold',
      },
    },
    {
      title: '收益',
      num: 100,
      titleStyle: {
        fontWeight: 400,
        fontSize: '14px',
        color: '#D0DEEE',
      },
      unitStyle: {
        fontSize: '12px',
        color: '#FFE04D',
      },
      numStyle: {
        backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, #FFE04D 100%), linear-gradient(180deg, #FFFFFF 0%, rgba(255, 224, 77, 0.6) 67%, #FFE04D 100%)`,
        fontSize: '16px',
        height: 'auto',
        lineHeight: 'inherit',
        color: '#FFE04D',
        fontFamily: 'DIN-Bold, DIN',
        fontWeight: 'bold',
      },
    },
  ];

  const currentPowerGeneration = 100;
  return (
    <Cell width={400} height={314} left={1496} top={398}>
      <Decoration title="光伏">
        <div className={styles.contentWrapper}>
          <div className={styles.powerGeneration}>当前发电功率：{currentPowerGeneration}kWh</div>
          <div className={styles.digitalFlipperWrapper}>
            <DigitalFlipperGroup className={styles.digitalFlipperContent} config={config} />
            <TimeButtonGroup />
          </div>
          <ChargingStationChart />
        </div>
      </Decoration>
    </Cell>
  );
};

export default Photovoltaic;
