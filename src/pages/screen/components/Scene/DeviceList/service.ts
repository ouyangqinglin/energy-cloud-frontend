import request, { get } from '@/utils/request';

export type DeviceItem = {
  subsystemName: string;
  productName: string;
  productId: number;
  number: number;
  subsystemId: number;
};

export type DeviceListRes = DeviceItem[];

export const getDeviceList = () => {
  return get<{ data: DeviceListRes }>(`/oss/device/list`, {
    site: 1,
  });
};
