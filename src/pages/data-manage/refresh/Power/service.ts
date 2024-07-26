import request from '@/utils/request';

export const editData = (data: any) => {
  return request(`/iot/collectionData/recoverDataPower`, {
    method: 'POST',
    data,
  });
};
