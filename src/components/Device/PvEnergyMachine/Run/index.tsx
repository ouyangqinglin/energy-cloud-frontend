/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-15 15:24:24
 * @LastEditTime: 2023-11-15 15:24:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\PvEnergyMachine\Run\index.tsx
 */

import React from 'react';
import Detail from '@/components/Detail';

export type RunType = {};

const Run: React.FC<RunType> = (props) => {
  const {} = props;

  return (
    <>
      <div className="card-wrap shadow p20 mb20">
        <Detail.Label title="运行状态" size="small"></Detail.Label>
      </div>
    </>
  );
};

export default Run;
