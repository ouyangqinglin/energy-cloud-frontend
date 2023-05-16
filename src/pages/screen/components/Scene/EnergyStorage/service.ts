import { get } from '@/utils/request';
import type { TimeType } from '../../TimeButtonGroup';
import type { ChargeAndDisChargeRes, EnergyStorageChartRes, StatisticsRes } from './type';

export const getEnergyStorageStatistic = () => {
  return get<StatisticsRes>(`/oss/es/statistic1`, { siteId: 1 });
};

export const getChargeAndDischargePower = (type: TimeType) => {
  return get<ChargeAndDisChargeRes>(`/oss/es/chargeDischarge`, { type, siteId: 1 });
};

export const getEnergyStorageChart = () => {
  return get<EnergyStorageChartRes>(`/oss/es/getCure`, { siteId: 1 });
};
