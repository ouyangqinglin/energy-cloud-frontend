/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 16:14:43
 * @LastEditTime: 2023-07-04 16:14:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\equipment-list\DeviceMonitor\index.tsx
 */
import React from 'react';
import { useLocation } from 'umi';
import DeviceDetail from '@/components/DeviceDetail';
import type { LocationType } from '@/utils/dictionary';

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
