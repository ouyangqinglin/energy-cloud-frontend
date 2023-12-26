/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-22 11:29:52
 * @LastEditTime: 2023-12-25 17:14:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Context\DeviceProvider.tsx
 */
import { getDeviceInfo } from '@/services/equipment';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useRequest } from 'umi';
import DeviceContext from './DeviceContext';
import { useSubscribe } from '@/hooks';
import { MessageEventType } from '@/utils/connection';
import { merge } from 'lodash';

export type DeviceProviderType = {
  deviceId?: string;
  onChange?: () => void;
};

const DeviceProvider: React.FC<DeviceProviderType> = memo((props) => {
  const { deviceId, onChange, children } = props;

  const realTimeNetwork = useSubscribe(deviceId, true, MessageEventType.NETWORKSTSTUS);

  const realTimeAlarmData = useSubscribe(deviceId, true, MessageEventType.DEVICE_EVENT_DATA);

  const {
    data: deviceData,
    loading,
    run: runGetDevice,
  } = useRequest(getDeviceInfo, {
    manual: true,
  });

  const realTImeDeviceData = useMemo(() => {
    return merge(
      {},
      deviceData,
      {
        networkStatus: deviceData?.status,
      },
      realTimeNetwork,
    );
  }, [deviceData, realTimeNetwork]);

  const updateData = useCallback(() => {
    onChange?.();
    runGetDevice({ deviceId });
  }, [deviceId, onChange]);

  useEffect(() => {
    if (deviceId) {
      runGetDevice({ deviceId });
    }
  }, [deviceId]);

  return (
    <>
      <DeviceContext.Provider
        value={{
          data: realTImeDeviceData,
          updateData: updateData,
          loading,
        }}
      >
        {children}
      </DeviceContext.Provider>
    </>
  );
});

export default DeviceProvider;
