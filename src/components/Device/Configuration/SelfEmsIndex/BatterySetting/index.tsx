/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:36:42
 * @LastEditTime: 2023-09-11 19:12:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Ems\Run\index.tsx
 */
import React, { useMemo } from 'react';
import Detail from '@/components/Detail';
import type { GroupItem } from '@/components/Detail';
import {
  protectParamsItems,
  powerParamsItems,
  protectParamsColumns,
  powerParamsColumns,
} from './config';
import ConfigModal from '../../../ConfigModal';
import { useAuthority } from '@/hooks';

export type StackProps = {
  deviceId: string;
  productId: string;
  realTimeData?: Record<string, any>;
};
const SystemSetting: React.FC<StackProps> = (props) => {
  const { realTimeData, deviceId, productId } = props;

  const { authorityMap } = useAuthority([
    'iot:device:config:batterySetting:batterySystemSetting',
    'iot:device:config:batterySetting:batteryProtectSetting',
  ]);

  const detailGroup = useMemo<GroupItem[]>(() => {
    const result: GroupItem[] = [];
    if (authorityMap.get('iot:device:config:batterySetting:batterySystemSetting')) {
      result.push({
        label: (
          <Detail.Label title="电池系统使能设置">
            <ConfigModal
              title={'配置电池保护参数'}
              deviceId={deviceId}
              realTimeData={realTimeData}
              columns={powerParamsColumns}
              serviceId={'EnableBatterySystemSelfStartFunction'}
            />
          </Detail.Label>
        ),
        items: powerParamsItems,
      });
    }
    if (authorityMap.get('iot:device:config:batterySetting:batteryProtectSetting')) {
      result.push({
        label: (
          <Detail.Label title="电池保护参数设置">
            <ConfigModal
              width={'816px'}
              title={'配置电池保护参数'}
              deviceId={deviceId}
              realTimeData={realTimeData}
              columns={protectParamsColumns}
              serviceId={'BatteryProtectionParameterSettings'}
              colProps={{
                span: 8,
              }}
            />
          </Detail.Label>
        ),
        items: protectParamsItems,
      });
    }
    return result;
  }, [deviceId, productId, realTimeData, authorityMap]);

  return (
    <>
      <div className="px24">
        <Detail.Group
          data={realTimeData}
          items={detailGroup}
          detailProps={{
            colon: false,
            labelStyle: { width: 200 },
            valueStyle: { width: '40%' },
          }}
        />
      </div>
    </>
  );
};

export default SystemSetting;
