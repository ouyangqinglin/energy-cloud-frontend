/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-29 11:24:02
 * @LastEditTime: 2023-08-29 11:34:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Task\service.ts
 */

import request from '@/utils/request';

export const getData = () => {
  return request(`/oss/sitesBigScreen/taskInfo`, {
    method: 'GET',
  });
};
