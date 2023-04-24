import { request } from 'umi';
import { getUserInfo } from '@/services/session';
import type { ListItemDataType } from './data.d';

export async function queryCurrentUserInfo(): Promise<{ data: API.GetUserInfoResult }> {
  return new Promise((resolve, reject) => {
    getUserInfo()
      .then((res) => {
        resolve({ data: res });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function queryFakeList(params: {
  count: number;
}): Promise<{ data: { list: ListItemDataType[] } }> {
  return request('/api/fake_list_Detail', {
    params,
  });
}
