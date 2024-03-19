/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-22 11:29:52
 * @LastEditTime: 2024-03-14 17:00:21
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
import { DeviceModelDescribeTypeEnum, getPropsFromTree } from '@/utils';
import { DeviceProductTypeEnum, DeviceTypeEnum } from '@/utils/dictionary';
import { DeviceModelDescribeType } from '@/types/device';

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

  useEffect(() => {
    if (
      deviceTreeData?.length &&
      deviceTreeData?.[0]?.productTypeId == DeviceProductTypeEnum.DCChargePile &&
      (deviceTreeData?.[0]?.productId as any) >= DeviceTypeEnum.ChargeY602
    ) {
      const ids = getPropsFromTree(deviceTreeData);
      dataCenter.init(ids);

      const refresh = (keys: string[], id: string, serviceId?: string) => {
        const num = Math.ceil(keys.length / 100);
        for (let i = 0; i < num; i++) {
          refreshDataByRequest(
            {
              deviceId: id,
              input: {
                queryList: keys.slice(i * 100, (i + 1) * 100),
              },
              ...(serviceId ? { serviceId } : {}),
            },
            false,
          );
        }
      };

      dataCenter.getModelData({ ids, isAll: true }, (res) => {
        ids.forEach((id) => {
          const modelChildren = getPropsFromTree<
            DeviceModelDescribeType,
            DeviceModelDescribeType[]
          >(dataCenter.deviceData[id].allGroup, 'children');
          const queryData: Record<string, string[]> = {};
          let allQueryData: string[] = [];
          modelChildren.forEach((child) => {
            child.forEach((item) => {
              if (item.queryId) {
                queryData[item.queryId] = getPropsFromTree(
                  item.children,
                  'id',
                  'children',
                  (propData) => propData.type == DeviceModelDescribeTypeEnum.Property,
                );
                allQueryData = [...allQueryData, ...queryData[item.queryId]];
              }
            });
          });

          const keys = Object.keys(res?.[id] || {}).filter((item) => !allQueryData.includes(item));
          refresh(keys, id);
          Object.keys(queryData).forEach((item) => {
            refresh(queryData[item], id, item);
          });
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
