import request from '@/utils/request';

export type DeviceListRes = {
  subsystemName: string;
  productName: string;
  productId: number;
  number: number;
  subsystemId: number;
}[];

export const getDeviceList = () => {
  return request<{ data: DeviceListRes }>(`/screen/device/list`, {
    method: 'GET',
  });
};
