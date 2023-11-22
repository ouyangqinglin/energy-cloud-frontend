/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-22 15:11:07
 * @LastEditTime: 2023-11-22 15:11:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\utils\dict.ts
 */
import { formatMessage } from './index';

export const runningState = {
  1: {
    text: formatMessage({ id: 'common.normal', defaultMessage: '正常' }),
    status: 'Success',
  },
  0: {
    text: formatMessage({ id: 'common.abnormal', defaultMessage: '异常' }),
    status: 'Error',
  },
};
