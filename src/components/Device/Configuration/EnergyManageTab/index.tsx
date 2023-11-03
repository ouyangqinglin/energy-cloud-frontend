import React, { useMemo } from 'react';
import { isEmpty } from '@/utils';
import { DeviceTypeEnum } from '@/utils/dictionary';
import Detail from '@/components/Detail';
import type { GroupItem } from '@/components/Detail';
import { manaulParamsItems, backupModeItems, peakTimeItems } from './config';

export type ConfigProps = {
  deviceId: string;
  productId: string;
  realTimeData?: Record<string, any>;
};
const remoteSettingType = [DeviceTypeEnum.Ems, DeviceTypeEnum.BWattAir];

const ConfigurationTab: React.FC<ConfigProps> = (props) => {
  const { realTimeData, deviceId } = props;
  const manaulModeSetting = useMemo<GroupItem[]>(() => {
    return [
      {
        label: <Detail.Label title="手动模式设置">按钮位置</Detail.Label>,
        items: manaulParamsItems,
      },
    ];
  }, []);
  const backupModeSetting = useMemo<GroupItem[]>(() => {
    return [
      {
        label: <Detail.Label title="备电模式设置">按钮位置</Detail.Label>,
        items: backupModeItems,
      },
      {
        label: <Detail.Label title="尖峰平谷时段设置" />,
        items: peakTimeItems,
      },
    ];
  }, []);
  return (
    <>
      <div className="px24">
        <Detail.Group
          data={realTimeData}
          items={manaulModeSetting}
          detailProps={{
            colon: false,
            labelStyle: { width: 140 },
            valueStyle: { width: '40%' },
          }}
        />
        <div>
          <Detail.Label title="削峰填谷模式设置">按钮位置</Detail.Label>
        </div>
        <Detail.Group
          data={realTimeData}
          items={backupModeSetting}
          detailProps={{
            colon: false,
            labelStyle: { width: 140 },
            valueStyle: { width: '40%' },
          }}
        />
      </div>
    </>
  );
};

export default ConfigurationTab;
