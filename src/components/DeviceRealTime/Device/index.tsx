/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:34:31
 * @LastEditTime: 2023-09-11 19:13:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Device\index.tsx
 */
import React, { useCallback, useMemo, useState } from 'react';
import { DeviceRealTimeType } from '../config';
import { Spin, Tabs, TabsProps } from 'antd';
import Run from './Run';
import Control from './Control';
import useDeviceModel from '../useDeviceModel';
import { useSubscribe } from '@/hooks';
import { OnlineStatusEnum } from '@/utils/dictionary';
import styles from './index.less';

const Device: React.FC<DeviceRealTimeType> = (props) => {
  const { id, productId, deviceData } = props;

  const openSubscribe = useMemo(
    () => !!deviceData && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const realTimeData = useSubscribe(id, openSubscribe);
  const { data: deviceGroupData, loading, modelMap } = useDeviceModel({ productId, isGroup: true });
  const [activeTab, setActiveTab] = useState<string>('run');

  const onTabChange = useCallback((key) => {
    setActiveTab(key);
  }, []);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: 'run',
        label: '运行数据',
      },
      {
        key: 'control',
        label: '远程控制',
      },
    ];
  }, []);

  return (
    <>
      {loading ? (
        <div className="tx-center my24">
          <Spin />
        </div>
      ) : (
        <>
          {deviceGroupData?.services?.length ? (
            <Tabs className={styles.tabs} items={tabItems} onChange={onTabChange} />
          ) : (
            <></>
          )}
          {activeTab == 'run' ? (
            <Run
              deviceId={id}
              realTimeData={realTimeData}
              groupData={deviceGroupData}
              modelMap={modelMap}
            />
          ) : (
            <Control deviceId={id} groupData={deviceGroupData} realTimeData={realTimeData} />
          )}
        </>
      )}
    </>
  );
};

export default Device;
