/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-20 16:17:35
 * @LastEditTime: 2023-07-24 11:56:25
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\DeviceDetail\index.tsx
 */
import React from 'react';
import { useLocation } from 'umi';
import DeviceDetail from '@/components/DeviceDetail';
import type { LocationType } from '@/types';

const DeviceMonitor: React.FC = () => {
  const location = useLocation<LocationType>();

  return (
    <>
      <DeviceDetail
        id={(location as LocationType).query?.id}
        productId={(location as LocationType).query?.productId}
      />
    </>
  );
};

export default DeviceMonitor;
