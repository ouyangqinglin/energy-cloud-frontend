export type DeviceListRes = DeviceItem[];

export type DeviceItem = {
  subsystemName: string;
  productId: number;
  // 产品类型的名称
  model: string;
  number: number;
  subsystemId: number;
  display: number;
};
