/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:31:19
 * @LastEditTime: 2023-11-24 15:26:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\SelfEmsIndex\index.tsx
 */
import React, { useMemo } from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import EnergyManageTab from './EnergyManageTab';
import SystemSetting from './SystemSetting';
import ConverterSetting from './ConverterSetting';
import BatterySetting from './BatterySetting';
import styles from './index.less';
import { useSubscribe } from '@/hooks';
import { OnlineStatusEnum } from '@/utils/dictionary';
import type { DeviceDataType } from '@/services/equipment';
export type ConfigProps = {
  deviceId: string;
  productId: string;
  deviceData: DeviceDataType;
};

const SelfEmsIndex: React.FC<ConfigProps> = (props) => {
  const { deviceId, productId, deviceData } = props;
  const openSubscribe = useMemo(
    () => !!deviceData && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const realTimeData = useSubscribe(deviceId, openSubscribe);
  realTimeData.emsSn = (deviceData.config && JSON.parse(deviceData.config)?.emsSn) || '';
  realTimeData.paramConfigType = deviceData.paramConfigType;

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `系统设置`,
      children: (
        <SystemSetting
          deviceId={deviceId}
          productId={productId}
          realTimeData={realTimeData}
          deviceData={deviceData}
        />
      ),
    },
    {
      key: '2',
      label: `变流器设置`,
      children: (
        <ConverterSetting deviceId={deviceId} productId={productId} realTimeData={realTimeData} />
      ),
    },
    {
      key: '3',
      label: `电池设置`,
      children: (
        <BatterySetting deviceId={deviceId} productId={productId} realTimeData={realTimeData} />
      ),
    },
    {
      key: '4',
      label: `能量管理`,
      children: (
        <EnergyManageTab productId={productId} deviceId={deviceId} realTimeData={realTimeData} />
      ),
    },
  ];

  return (
    <>
      {deviceData?.masterSlaveMode == 1 ? (
        <SystemSetting
          deviceId={deviceId}
          productId={productId}
          realTimeData={realTimeData}
          deviceData={deviceData}
        />
      ) : (
        <Tabs className={styles.tabs} tabBarGutter={34} items={items} />
      )}
    </>
  );
};

export default SelfEmsIndex;
