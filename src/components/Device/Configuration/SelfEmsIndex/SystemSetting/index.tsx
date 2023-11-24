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
import ConfigModal from '../ConfigModal';
import RemoteUpgrade from '../../RemoteUpgrade';
import { DeviceDataType } from '@/services/equipment';
export type StackProps = {
  deviceId: string;
  productId: string;
  realTimeData?: Record<string, any>;
  deviceData: DeviceDataType;
};

const SystemSetting: React.FC<StackProps> = (props) => {
  const { realTimeData, deviceId, productId, deviceData } = props;
  const detailGroup = useMemo<GroupItem[]>(() => {
    const groupItems: GroupItem[] = [
      {
        label: (
          <Detail.Label title="通信参数设置">
            <ConfigModal
              title={'参数设置'}
              deviceId={deviceId}
              productId={productId}
              realTimeData={realTimeData}
              columns={reportColumns}
              serviceId={'report'}
            />
          </Detail.Label>
        ),
        items: reportItems,
      },
    ];
    if (deviceData?.masterSlaveMode != 1) {
      groupItems.unshift({
        label: (
          <Detail.Label title="系统使能设置">
            <ConfigModal
              title={'使能设置'}
              deviceId={deviceId}
              productId={productId}
              realTimeData={realTimeData}
              columns={systemColumns}
              serviceId={'SettingSysEnable'}
            />
          </Detail.Label>
        ),
        items: emsSystemEnabletems,
      });
    }
    return groupItems;
  }, [deviceId, productId, realTimeData, deviceData]);

  return (
    <>
      <div className="px24">
        <Detail.Group
          data={realTimeData}
          items={detailGroup}
          detailProps={{
            colon: false,
            labelStyle: { width: 140 },
            valueStyle: { width: '40%' },
          }}
        />
        <RemoteUpgrade deviceId={deviceId} />
      </div>
    </>
  );
};

export default SystemSetting;
