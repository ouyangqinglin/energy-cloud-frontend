import request from '@/utils/request';

export const editData = (data: any) => {
  return request(`/oss/chargeSiteHour/siteReportTestAll`, {
    method: 'POST',
    data,
  });
};
