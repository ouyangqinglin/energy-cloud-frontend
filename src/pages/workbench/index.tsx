/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-10 15:23:23
 * @LastEditTime: 2023-10-16 16:39:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\workbench\index.tsx
 */
import React, { useCallback, useMemo } from 'react';
import { Radio, Tooltip, Spin } from 'antd';
import { useRequest } from 'umi';
import SchemaForm from '@/components/SchemaForm';
import { SearchType } from './typing';
import { column } from './helper';
import { YTCellFourOutlined, YTCellNineOutlined, YTCellSixOutlined } from '@/components/YTIcons';
import { getWorkbenchConfig } from './service';
import styles from './index.less';

const layoutGridMap = new Map([
  [4, { row: 2, col: 2 }],
  [6, { row: 3, col: 2 }],
  [7, { row: 3, col: 3 }],
]);

const Workbench: React.FC = () => {
  const { data: configData, loading } = useRequest(getWorkbenchConfig);

  const layoutValue = useMemo(() => {
    return layoutGridMap.has(configData?.length || 0) ? configData?.length || 4 : 4;
  }, [configData]);

  const getSplitItem = useCallback(() => {
    const grid = layoutGridMap.get(layoutValue);
    const rows = Array.from({ length: (grid?.row || 2) - 1 }).map((_, index) => {
      return <div className={`${styles.gutterCol} gutter-col-${(index + 1) * 2 - 1}`} />;
    });
    const cols = Array.from({ length: (grid?.col || 2) - 1 }).map((_, index) => {
      return <div className={`${styles.gutterRow} gutter-row-${(index + 1) * 2 - 1}`} />;
    });
    const contents = Array.from({ length: layoutValue }).fill(<div className={styles.content} />);
    return (
      <>
        {rows}
        {cols}
        {contents}
      </>
    );
  }, [layoutValue]);

  const gridStyles = useMemo<React.CSSProperties>(() => {
    const grid = layoutGridMap.get(layoutValue);
    return {
      gridTemplateRows: Array.from({ length: grid?.row || 2 })
        .fill('1fr')
        .join(' 10px '),
      gridTemplateColumns: Array.from({ length: grid?.col || 2 })
        .fill('1fr')
        .join(' 10px '),
    };
  }, [layoutValue]);

  return (
    <>
      <div className="p24">
        <div className="flex page-label mr12 mt2 mb0 float">设备监控</div>
        <SchemaForm<SearchType>
          className="p0 mb24"
          columns={column}
          layout="inline"
          layoutType="QueryFilter"
          submitter={{
            render: () => [
              <Radio.Group value={layoutValue}>
                <Tooltip title="四宫格">
                  <Radio.Button value={4}>
                    <YTCellFourOutlined />
                  </Radio.Button>
                </Tooltip>
                <Tooltip title="六宫格">
                  <Radio.Button value={6}>
                    <YTCellSixOutlined />
                  </Radio.Button>
                </Tooltip>
                <Tooltip title="九宫格">
                  <Radio.Button value={9}>
                    <YTCellNineOutlined />
                  </Radio.Button>
                </Tooltip>
              </Radio.Group>,
            ],
          }}
        />
        <div className={styles.grid} style={gridStyles}>
          {loading ? (
            <div className="flex flex-center h-full">
              <Spin />
            </div>
          ) : (
            getSplitItem()
          )}
        </div>
      </div>
    </>
  );
};

export default Workbench;
