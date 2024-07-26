import request from '@/utils/request';

export const editSiteData = (data: any) => {
  return request(`/iot/jx/syncSiteData`, {
    method: 'POST',
    data,
  });
};
