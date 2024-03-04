/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 16:14:43
 * @LastEditTime: 2024-02-29 14:28:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\DeviceMonitor\index.tsx
 */
import React from 'react';
import { useLocation } from 'umi';
import DeviceDetail from '@/components/DeviceDetail';
import type { LocationType } from '@/types';

const DeviceMonitor: React.FC = () => {
  const location = useLocation<LocationType>();

  return (
    <>
      {/* <DeviceDetail deviceId={(location as LocationType).query?.id} /> */}
      <DeviceDetail id={(location as LocationType).query?.id} />
    </>
  );
};

export default DeviceMonitor;
