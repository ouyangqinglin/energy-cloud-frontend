/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-15 15:21:29
 * @LastEditTime: 2023-11-15 15:21:29
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\PvEnergyMachine\Power\index.tsx
 */

import React from 'react';
import Detail from '@/components/Detail';

export type PowerType = {};

const Power: React.FC<PowerType> = (props) => {
  const {} = props;

  return (
    <>
      <div className="card-wrap shadow p20 mb20">
        <Detail.Label title="实时功率" size="small"></Detail.Label>
      </div>
    </>
  );
};

export default Power;
