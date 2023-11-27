/*
 *@Author: aoshilin
 *@Date: 2023-11-03 15:25:48
 *@parms: 自研ems详情-配置--系统化设置
 *@Description:
 */
import React, { useMemo } from 'react';
import Detail from '@/components/Detail';
import type { GroupItem } from '@/components/Detail';
import { emsSystemEnabletems, reportItems, systemColumns, reportColumns } from './config';
import ConfigModal from '../../../ConfigModal';
import RemoteUpgrade from '../../RemoteUpgrade';
import { DeviceDataType } from '@/services/equipment';
import { useAuthority } from '@/hooks';
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
  ]);

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
              columns={reportColumns}
              serviceId={'correctionTime'}
            />
          </Detail.Label>
        ),
        items: reportItems,
      });
    }
    return groupItems;
  }, [deviceId, productId, realTimeData, deviceData, authorityMap]);

  return (
    <>
      <div className="px24">
        {deviceData?.masterSlaveMode != 1 ? (
          <Detail.Group
            data={realTimeData}
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
