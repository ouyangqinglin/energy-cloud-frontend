import request from '@/utils/request';

export const getStationInfo = () => {
  return request('/screen/siteInfo', {
    method: 'GET',
  });
};
