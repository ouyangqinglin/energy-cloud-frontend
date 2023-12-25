/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:34:31
 * @LastEditTime: 2023-12-12 09:35:48
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Device\index.tsx
 */
import React, { useCallback, useMemo, useState } from 'react';
import { DeviceRealTimeType } from '../config';
import { Spin, Tabs, TabsProps } from 'antd';
import Run from './Run';
import { default as OldControl } from './Control';
import useDeviceModel from '../useDeviceModel';
import { useSubscribe } from '@/hooks';
import { DeviceServicePageEnum, DeviceTypeEnum } from '@/utils/dictionary';
import styles from './index.less';
import Control from '@/components/Device/Control';
import { formatMessage } from '@/utils';

const oldControlProductIds: DeviceTypeEnum[] = [DeviceTypeEnum.Cabinet, DeviceTypeEnum.BWattAir];

const Device: React.FC<DeviceRealTimeType> = (props) => {
  const { deviceData, showRemoteControl } = props;

  const realTimeData = useSubscribe(deviceData?.deviceId, true);
  const {
    data: deviceGroupData,
    serviceGruop,
    loading,
    modelMap,
  } = useDeviceModel({
    productId: deviceData?.productId,
    isGroup: true,
    page: DeviceServicePageEnum.RemoteControl,
  });
  const [activeTab, setActiveTab] = useState<string>('run');

  const onTabChange = useCallback((key) => {
    setActiveTab(key);
  }, []);

  const showTab = useMemo<boolean>(() => {
    if (
      (oldControlProductIds.includes(deviceData?.productId as DeviceTypeEnum)
        ? deviceGroupData?.services?.length
        : serviceGruop?.length) &&
      (deviceData?.productId != (DeviceTypeEnum.YTEnergyAir as any) ||
        deviceData?.masterSlaveMode != 1) &&
      showRemoteControl
    ) {
      return true;
    } else {
      return false;
    }
  }, [deviceData, deviceGroupData, serviceGruop]);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: 'run',
        label: formatMessage({ id: 'siteMonitor.operatingData', defaultMessage: '运行数据' }),
      },
      {
        key: 'control',
        label: formatMessage({ id: 'siteMonitor.remoteControl', defaultMessage: '远程控制' }),
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
          {showTab ? (
            <Tabs className={styles.tabs} items={tabItems} onChange={onTabChange} />
          ) : (
            <></>
          )}
          {activeTab == 'run' ? (
            <Run
              deviceId={deviceData?.deviceId}
              realTimeData={realTimeData}
              groupData={deviceGroupData}
              modelMap={modelMap}
            />
          ) : oldControlProductIds.includes(deviceData?.productId as DeviceTypeEnum) ? (
            <OldControl
              deviceId={deviceData?.deviceId}
              deviceData={deviceData}
              groupData={deviceGroupData}
              realTimeData={realTimeData}
            />
          ) : (
            <Control
              deviceId={deviceData?.deviceId}
              deviceData={deviceData}
              groupData={serviceGruop}
              realTimeData={realTimeData}
            />
          )}
        </>
      )}
    </>
  );
};

export default Device;
