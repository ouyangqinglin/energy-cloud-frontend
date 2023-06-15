import { get } from '@/utils/request';
import { getSiteId } from '../helper';
import type { DeviceListRes } from './type';

export const getDeviceList = () => {
  return get<DeviceListRes>(`/oss/device/list/getDeviceList`, {
    siteId: getSiteId(),
  });
};
