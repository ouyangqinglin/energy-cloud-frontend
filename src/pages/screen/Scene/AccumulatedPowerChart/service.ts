import { get } from '@/utils/request';
import { getSiteId } from '../helper';
import type { AccumulatedPowerChartRes } from './type';

export const getAccumulatedPowerChart = () => {
  return get<AccumulatedPowerChartRes>(`/oss/site/index/quantityEfElectricity`, {
    siteId: getSiteId(),
  });
};
