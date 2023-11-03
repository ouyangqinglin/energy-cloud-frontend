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
import Button from 'antd/lib/button';

export type StackProps = {
  deviceId: string;
  productId: string;
  realTimeData?: Record<string, any>;
};
const SystemSetting: React.FC<StackProps> = (props) => {
  const { realTimeData } = props;
  const detailGroup = useMemo<GroupItem[]>(() => {
    return [
      {
        label: (
          <Detail.Label title="电池系统使能设置">
            <Button type="primary">配置参数</Button>
          </Detail.Label>
        ),
        items: protectParamsItems,
      },
      {
        label: (
          <Detail.Label title="电池保护参数设置">
            <Button type="primary">配置参数</Button>
          </Detail.Label>
        ),
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
