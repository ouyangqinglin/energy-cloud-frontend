/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-10 15:23:23
 * @LastEditTime: 2024-08-19 17:27:04
 * @LastEditors: YangJianFei
 * @FilePath: /energy-cloud-frontend/src/pages/data-manage/search/workbench/index.tsx
 */
import React, { useMemo, useRef } from 'react';
import Chart from './chart';
import { ProConfigProvider } from '@ant-design/pro-components';
import { tableTreeSelectValueTypeMap } from '@/components/TableSelect';
import { useSize } from 'ahooks';
import { DeviceDataType } from '@/services/equipment';

type WorkbenchType = {
  isFullScreen?: boolean;
  isDeviceChild?: boolean;
  deviceData?: DeviceDataType;
  grid: number;
  height?: number;
};

const Workbench: React.FC<WorkbenchType> = (props) => {
  const { isFullScreen, grid: layoutValue, isDeviceChild, deviceData, height = 911 } = props;

  const divRef = useRef<HTMLDivElement>(null);

  const divSize = useSize(divRef);

  const charts = useMemo(() => {
    const chartHeight = (height - 104 - (layoutValue > 1 ? 2 : 1) * 12) / (layoutValue > 1 ? 2 : 1);
    return Array.from({ length: layoutValue }).map((_, index) => {
      return <Chart deviceData={deviceData} isDeviceChild={isDeviceChild} key={index} width={divSize?.width || 1637} height={chartHeight} />;
    });
  }, [layoutValue, divSize, height, deviceData]);

  return (
    <>
      <div className="p24 bg-white">
        <div ref={divRef} />
        <ProConfigProvider valueTypeMap={{ ...tableTreeSelectValueTypeMap }}>
          {charts}
        </ProConfigProvider>
      </div>
    </>
  );
};

export default Workbench;
