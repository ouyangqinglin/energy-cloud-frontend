/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-23 10:57:35
 * @LastEditTime: 2024-03-23 15:30:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\PowerSwitch\index.tsx
 */

import React, { memo, useMemo } from 'react';
import YTProTable from '@/components/YTProTable';
import { columns } from './helper';
import { clusterFormat } from '@/utils/format';
import { parseToArray } from '@/utils';

type PowerSwitchType = {
  realTimeData?: Record<string, any>;
};

type PowerDataType = {
  mposfeed: number;
  mnegfeed: number;
};

const PowerSwitch: React.FC<PowerSwitchType> = (props) => {
  const { realTimeData } = props;

  const dataSource: Record<string, any>[] = [];
  const powerData: PowerDataType[] = parseToArray(realTimeData?.mpswiss || []);

  powerData?.forEach?.((item, index) => {
    if (index % 3 == 0) {
      dataSource.push({});
    }
    dataSource[dataSource.length - 1]['order' + (index % 3)] = index;
    dataSource[dataSource.length - 1]['mposfeed' + (index % 3)] = clusterFormat(item?.mposfeed);
    dataSource[dataSource.length - 1]['mnegfeed' + (index % 3)] = clusterFormat(item?.mnegfeed);
  });

  return (
    <>
      <YTProTable
        className="mb16"
        search={false}
        options={false}
        columns={columns}
        toolBarRender={false}
        dataSource={dataSource}
        scroll={{ y: 'auto' }}
      />
    </>
  );
};

export default memo(PowerSwitch);
