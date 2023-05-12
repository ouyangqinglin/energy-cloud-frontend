import type { BenefitsRes } from './type';
import { get } from '@/utils/request';

export const getBenefits = () => {
  return get<{ data: BenefitsRes }>('/oss/site/economicAndSocialStatistics', { site: 1 });
};
