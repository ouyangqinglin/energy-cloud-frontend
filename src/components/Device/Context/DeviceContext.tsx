/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-22 10:58:23
 * @LastEditTime: 2023-12-22 10:58:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\DeviceContext.tsx
 */
import { DeviceDataType } from '@/services/equipment';
import { createContext } from 'react';

export type DeviceContextType = {
  data?: DeviceDataType;
  updateData?: any;
  loading?: boolean;
};

const DeviceContext = createContext<DeviceContextType>({
  data: {},
  loading: false,
  updateData: () => {},
});

export default DeviceContext;
