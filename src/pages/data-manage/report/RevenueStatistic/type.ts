import type { FormOperations } from '@/components/YTModalForm/typing';
import type { EffectiveTimeList, HoursPriceList } from '../type';

export type FormModalProps = {
  visible: boolean;
  onVisibleChange: (state: boolean) => void;
  operations: FormOperations;
  initialValues?: any;
};

export interface MarketElectricityPriceParams {
  id: number;
  name: string;
  status: boolean;
  siteId: number;
  powerFactor: string;
  electricityType: string;
  maxDemand: string;
  demandElectrovalency: string;
  sharpPrice: string;
  peakPrice: string;
  flatPrice: string;
  valleyPrice: string;
  effectiveTimeList: EffectiveTimeList[];
  hoursPriceList: HoursPriceList[];
}

export interface MarketElectricityPriceInfo {
  id: number;
  effectiveTimeList: EffectiveTimeList[];
  name: string;
  powerFactor: string;
  electricityType?: any;
  maxDemand?: any;
  demandElectrovalency?: any;
  // 生效状态
  status: boolean;
  sharpPrice: string;
  peakPrice: string;
  flatPrice: string;
  lastOperationTime: string;
  siteId: number;
  hoursPriceList: HoursPriceList[];
  valleyPrice: string;
  operator: string;
}
