/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-08-14 10:27:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Device\index.tsx
 */
import React, { useState, useCallback, useMemo } from 'react';
import { DeviceDetailType } from '../config';
import { Spin, Tabs, TabsProps } from 'antd';
import Overview from '@/components/DeviceInfo/Overview';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceDataType } from '@/services/equipment';
import Page from '@/layouts/Page';
import Community from '@/components/ScreenDialog/Community';
import useDeviceModel from '../useDeviceModel';
import { useSubscribe } from '@/hooks';
import { deviceProductDataMap } from './config';
import { OnlineStatusEnum } from '@/utils/dictionary';
import styles from './index.less';
import Run from './Run';
import Control from './Control';

const Device: React.FC<DeviceDetailType> = (props) => {
  const { id, productId, onChange } = props;

  const [deviceData, setDeviceData] = useState<DeviceDataType>();
  const openSubscribe = useMemo(
    () => !!deviceData && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const realTimeData = useSubscribe(id, openSubscribe);
  const { data: deviceGroupData, loading, modelMap } = useDeviceModel({ productId, isGroup: true });
  const [activeTab, setActiveTab] = useState<string>('run');

  const onDataChange = useCallback(
    (value: DeviceDataType) => {
      setDeviceData({ ...(value || {}), productImg: deviceProductDataMap[productId]?.img });
      onChange?.(value);
    },
    [productId],
  );

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
      <Page
        className={styles.page}
        top={<Overview data={deviceData} introImg={deviceProductDataMap[productId]?.introImg} />}
        bottom={<DeviceInfo id={id} onChange={onDataChange} />}
      >
        {loading ? (
          <div className="tx-center my24">
            <Spin />
          </div>
        ) : (
          <>
            {deviceGroupData?.services?.length ? (
              <Tabs items={tabItems} onChange={onTabChange} />
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
              <Control deviceId={id} groupData={deviceGroupData} />
            )}
          </>
        )}
      </Page>
    </>
  );
};

export default Device;
