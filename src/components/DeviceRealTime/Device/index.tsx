/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:34:31
 * @LastEditTime: 2023-12-29 10:43:47
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Device\index.tsx
 */
import React, { useCallback, useMemo, useState } from 'react';
import { DeviceRealTimeType } from '../config';
import { Spin, Tabs, TabsProps } from 'antd';
import { default as OldRun } from './Run';
import { default as OldControl } from './Control';
import useDeviceModel from '../useDeviceModel';
import { useSubscribe } from '@/hooks';
import { DeviceMasterMode, DeviceServicePageEnum, DeviceTypeEnum } from '@/utils/dictionary';
import styles from './index.less';
import Control from '@/components/Device/Control';
import { formatMessage } from '@/utils';
import Run from '@/components/Device/Run';

const oldControlProductIds: DeviceTypeEnum[] = [
  DeviceTypeEnum.ExchangePowerCabinet,
  DeviceTypeEnum.BWattAir,
];

const Device: React.FC<DeviceRealTimeType> = (props) => {
  const { deviceData, showRemoteControl } = props;

  const realTimeData = useSubscribe(deviceData?.deviceId, true);
  const {
    data: deviceGroupData,
    detailGroup,
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
      deviceData?.masterSlaveMode != DeviceMasterMode.Slave &&
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
            <>
              {detailGroup?.length ? (
                <Run
                  deviceData={deviceData}
                  realTimeData={realTimeData}
                  groupData={detailGroup}
                  modelMap={modelMap}
                />
              ) : (
                <OldRun
                  deviceId={deviceData?.deviceId}
                  realTimeData={realTimeData}
                  groupData={deviceGroupData}
                  modelMap={modelMap}
                />
              )}
            </>
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
