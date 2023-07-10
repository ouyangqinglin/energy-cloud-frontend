import { get } from '@/utils/request';
import { BenefitRes } from './type';

export const getBenefit = (siteId: number) => {
  return get<BenefitRes>('/oss/site/economicAndSocialStatistics', {
    siteId,
  });
};
