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
import { emsSystemEnabletems, systemTimeColumns, systemColumns, systemTimeItems } from './config';
import ConfigModal, { ConfigModalType } from '../../../ConfigModal';
import RemoteUpgrade from '../../RemoteUpgrade';
import { DeviceDataType, getDeviceInfo } from '@/services/equipment';
import { useAuthority } from '@/hooks';
import { parseToObj, formatMessage } from '@/utils';
export type StackProps = {
  deviceId: string;
  productId: string;
  realTimeData?: Record<string, any>;
  deviceData: DeviceDataType;
};

const SystemSetting: React.FC<StackProps> = (props) => {
  const { realTimeData, deviceId, productId, deviceData } = props;

  const { authorityMap } = useAuthority([
    'iot:device:config:systemSetting:systemEnableSetting',
    'iot:device:config:systemSetting:timeSetting',
    'iot:device:config:systemSetting:remoteUpgrade',
    'iot:device:config:systemSetting:communiteParamsSetting',
  ]);

  const detailGroup = useMemo<GroupItem[]>(() => {
    const groupItems: GroupItem[] = [];
    if (authorityMap.get('iot:device:config:systemSetting:systemEnableSetting')) {
      groupItems.push({
        label: (
          <Detail.Label
            title={formatMessage({
              id: 'device.systemEnablingSettings',
              defaultMessage: '系统使能设置',
            })}
          >
            <ConfigModal
              title={formatMessage({
                id: 'device.systemEnablingSettings',
                defaultMessage: '系统使能设置',
              })}
              deviceId={deviceId}
              deviceData={deviceData}
              realTimeData={realTimeData}
              columns={systemColumns}
              serviceId={'SettingSysEnable'}
              authority="iot:device:config:systemSetting:systemEnableSetting:distribute"
            />
          </Detail.Label>
        ),
        items: emsSystemEnabletems,
      });
    }
    if (authorityMap.get('iot:device:config:systemSetting:timeSetting')) {
      groupItems.push({
        label: (
          <Detail.Label
            title={formatMessage({
              id: 'device.timeSetting',
              defaultMessage: '校时设置',
            })}
          >
            <ConfigModal
              title={formatMessage({
                id: 'device.timeSetting',
                defaultMessage: '校时设置',
              })}
              deviceId={deviceId}
              deviceData={deviceData}
              realTimeData={realTimeData}
              columns={systemTimeColumns}
              serviceId={'correctionTime'}
              authority="iot:device:config:systemSetting:timeSetting:distribute"
            />
          </Detail.Label>
        ),
        items: systemTimeItems,
      });
    }
    return groupItems;
  }, [deviceId, productId, realTimeData, deviceData, authorityMap]);

  return (
    <>
      <div className="px24">
        {deviceData?.masterSlaveMode != 1 ? (
          <Detail.Group
            data={{ ...realTimeData }}
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
          <RemoteUpgrade deviceId={deviceId} deviceData={deviceData} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SystemSetting;
