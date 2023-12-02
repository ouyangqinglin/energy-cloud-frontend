/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:31:19
 * @LastEditTime: 2023-11-29 10:39:52
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
import { useAuthority, useSubscribe } from '@/hooks';
import { OnlineStatusEnum } from '@/utils/dictionary';
import type { DeviceDataType } from '@/services/equipment';
import RemoteUpgrade from '../RemoteUpgrade';
import { AuthorityModeEnum } from '@/hooks/useAuthority';
import Empty from '@/components/Empty';
export type ConfigProps = {
  deviceId: string;
  productId: string;
  deviceData: DeviceDataType;
  realTimeData: Record<string, any>;
};

const SelfEmsIndex: React.FC<ConfigProps> = (props) => {
  const { deviceId, productId, deviceData, realTimeData } = props;
  const { passAuthority, authorityMap } = useAuthority(
    [
      'iot:device:config:systemSetting',
      'iot:device:config:converterSetting',
      'iot:device:config:batterySetting',
      'iot:device:config:energyManage',
    ],
    {
      mode: AuthorityModeEnum.Within,
    },
  );

  const items: TabsProps['items'] = [];

  if (authorityMap.get('iot:device:config:systemSetting')) {
    items.push({
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
    });
  }
  if (authorityMap.get('iot:device:config:converterSetting') && deviceData?.masterSlaveMode != 1) {
    items.push({
      key: '2',
      label: `变流器设置`,
      children: (
        <ConverterSetting deviceId={deviceId} productId={productId} realTimeData={realTimeData} />
      ),
    });
  }
  if (authorityMap.get('iot:device:config:batterySetting') && deviceData?.masterSlaveMode != 1) {
    items.push({
      key: '3',
      label: `电池设置`,
      children: (
        <BatterySetting deviceId={deviceId} productId={productId} realTimeData={realTimeData} />
      ),
    });
  }
  if (authorityMap.get('iot:device:config:energyManage') && deviceData?.masterSlaveMode != 1) {
    items?.push({
      key: '4',
      label: `能量管理`,
      children: (
        <EnergyManageTab productId={productId} deviceId={deviceId} realTimeData={realTimeData} />
      ),
    });
  }

  return (
    <>
      {passAuthority ? <Tabs className={styles.tabs} tabBarGutter={34} items={items} /> : <Empty />}
    </>
  );
};

export default SelfEmsIndex;
