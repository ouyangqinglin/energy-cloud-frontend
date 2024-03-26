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
import FullScreen from './FullScreen';
import { useBoolean } from 'ahooks';
import { formatMessage } from '@/utils';

const layoutGridMap = new Map([
  [4, { row: 2, col: 2 }],
  [6, { row: 2, col: 3 }],
  [9, { row: 3, col: 3 }],
]);

const Workbench: React.FC = () => {
  const contentRef = useRef(null);
  const [layoutDataMap, setLayoutDataMap] = useState<Map<number, WorkbenchDataType>>();
  const [layoutValue, setLayoutValue] = useState<number>(4);
  const [isFullScreen, { set }] = useBoolean(false);
  const [date, setDate] = useState<string[]>([
    moment().format('YYYY-MM-DD'),
    moment().format('YYYY-MM-DD'),
  ]);
  const { loading } = useRequest(getWorkbenchConfig, {
    formatResult: (res) => {
      const map = new Map<number, WorkbenchDataType>();
      res?.data?.forEach?.((item) => {
        map.set(item.layout ?? 0, item);
      });
      setLayoutDataMap(map);
      return map;
    },
  });

  const onLayoutChange = useCallback(
    (e: RadioChangeEvent) => {
      const value = e.target.value;
      const map = new Map<number, WorkbenchDataType>();
      for (let i = 0; i < value; i++) {
        map.set(i, layoutDataMap?.get?.(i) || { layout: i });
      }
      setLayoutDataMap(map);
      setLayoutValue(value);
      updateWorkbenchConfig(Array.from(map.values()));
    },
    [layoutDataMap],
  );

  const onValuesChange = useCallback((_, values) => {
    setDate(values['date']);
  }, []);

  const onCollectionChange = useCallback(
    (index: number, value: CollectionDataType) => {
      const result: WorkbenchDataType = { layout: index };
      if (value) {
        result.siteId = value?.tree?.siteId;
        result.siteName = value?.tree?.siteName;
        result.deviceId = value?.tree?.id;
        result.deviceName = value?.tree?.deviceName;
        result.productId = value?.tree?.productId;
        result.collectionCode = value?.paramCode;
        result.collectionName = value?.paramName;
      }
      layoutDataMap?.set?.(index, result);
      setLayoutDataMap(layoutDataMap);
      updateWorkbenchConfig(Array.from(layoutDataMap?.values?.() || { length: 0 }));
    },
    [layoutDataMap],
  );

  const onFullScreenChange = useCallback((value: boolean) => {
    set(value);
  }, []);

  useEffect(() => {
    if (layoutDataMap?.size) {
      setLayoutValue(layoutGridMap.has(layoutDataMap?.size) ? layoutDataMap?.size : 4);
    }
  }, [layoutDataMap]);

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
        const layoutData = layoutDataMap?.get?.(index);
        return (
          <div className={styles.content} key={index}>
            <Chart
              date={date}
              siteId={layoutData?.siteId}
              siteName={layoutData?.siteName}
              deviceId={layoutData?.deviceId}
              deviceName={layoutData?.deviceName}
              collection={layoutData?.collectionCode}
              collectionName={layoutData?.collectionName}
              productId={layoutData?.productId}
              onChange={(value) => onCollectionChange(index, value)}
            />
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
    [layoutValue, layoutDataMap, date, onCollectionChange],
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

  const radioButtons = useMemo(() => {
    return layoutConfig.map((item) => {
      return (
        <Tooltip title={item.title} key={item.value}>
          <Radio.Button value={item.value}>{item.icon}</Radio.Button>
        </Tooltip>
      );
    });
  }, []);

  return (
    <>
      <div ref={contentRef} className="p24 bg-white">
        <div className="flex page-label mr12 mt2 mb0 float">
          {formatMessage({ id: 'siteMonitor.deviceMonitor', defaultMessage: '设备监控' })}
        </div>
        <SchemaForm<SearchType>
          className="p0 mb24"
          columns={column}
          layout="inline"
          layoutType="QueryFilter"
          submitter={{
            render: () => [
              <Radio.Group value={layoutValue} onChange={onLayoutChange}>
                {radioButtons}
              </Radio.Group>,
              <FullScreen
                className={styles.screenIcon}
                key="fullScreen"
                target={contentRef}
                onChange={onFullScreenChange}
              />,
            ],
          }}
          onValuesChange={onValuesChange}
        />
        {loading ? (
          <div className="mt30 tx-center">
            <Spin />
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default Workbench;
