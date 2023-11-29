/*
 *@Author: aoshilin
 *@Date: 2023-11-03 15:25:48
 *@parms: 自研ems详情-配置--系统化设置
 *@Description:
 */
import React, { useMemo, useCallback } from 'react';
import { useRequest } from 'umi';
import Detail from '@/components/Detail';
import type { GroupItem } from '@/components/Detail';
import {
  emsSystemEnabletems,
  systemTimeColumns,
  systemColumns,
  systemTimeItems,
  communicationColumns,
  communicationItems,
} from './config';
import ConfigModal, { ConfigModalType } from '../../../ConfigModal';
import RemoteUpgrade from '../../RemoteUpgrade';
import { DeviceDataType, getDeviceInfo } from '@/services/equipment';
import { useAuthority } from '@/hooks';
import { parseToObj } from '@/utils';
export type StackProps = {
  deviceId: string;
  productId: string;
  realTimeData?: Record<string, any>;
  deviceData: DeviceDataType;
};

const SystemSetting: React.FC<StackProps> = (props) => {
  const { realTimeData, deviceId, productId, deviceData } = props;

  const { data: communitcationData, run: runGetCommunication } = useRequest(getDeviceInfo, {
    manual: true,
  });

  const { authorityMap } = useAuthority([
    'iot:device:config:systemSetting:systemEnableSetting',
    'iot:device:config:systemSetting:timeSetting',
    'iot:device:config:systemSetting:remoteUpgrade',
    'iot:device:config:systemSetting:communiteParamsSetting',
  ]);

  const realCommunitcationData = useMemo(() => {
    const result = communitcationData || deviceData;
    return {
      emsSn: parseToObj(result?.config || '')?.emsSn,
      paramConfigType: result?.paramConfigType,
    };
  }, [deviceData, communitcationData]);

  const communicationBeforeSubmit = useCallback(
    (formData) => {
      formData.config = JSON.stringify(formData?.input);
      formData.productId = productId;
      formData.paramConfigType = realCommunitcationData?.paramConfigType;
    },
    [productId, realTimeData, realCommunitcationData],
  );

  const onCommunicationSuccess = useCallback(() => {
    runGetCommunication({ deviceId: deviceData?.deviceId });
  }, [deviceData]);

  const detailGroup = useMemo<GroupItem[]>(() => {
    const groupItems: GroupItem[] = [];
    if (authorityMap.get('iot:device:config:systemSetting:systemEnableSetting')) {
      groupItems.push({
        label: (
          <Detail.Label title="系统使能设置">
            <ConfigModal
              title={'使能设置'}
              deviceId={deviceId}
              realTimeData={realTimeData}
              columns={systemColumns}
              serviceId={'SettingSysEnable'}
            />
          </Detail.Label>
        ),
        items: emsSystemEnabletems,
      });
    }
    if (authorityMap.get('iot:device:config:systemSetting:timeSetting')) {
      groupItems.push({
        label: (
          <Detail.Label title="校时设置">
            <ConfigModal
              title={'校时设置'}
              deviceId={deviceId}
              realTimeData={realTimeData}
              columns={systemTimeColumns}
              serviceId={'correctionTime'}
            />
          </Detail.Label>
        ),
        items: systemTimeItems,
      });
    }
    if (authorityMap.get('iot:device:config:systemSetting:communiteParamsSetting')) {
      groupItems.push({
        label: (
          <Detail.Label title="通信参数设置">
            <ConfigModal
              title={'参数设置'}
              deviceId={deviceId}
              realTimeData={realCommunitcationData}
              columns={communicationColumns}
              serviceId={'report'}
              beforeSubmit={communicationBeforeSubmit}
              onSuccess={onCommunicationSuccess}
            />
          </Detail.Label>
        ),
        items: communicationItems,
      });
    }
    return groupItems;
  }, [deviceId, productId, realTimeData, deviceData, authorityMap, realCommunitcationData]);

  return (
    <>
      <div className="px24">
        {deviceData?.masterSlaveMode != 1 ? (
          <Detail.Group
            data={{ ...realTimeData, ...realCommunitcationData }}
            items={detailGroup}
            detailProps={{
              colon: false,
              labelStyle: { width: 140 },
              valueStyle: { width: '40%' },
            }}
          />
        ) : (
          <></>
        )}
        {authorityMap.get('iot:device:config:systemSetting:remoteUpgrade') ? (
          <RemoteUpgrade deviceId={deviceId} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SystemSetting;
