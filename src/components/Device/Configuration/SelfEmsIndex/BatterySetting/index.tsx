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
import ConfigModal from '../ConfigModal';
import { formatMessage } from '@/utils';

export type StackProps = {
  deviceId: string;
  productId: string;
  realTimeData?: Record<string, any>;
};
const SystemSetting: React.FC<StackProps> = (props) => {
  const { realTimeData, deviceId, productId } = props;
  const detailGroup = useMemo<GroupItem[]>(() => {
    return [
      {
        label: (
          <Detail.Label
            title={formatMessage({
              id: 'device.batterySystemEnablementSettings',
              defaultMessage: '电池系统使能设置',
            })}
          >
            <ConfigModal
              title={formatMessage({
                id: 'device.setBatteryProtectionParameters',
                defaultMessage: '配置电池保护参数',
              })}
              deviceId={deviceId}
              productId={productId}
              realTimeData={realTimeData}
              columns={powerParamsColumns}
              serviceId={'EnableBatterySystemSelfStartFunction'}
            />
          </Detail.Label>
        ),
        items: powerParamsItems,
      },
      {
        label: (
          <Detail.Label
            title={formatMessage({
              id: 'device.batteryProtectionParameterSetting',
              defaultMessage: '电池保护参数设置',
            })}
          >
            <ConfigModal
              title={formatMessage({
                id: 'device.setBatteryProtectionParameters',
                defaultMessage: '配置电池保护参数',
              })}
              deviceId={deviceId}
              productId={productId}
              realTimeData={realTimeData}
              columns={protectParamsColumns}
              serviceId={'BatteryProtectionParameterSettings'}
            />
          </Detail.Label>
        ),
        items: protectParamsItems,
      },
    ];
  }, []);

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
