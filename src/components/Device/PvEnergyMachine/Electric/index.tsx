/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-15 15:22:37
 * @LastEditTime: 2023-11-15 15:22:37
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\PvEnergyMachine\Electric\index.tsx
 */

import React from 'react';
import Detail from '@/components/Detail';

export type ElectricType = {};

const Electric: React.FC<ElectricType> = (props) => {
  const {} = props;

  return (
    <>
      <div className="card-wrap shadow p20 mb20">
        <Detail.Label title="电量" size="small"></Detail.Label>
      </div>
    </>
  );
};

export default Electric;
