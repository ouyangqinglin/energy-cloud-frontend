/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:31:19
 * @LastEditTime: 2023-07-04 10:04:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\alarm\index.tsx
 */
import React, { useMemo } from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import ConfigurationTab from './ConfigurationTab';
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

const Index: React.FC<ConfigProps> = (props) => {
  const { deviceId, productId, deviceData } = props;
  const openSubscribe = useMemo(
    () => !!deviceData && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  let realTimeData = useSubscribe(deviceId, openSubscribe);
  // mock
  realTimeData = {
    SysEnableSelfStartFunction: 0,
    MunicipalChargingFunctionEnabled: 1,
    EnableOffGridOperationFunction: 0,
    EnableGridConnectionFunction: 1,
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `系统设置`,
      children: (
        <SystemSetting deviceId={deviceId} productId={productId} realTimeData={realTimeData} />
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
      children: <ConfigurationTab deviceData={deviceData} />,
    },
  ];

  return <Tabs className={styles.tabs} tabBarGutter={34} items={items} />;
};

export default Index;
