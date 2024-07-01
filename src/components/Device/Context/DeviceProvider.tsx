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
import { flatTree } from './helper';

export type DeviceProviderType = {
  deviceId?: string;
  onChange?: () => void;
  deviceTreeData?: DeviceDataType[];
  onSelect?: (data: DeviceDataType) => void;
};

const DeviceProvider: React.FC<DeviceProviderType> = memo((props) => {
  const { deviceId, deviceTreeData, onChange, onSelect, children } = props;

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

  const onTreeSelect = useCallback(
    (value: string) => {
      const treeData = flatTree(deviceTreeData);
      const result = treeData.find((item) => item.deviceId == value);
      if (result) {
        onSelect?.(result);
      }
    },
    [deviceTreeData, onSelect],
  );

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
          onSelect: onTreeSelect,
          refreshDataByRequest: refreshDataByRequest,
          treeData: deviceTreeData,
        }}
      >
        {children}
      </DeviceContext.Provider>
    </>
  );
});

export default DeviceProvider;
