/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-22 11:29:52
 * @LastEditTime: 2023-12-22 11:30:05
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\DeviceProvide.tsx
 */
import { getDeviceInfo } from '@/services/equipment';
import React, { memo, useCallback, useEffect } from 'react';
import { useRequest } from 'umi';
import DeviceContext from './DeviceContext';

export type DeviceProviderType = {
  deviceId?: string;
  onChange?: () => void;
};

const DeviceProvider: React.FC<DeviceProviderType> = memo((props) => {
  const { deviceId, onChange, children } = props;

  const {
    data: deviceData,
    loading,
    run: runGetDevice,
  } = useRequest(getDeviceInfo, {
    manual: true,
  });

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
          data: deviceData,
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
