import { getSiteId } from '@/pages/screen/components/Scene/helper';
import { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { get } from '@/utils/request';
import type { ChargeAndDisChargeRes, EnergyStorageChartRes, StatisticsRes } from './type';

export const getEnergyStorageStatistic = () => {
  return get<StatisticsRes>(`/oss/es/statistic`, { siteId: getSiteId() });
};

export const getChargeAndDischargePower = (type: TimeType) => {
  return get<ChargeAndDisChargeRes>(`/oss/es/chargeDischarge`, { type, siteId: getSiteId() });
};

export const getEnergyStorageChart = () => {
  return get<EnergyStorageChartRes>(`/oss/es/getCure`, { siteId: getSiteId() });
};
