/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-10 15:23:23
 * @LastEditTime: 2024-07-23 15:34:44
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\workbench\index.tsx
 */
import React, { useMemo, useRef } from 'react';
import Chart from './chart';
import { ProConfigProvider } from '@ant-design/pro-components';
import { tableTreeSelectValueTypeMap } from '@/components/TableSelect';
import { useSize } from 'ahooks';

type WorkbenchType = {
  isFullScreen?: boolean;
  grid: number;
  height: number;
};

const Workbench: React.FC<WorkbenchType> = (props) => {
  const { isFullScreen, grid: layoutValue, height } = props;

  const divRef = useRef<HTMLDivElement>(null);

  const divSize = useSize(divRef);

  const charts = useMemo(() => {
    const chartHeight = (height - 104 - layoutValue * 12) / layoutValue;
    return (
      divSize?.width &&
      Array.from({ length: layoutValue }).map((_, index) => {
        return <Chart key={index} width={divSize.width} height={chartHeight} />;
      })
    );
  }, [layoutValue, divSize, height]);

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
