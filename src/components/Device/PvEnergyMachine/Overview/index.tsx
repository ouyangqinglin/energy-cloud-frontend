/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-15 15:04:50
 * @LastEditTime: 2023-11-16 09:12:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\PvEnergyMachine\Overview\index.tsx
 */

import React, { useMemo, useRef } from 'react';
import styles from '../index.less';
import Detail from '@/components/Detail';
import { useSize } from 'ahooks';
import { config } from './helper';
import EnergyFlow from './EnergyFlow';

export type OverviewType = {};

const Overview: React.FC<OverviewType> = (props) => {
  const {} = props;

  const containRef = useRef(null);
  const containSize = useSize(containRef);

  const scaleNum = useMemo(() => {
    const scaleWidth = (containSize?.width || 964) / 964;
    const scaleHeight = (containSize?.height || 490) / 490;
    return Math.min(scaleWidth, scaleHeight);
  }, [containSize]);

  const items = useMemo(() => {
    return config.map((item) => {
      const Component = item.icon;
      const { left, top, width, height } = item.style;
      return (
        <>
          <div className={styles.node} style={{ left, top }}>
            <Component style={{ width, height }} />
            <Detail items={item.items} column={1} />
          </div>
        </>
      );
    });
  }, []);

  return (
    <>
      <div className="card-wrap shadow p20 mb20">
        <Detail.Label title="概览" size="small"></Detail.Label>
        <div ref={containRef}>
          <div className={styles.overview} style={{ transform: `scale(${scaleNum})` }}>
            {items}
            <EnergyFlow className={styles.flow} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
