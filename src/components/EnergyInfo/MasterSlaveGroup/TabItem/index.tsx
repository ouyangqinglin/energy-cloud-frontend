/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-19 14:28:03
 * @LastEditTime: 2024-01-19 14:41:06
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\MasterSlaveGroup\TabItem\index.tsx
 */

import { DeviceDataType } from '@/services/equipment';
import React, { useEffect, useState } from 'react';
import DeviceItemDetail from '../deviceItemDetail';
import GroupItem from '../groupItem';

export type TabItemType = {
  devices?: DeviceDataType[];
};

const TabItem: React.FC<TabItemType> = (props) => {
  const { devices } = props;

  const [showDeviceId, setShowDeviceId] = useState('');

  useEffect(() => {
    if (devices?.length == 1) {
      setShowDeviceId(devices?.[0]?.deviceId || '');
    } else {
      setShowDeviceId('');
    }
  }, [devices]);

  return (
    <>
      {!!showDeviceId ? (
        <DeviceItemDetail
          deviceData={devices?.find?.((obj: any) => obj.deviceId == showDeviceId)}
          allDeviceData={devices}
          changeShowDiv={() => setShowDeviceId('')}
          showBack={(devices?.length ?? 0) > 1}
        />
      ) : (
        <GroupItem data={devices} isShowDeviceDetail={(deviceId) => setShowDeviceId(deviceId)} />
      )}
    </>
  );
};

export default TabItem;
