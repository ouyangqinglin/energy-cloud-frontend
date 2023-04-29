import type { FC } from 'react';
import styles from './index.module.less';
import { useRequest } from 'umi';
import Cell from '../../LayoutCell';
import Decoration from '../../Decoration';
import type { DetailItem } from '@/components/Detail';
import { getEnergyStorage } from './service';
import ChargingStationChart from './EnergyStorageChart';
import type { DigitalFlipperItemProps } from '../../DigitalFlipper/Item';
import DigitalFlipperGroup from '../../DigitalFlipper/Group';
import TimeButtonGroup from '../../TimeButtonGroup';
import Detail from '@/components/Detail';

const EnergyStorage: FC = () => {
  const { data = {} } = useRequest(getEnergyStorage);
  const gunInfoItem: DetailItem[] = [
    { label: '实时状态', field: 'realtimeStatus' },
    { label: '充放电功率：', field: 'chargingAndDischargingPower' },
    { label: 'SOC', field: 'soc' },
    { label: 'SOH', field: 'soh' },
  ];

  const formatterData = () => {
    const isCharging = data.realtimeStatus;
    data.realtimeStatus = (
      <span style={{ color: isCharging ? '#28F0EE' : '#14E6B2' }}>
        {isCharging ? '充电' : '放电'}
      </span>
    );
    return data;
  };

  const config: DigitalFlipperItemProps[] = [
    {
      title: '充电量',
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
      title: '放电量',
      num: 100,
      titleStyle: {
        fontWeight: 400,
        fontSize: '14px',
        color: '#D0DEEE',
      },
      unitStyle: {
        fontSize: '12px',
        color: '#14E6B2 ',
      },
      numStyle: {
        backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, #14E6B2  100%), linear-gradient(180deg, #FFFFFF 0%, rgba(20, 230, 178, 0.6) 67%, #14E6B2  100%)`,
        fontSize: '16px',
        height: 'auto',
        lineHeight: 'inherit',
        color: '#14E6B2 ',
        fontFamily: 'DIN-Bold, DIN',
        fontWeight: 'bold',
      },
    },
  ];

  return (
    <Cell width={400} height={324} left={1496} top={58}>
      <Decoration title="储能">
        <div className={styles.contentWrapper}>
          <Detail
            items={gunInfoItem}
            data={formatterData()}
            column={2}
            labelStyle={{
              color: '#A7B7CA',
              height: '20px',
              lineHeight: '20px',
              fontSize: '1.11vh',
            }}
            contentStyle={{
              color: 'white',
              height: '20px',
              lineHeight: '20px',
              fontSize: '1.11vh',
            }}
          />
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

export default EnergyStorage;
