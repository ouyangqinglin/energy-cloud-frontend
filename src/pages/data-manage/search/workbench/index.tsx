/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-10 15:23:23
 * @LastEditTime: 2023-10-19 13:50:28
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\workbench\index.tsx
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Radio, Tooltip, Spin, RadioChangeEvent } from 'antd';
import { useRequest } from 'umi';
import SchemaForm from '@/components/SchemaForm';
import { CollectionDataType, SearchType } from './typing';
import { column, layoutConfig } from './helper';
import { WorkbenchDataType, getWorkbenchConfig, updateWorkbenchConfig } from './service';
import styles from './index.less';
import Split from 'react-split-grid';
import { merge } from 'lodash';
import Chart from './chart';
import moment from 'moment';
import { ProConfigProvider } from '@ant-design/pro-components';
import { tableTreeSelectValueTypeMap } from '@/components/TableSelect';
import FullScreen from '../../../../components/FullScreen';
import { useBoolean } from 'ahooks';
import { formatMessage } from '@/utils';

type WorkbenchType = {
  isFullScreen?: boolean;
  grid: number;
};

const layoutGridMap = new Map([
  [2, { row: 2, col: 1 }],
  [4, { row: 2, col: 2 }],
]);

const Workbench: React.FC<WorkbenchType> = (props) => {
  const { isFullScreen, grid: layoutValue } = props;

  const getSplitItem = useCallback(
    (getGutterProps) => {
      const grid = layoutGridMap.get(layoutValue);
      const rows = Array.from({ length: (grid?.col || 2) - 1 }).map((_, index) => {
        return (
          <div
            key={index}
            className={`${styles.gutterCol} ${styles['gutterCol' + ((index + 1) * 2 - 1)]}`}
            {...getGutterProps('column', (index + 1) * 2 - 1)}
          />
        );
      });
      const cols = Array.from({ length: (grid?.row || 2) - 1 }).map((_, index) => {
        return (
          <div
            key={index}
            className={`${styles.gutterRow} ${styles['gutterRow' + ((index + 1) * 2 - 1)]}`}
            {...getGutterProps('row', (index + 1) * 2 - 1)}
          />
        );
      });
      const contents = Array.from({ length: layoutValue }).map((_, index) => {
        return (
          <div className={styles.content} key={index}>
            <Chart />
          </div>
        );
      });
      return (
        <>
          {rows}
          {cols}
          {contents}
        </>
      );
    },
    [layoutValue],
  );

  const gridProps = useMemo<Record<string, React.CSSProperties>>(() => {
    const grid = layoutGridMap.get(layoutValue);
    return {
      style: {
        gridTemplateRows: Array.from({ length: grid?.row || 2 })
          .fill('1fr')
          .join(' 10px '),
        gridTemplateColumns: Array.from({ length: grid?.col || 2 })
          .fill('1fr')
          .join(' 10px '),
      },
    };
  }, [layoutValue]);

  return (
    <>
      <div className="p24 bg-white">
        <ProConfigProvider valueTypeMap={{ ...tableTreeSelectValueTypeMap }}>
          <Split
            render={({ getGridProps, getGutterProps }) => {
              const splitProps = getGridProps();
              const resultProps = merge({}, gridProps, splitProps);
              if (layoutValue != 9) {
                resultProps.style.gridTemplateRows = resultProps.style.gridTemplateRows
                  .split(' ')
                  .slice(0, 3)
                  .join(' ');
              }
              return (
                <div
                  className={`${styles.grid} ${isFullScreen ? styles.fullScreen : ''}`}
                  {...resultProps}
                >
                  {getSplitItem(getGutterProps)}
                </div>
              );
            }}
          />
        </ProConfigProvider>
      </div>
    </>
  );
};

export default Workbench;
