/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-06-25 15:09:45
 * @LastEditTime: 2024-08-19 19:01:18
 * @LastEditors: YangJianFei
 * @FilePath: /energy-cloud-frontend/src/pages/data-manage/search/Tabs/index.tsx
 */

import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { layoutConfig } from './config';
import { Radio, RadioChangeEvent, Tooltip } from 'antd';
import FullScreen from '@/components/FullScreen';
import { useBoolean, useSize } from 'ahooks';
import Workbench from '../workbench';
import { formatMessage, isEmpty } from '@/utils';
import Detail from '@/components/Detail';
import { DeviceDataType } from '@/services/equipment';

type TabsType = {
  isDeviceChild?: boolean;
  deviceData?: DeviceDataType;
};

const Tabs: React.FC<TabsType> = (props) => {
  const { isDeviceChild, deviceData } = props;

  const contentRef = useRef(null);
  const [grid, setGrid] = useState<number>(1);
  const [isFullScreen, { set }] = useBoolean(false);
  const contentSize = useSize(contentRef);

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
      <div ref={contentRef} className="bg-white h-full">
        <div className="px24 pt24">
          <Detail.Label
            title={formatMessage({
              id: 'dataManage.samplingDetail',
              defaultMessage: '采样明细',
            })}
            bold={false}
            showLine={false}
          >
            <Radio.Group
              className="mr12"
              value={grid}
              onChange={onLayoutChange}
              buttonStyle="solid"
            >
              {radioButtons}
            </Radio.Group>
            <FullScreen key="fullScreen" target={contentRef} onChange={onFullScreenChange} />
          </Detail.Label>
        </div>
        {!isEmpty(contentSize?.height) && (
          <Workbench
            isDeviceChild={isDeviceChild}
            deviceData={deviceData}
            key={1}
            isFullScreen={isFullScreen}
            grid={grid}
            height={contentSize?.height}
          />
        )}
      </div>
    </>
  );
};

export default memo(Tabs);
