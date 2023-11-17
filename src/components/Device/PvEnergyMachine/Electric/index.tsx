/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-15 15:22:37
 * @LastEditTime: 2023-11-16 17:23:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\PvEnergyMachine\Electric\index.tsx
 */

import React from 'react';
import Detail from '@/components/Detail';
import styles from '../index.less';

export type ElectricType = {
  className?: string;
};

const Electric: React.FC<ElectricType> = (props) => {
  const { className } = props;

  return (
    <>
      <div className={`card-wrap shadow p20 mb20 ${styles.chart} ${className}`}>
        <Detail.Label title="电量" size="small" showLine={false}></Detail.Label>
      </div>
    </>
  );
};

export default Electric;
