import type { TimeType } from '@/pages/screen/components/TimeButtonGroup';
import { get } from '@/utils/request';
import { getSiteId } from '../../helper';
import type { ChargeAndDisChargeRes, EnergyStorageChartRes, StatisticsRes } from './type';

export const getEnergyStorageStatistic = () => {
  return get<StatisticsRes>(`/iot/es/esVo`, { siteId: getSiteId() });
};

export const getChargeAndDischargePower = (type: TimeType) => {
  return get<ChargeAndDisChargeRes>(`/oss/es/operationalData`, { type, siteId: getSiteId() });
};

export const getEnergyStorageChart = (startTime: string, endTime: string) => {
  return get<EnergyStorageChartRes>(`/iot/es/chargeDischargeBarChart`, {
    siteId: getSiteId(),
    startTime,
    endTime,
  });
};
