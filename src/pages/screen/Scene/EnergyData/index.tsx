/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-09 15:23:35
 * @LastEditTime: 2023-06-09 16:52:29
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
  });

  useEffect(() => {
    run({ siteId, type: timeType });
  }, [timeType, siteId]);

  const items = useMemo(
    () => ({
      left: [
        { label: '光伏发电', icon: pvInvinter, field: 'photovoltaic' },
        { label: '电网输电', icon: transmission, field: 'electricSupply' },
        { label: '储能放电', icon: energyDischarge, field: 'essDischarge' },
      ],
      right: [
        { label: '充电桩', icon: charge, field: 'chargingPile' },
        { label: '储能充电', icon: energyCharge, field: 'essCharge' },
        { label: '负载', icon: load, field: 'load' },
      ],
    }),
    [],
  );

  const leftItems = items.left.map((item) => {
    return (
      <div className="flex" key={item.field}>
        <Image className={styles.icon} src={item.icon} />
        <div className={styles.label}>
          <span>{item.label}</span>
          <div>
            <span className={styles.field}>{getPlaceholder(energyData?.[item.field])}</span>kWh
          </div>
        </div>
        <Image className={`${styles.arrow} ml15`} src={arrowRight} />
      </div>
    );
  });

  const rightItems = items.right.map((item) => {
    return (
      <div className="flex" key={item.field}>
        <Image className={`${styles.arrow} mr15`} src={arrowRight} />
        <Image className={styles.icon} src={item.icon} />
        <div className={styles.label}>
          <span>{item.label}</span>
          <div>
            <span className={styles.field}>{getPlaceholder(energyData?.[item.field])}</span>kWh
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={`px10 py20 flex ${styles.energyContain}`}>
      <Space direction="vertical" size={26}>
        {leftItems}
      </Space>
      <Image className={styles.floor} src={floor} />
      <Space direction="vertical" size={26}>
        {rightItems}
      </Space>
    </div>
  );
};

export default EnergyData;
