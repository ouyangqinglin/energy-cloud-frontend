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
import { protectParamsItems, powerParamsItems } from './config';

export type StackProps = {
  deviceId: string;
  productId: string;
  realTimeData?: Record<string, any>;
};
const SystemSetting: React.FC<StackProps> = (props) => {
  const { realTimeData, deviceId } = props;
  const detailGroup = useMemo<GroupItem[]>(() => {
    return [
      {
        label: <Detail.Label title="变流器保护参数设置">112233</Detail.Label>,
        items: protectParamsItems,
      },
      {
        label: <Detail.Label title="电网参数设置" />,
        items: powerParamsItems,
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
            labelStyle: { width: 140 },
            valueStyle: { width: '40%' },
          }}
        />
      </div>
    </>
  );
};

export default SystemSetting;
