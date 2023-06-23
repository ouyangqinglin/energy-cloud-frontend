import { get } from '@/utils/request';
import { getSiteId } from '../helper';
import type { DeviceListRes } from './type';

export const getDeviceList = () => {
  return get<DeviceListRes[]>(`/oss/device/list/getDeviceList`, {
    siteId: getSiteId(),
  });
};

export const bindDeviceMark = (params: { deviceId?: number; mark: number }) => {
  return get(`/oss/device/mark`, {
    siteId: getSiteId(),
    ...params,
  });
};
