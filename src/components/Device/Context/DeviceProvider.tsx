/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-22 11:29:52
 * @LastEditTime: 2024-05-13 16:35:23
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Context\DeviceProvider.tsx
 */
import { DeviceDataType, editSetting, getDeviceInfo } from '@/services/equipment';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useRequest } from 'umi';
import DeviceContext, { RefreshRequestParams } from './DeviceContext';
import { useSubscribe } from '@/hooks';
import { MessageEventType } from '@/utils/connection';
import { merge } from 'lodash';

export type DeviceProviderType = {
  deviceId?: string;
  onChange?: () => void;
  deviceTreeData?: DeviceDataType[];
};

const DeviceProvider: React.FC<DeviceProviderType> = memo((props) => {
  const { deviceId, deviceTreeData, onChange, children } = props;

  const realTimeNetwork = useSubscribe(deviceId, true, MessageEventType.NETWORKSTSTUS);
  const realTimeAlarmData = useSubscribe(deviceId, true, MessageEventType.DeviceAlarm);

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

  const refreshDataByRequest = useCallback((params: RefreshRequestParams, showMessage) => {
    return editSetting(
      {
        serviceId: 'queryParam',
        createBy: 1,
        ...params,
      },
      showMessage,
    );
  }, []);

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
          loading,
          updateData: updateData,
          refreshDataByRequest: refreshDataByRequest,
        }}
      >
        {children}
      </DeviceContext.Provider>
    </>
  );
});

export default DeviceProvider;
