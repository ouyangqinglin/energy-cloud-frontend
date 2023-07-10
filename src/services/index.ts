// @ts-ignore
/* eslint-disable */
// API 更新时间：
// API 唯一标识：
import * as api from './api';
import * as login from './session';

export const requestEmpty = () => {
  return Promise.resolve({
    code: 200,
    data: {
      list: [],
      total: 0,
    },
    msg: null,
  });
};

export { api };

export default {
  api,
  login,
};
