/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-22 11:29:52
 * @LastEditTime: 2024-03-08 11:39:00
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
import { DataCenter } from '../DataCenter';
import { getPropsFromTree } from '@/utils';

export type DeviceProviderType = {
  deviceId?: string;
  onChange?: () => void;
  deviceTreeData?: DeviceDataType[];
};

const DeviceProvider: React.FC<DeviceProviderType> = memo((props) => {
  const { deviceId, deviceTreeData, onChange, children } = props;

  const dataCenter = new DataCenter();
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

  const refreshDataByRequest = useCallback((params: RefreshRequestParams) => {
    return editSetting({
      serviceId: 'queryParam',
      createBy: 1,
      ...params,
    });
  }, []);

  useEffect(() => {
    if (deviceId) {
      runGetDevice({ deviceId });
    }
  }, [deviceId]);

  useEffect(() => {
    if (deviceTreeData?.length) {
      const ids = getPropsFromTree(deviceTreeData);
      dataCenter.init(ids);
      dataCenter.getModelData(ids, (res) => {
        ids.forEach((id) => {
          const keys = Object.keys(res?.[id] || {});
          const num = Math.ceil(keys.length / 100);
          for (let i = 0; i < num; i++) {
            refreshDataByRequest({
              deviceId: id,
              input: {
                queryList: keys.slice(i * 100, (i + 1) * 100),
              },
            });
          }
        });
      });
    }
  }, [deviceTreeData]);

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
