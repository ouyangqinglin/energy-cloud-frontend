import { useCallback, useRef, useState } from 'react';
import type { ElectricGenerateInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { getElectricGenerateUnitList } from './service';
import EnergyStatisticCard from './components/StatisticCard';

const Energy = () => {
  const requestList: YTProTableCustomProps<
    ElectricGenerateInfo,
    ElectricGenerateInfo
  >['request'] = (params) => {
    return getElectricGenerateUnitList(params);
  };
  return (
    <>
      <YTProTable<ElectricGenerateInfo, ElectricGenerateInfo>
        columns={columns}
        toolBarRender={() => []}
        headerTitle={<EnergyStatisticCard />}
        request={requestList}
        rowKey="deviceId"
      />
    </>
  );
};

export default Energy;
