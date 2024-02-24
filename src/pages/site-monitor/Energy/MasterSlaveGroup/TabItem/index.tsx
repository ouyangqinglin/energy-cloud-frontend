/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-19 14:28:03
 * @LastEditTime: 2024-02-22 16:47:21
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\MasterSlaveGroup\TabItem\index.tsx
 */

import { DeviceDataType } from '@/services/equipment';
import React, { memo, useCallback, useEffect, useState } from 'react';
import DeviceItemDetail from '../deviceItemDetail';
import GroupItem from '../groupItem';

export type TabItemType = {
  devices?: DeviceDataType[];
  onDeviceChange?: (deviceId?: string) => void;
};

const TabItem: React.FC<TabItemType> = (props) => {
  const { devices, onDeviceChange } = props;

  const [showDeviceId, setShowDeviceId] = useState('');

  const onDeviceShowChange = useCallback(
    (deviceId) => {
      setShowDeviceId(deviceId);
    },
    [devices],
  );

  useEffect(() => {
    onDeviceChange?.(showDeviceId || devices?.[0]?.deviceId);
  }, [showDeviceId, onDeviceChange]);

  useEffect(() => {
    if (devices?.length == 1) {
      setShowDeviceId(devices?.[0]?.deviceId || '');
    } else {
      setShowDeviceId('');
    }
  }, [devices, onDeviceChange]);

  return (
    <>
      {!!showDeviceId ? (
        <DeviceItemDetail
          deviceData={devices?.find?.((obj: any) => obj.deviceId == showDeviceId)}
          allDeviceData={devices}
          changeShowDiv={onDeviceShowChange}
          showBack={(devices?.length ?? 0) > 1}
        />
      ) : (
        <GroupItem data={devices} isShowDeviceDetail={onDeviceShowChange} />
      )}
    </>
  );
};

export default memo(TabItem);
