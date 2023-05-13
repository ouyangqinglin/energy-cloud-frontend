import { get } from '@/utils/request';
import type { DeviceListRes } from './type';

export const getDeviceList = () => {
  return get<DeviceListRes>(`/oss/device/list/getDeviceList`, {
    siteId: 1,
  });
};
