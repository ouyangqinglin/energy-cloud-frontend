import type { FormOperations } from '@/components/YTModalForm/typing';

export type FormModalProps = {
  visible: boolean;
  onVisibleChange: (state: boolean) => void;
  operations: FormOperations;
  initialValues?: any;
};

export type ElectricityPriceList = ElectricityPriceListItem[];

export interface ElectricityPriceListItem {
  id: number;
  name: string;
  effectiveTime?: string;
  expirationTime?: string;
  status: boolean;
  lastOperationTime: string;
  siteId: number;
  effectiveTimeList: EffectiveTimeList[];
  operator: string;
}

export interface EffectiveTimeList {
  id?: number;
  effectiveTime: string;
  expirationTime: string;
  // 市电电价才有的字段
  mainsId?: number;
  // 光伏电价才有的字段
  internetId?: number;
  // c充电电价才有
  chargeId: number;

  // front
  effectiveDateScoped?: [string, string];
}

export interface HoursPriceList {
  intervalStartTime: string;
  intervalEndTime: string;
  id?: number;
  type?: PriceType;
  // 市电
  mainsId?: number;
  // 光伏
  internetId?: number;
  electricityFees?: number;
  // 充电
  chargeId: number;
  serviceFees: string;

  // font
  timeRange: [string, string];
}

// 尖0 /峰1 /平2 /谷3
export const enum PriceType {
  SHARP,
  PEAK,
  SHOULDER,
  OFF_PEAK,
}
