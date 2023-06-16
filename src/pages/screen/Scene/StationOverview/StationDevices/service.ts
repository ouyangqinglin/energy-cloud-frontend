import { getSiteId } from '@/pages/screen/components/Scene/helper';
import { get } from '@/utils/request';
import type { DeviceNumRes } from '../type';

export const getDeviceNum = () => {
  return get<DeviceNumRes>(`/oss/device/deviceNum`, {
    siteId: getSiteId(),
  });
};
