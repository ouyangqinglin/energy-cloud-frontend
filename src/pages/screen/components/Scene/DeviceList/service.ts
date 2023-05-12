import request from '@/utils/request';

export type DeviceItem = {
  subsystemName: string;
  productName: string;
  productId: number;
  number: number;
  subsystemId: number;
};

export type DeviceListRes = DeviceItem[];

export const getDeviceList = () => {
  return request<{ data: DeviceListRes }>(`/device/list`, {
    method: 'GET',
  });
};
