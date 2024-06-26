/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-06-25 15:09:45
 * @LastEditTime: 2024-06-25 16:40:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\Tabs\index.tsx
 */

import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { layoutConfig } from './config';
import { Radio, RadioChangeEvent, Tooltip } from 'antd';
import FullScreen from '@/components/FullScreen';
import { useBoolean } from 'ahooks';
import Workbench from '../workbench';
import Search from '..';

const Tabs: React.FC = () => {
  const contentRef = useRef(null);
  const [grid, setGrid] = useState<number>(1);
  const [isFullScreen, { set }] = useBoolean(false);

  const onLayoutChange = useCallback((e: RadioChangeEvent) => {
    const value = e.target.value;
    setGrid(value);
  }, []);

  const radioButtons = useMemo(() => {
    return layoutConfig.map((item) => {
      return (
        <Tooltip title={item.title} key={item.value}>
          <Radio.Button value={item.value}>{item.icon}</Radio.Button>
        </Tooltip>
      );
    });
  }, []);

  const onFullScreenChange = useCallback((value: boolean) => {
    set(value);
  }, []);

  return (
    <>
      <div ref={contentRef} className="bg-white">
        <div className="tx-right px24 pt12">
          <Radio.Group className="mr12" value={grid} onChange={onLayoutChange}>
            {radioButtons}
          </Radio.Group>
          <FullScreen key="fullScreen" target={contentRef} onChange={onFullScreenChange} />
        </div>
        {grid > 1 ? <Workbench isFullScreen={isFullScreen} grid={grid} /> : <Search />}
      </div>
    </>
  );
};

export default memo(Tabs);
