import type { FormOperations } from '@/components/YTModalForm/typing';
import type { EffectiveTimeList, HoursPriceList } from '../type';

export type FormModalProps = {
  visible: boolean;
  onVisibleChange: (state: boolean) => void;
  operations: FormOperations;
  initialValues?: any;
};

export interface PhotovoltaicElectricityPriceParams {
  id: number;
  name: string;
  status: number;
  siteId: number;
  effectiveTimeList: EffectiveTimeList[];
  hoursPriceList: HoursPriceList[];
}

export interface PhotovoltaicElectricityPriceInfo {
  id: number;
  name: string;
  status: boolean;
  lastOperationTime: string;
  siteId: number;
  effectiveTimeList: EffectiveTimeList[];
  hoursPriceList: HoursPriceList[];
  operator: string;
}
