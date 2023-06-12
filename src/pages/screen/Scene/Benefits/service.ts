import type { BenefitsRes } from './type';
import { get } from '@/utils/request';
import { getSiteId } from '../helper';

export const getBenefits = () => {
  return get<{ data: BenefitsRes }>('/oss/site/economicAndSocialStatistics', {
    siteId: getSiteId(),
  });
};
