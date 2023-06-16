import { get } from '@/utils/request';
import { getSiteId } from '../../helper';
import type { DeviceNumRes } from '../type';

export const getDeviceNum = () => {
  return get<DeviceNumRes>(`/oss/device/deviceNum`, {
    siteId: getSiteId(),
  });
};
