/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 16:14:43
 * @LastEditTime: 2023-07-19 11:12:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\DeviceMonitor\index.tsx
 */
import React from 'react';
import { useLocation } from 'umi';
import DeviceDetail from '@/components/DeviceMonitor';
import type { LocationType } from '@/types';

const DeviceMonitor: React.FC = () => {
  const location = useLocation<LocationType>();

  return (
    <>
      <DeviceDetail deviceId={(location as LocationType).query?.id} />
    </>
  );
};

export default DeviceMonitor;
