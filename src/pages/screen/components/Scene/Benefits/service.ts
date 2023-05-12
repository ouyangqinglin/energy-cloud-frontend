import type { BenefitsRes } from './type';
import request from '@/utils/request';

export const getBenefits = () => {
  return request<{ data: BenefitsRes }>('/oss/site/economicAndSocialStatistics', {
    method: 'GET',
  });
};
