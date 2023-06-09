import request from '@/utils/request';

export const setComplete = (id: string) => {
  return request(`/uc/site/constructionStatus`, {
    method: 'PUT',
    data: {
      id,
    },
  });
};

export const getDefaultPage = (id: string) => {
  return request(`/oss/siteHomeConfig`, {
    method: 'GET',
    params: {
      siteId: id,
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
