import request from '@/utils/request';

export const setComplete = (siteId: string) => {
  return request(`/uc/site/constructionStatus`, {
    method: 'PUT',
    data: {
      siteId,
    },
  });
};

export const editDefaultPage = (data: string) => {
  return request(`/oss/siteHomeConfig`, {
    method: 'POST',
    data,
  });
};

export const getCustomPage = () => {
  return request(`/oss/siteHomeConfig/customPage/list`, {
    method: 'GET',
  });
};

export const constructionStatus = (data: any) => {
  return request(`/uc/site/constructionStatus`, {
    method: 'PUT',
    data,
  });
};
