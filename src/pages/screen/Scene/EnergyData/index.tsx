/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-09 15:23:35
 * @LastEditTime: 2023-06-13 15:29:05
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\Scene\EnergyData\index.tsx
 */
import React, { useEffect, useMemo } from 'react';
import { Image, Space } from 'antd';
import { useRequest } from 'umi';
import { TimeType } from '../../components/TimeButtonGroup';
import { getData } from './service';
import { getSiteId } from '../helper';
import { getPlaceholder } from '@/utils';
import pvInvinter from '@/assets/image/screen/energy-data/pvInvinter.svg';
import transmission from '@/assets/image/screen/energy-data/transmission.svg';
import energyDischarge from '@/assets/image/screen/energy-data/energy-discharge.svg';
import charge from '@/assets/image/screen/energy-data/charge.svg';
import energyCharge from '@/assets/image/screen/energy-data/energy-charge.svg';
import load from '@/assets/image/screen/energy-data/load.svg';
import arrowRight from '@/assets/image/screen/energy-data/arrow-right.svg';
import floor from '@/assets/image/screen/energy-data/floor.svg';
import styles from './index.less';

type EnergyDataProps = {
  timeType: TimeType;
};

const EnergyData: React.FC<EnergyDataProps> = (props) => {
  const { timeType } = props;
  const siteId = getSiteId();

  const { data: energyData, run } = useRequest(getData, {
    manual: true,
    pollingInterval: 5 * 60 * 1000,
  });

  useEffect(() => {
    run({ siteId, type: timeType });
  }, [timeType, siteId]);

  const items = useMemo(
    () => ({
      left: [
        { label: '市电输电(kWh)', icon: transmission, field: 'electricSupply' },
        { label: '光伏发电(kWh)', icon: pvInvinter, field: 'photovoltaic' },
        { label: '储能放电(kWh)', icon: energyDischarge, field: 'essDischarge' },
      ],
      right: [
        { label: '充电桩(kWh)', icon: charge, field: 'chargingPile' },
        { label: '其他负载(kWh)', icon: load, field: 'load' },
        { label: '储能充电(kWh)', icon: energyCharge, field: 'essCharge' },
      ],
    }),
    [],
  );

  const leftItems = items.left.map((item) => {
    return (
      <div className="flex" key={item.field}>
        <Image className={styles.icon} src={item.icon} preview={false} />
        <div className={styles.label}>
          <span>{item.label}</span>
          <div>
            <span className={styles.field}>
              {getPlaceholder(Math.floor(energyData?.[item.field] || 0))}
            </span>
          </div>
        </div>
      </div>
    );
  });

  const rightItems = items.right.map((item) => {
    return (
      <div className="flex" key={item.field}>
        <Image className={styles.icon} src={item.icon} preview={false} />
        <div className={styles.label}>
          <span>{item.label}</span>
          <div>
            <span className={styles.field}>
              {getPlaceholder(Math.floor(energyData?.[item.field]) || 0)}
            </span>
          </div>
        </div>
      </div>
    );
  });

  const arrows = (
    <>
      <Space className={styles.arrowContain} direction="vertical" size={26}>
        {items.left.map((item) => {
          return (
            <Image
              className={`${styles.arrow}`}
              src={arrowRight}
              preview={false}
              key={item.field}
            />
          );
        })}
      </Space>
    </>
  );

  return (
    <div className={`flex ${styles.energyContain}`}>
      <Space direction="vertical" size={26}>
        {leftItems}
      </Space>
      {arrows}
      <Image className={`${styles.floor} mx8`} src={floor} preview={false} />
      {arrows}
      <Space direction="vertical" size={26}>
        {rightItems}
      </Space>
    </div>
  );
};

export default EnergyData;
