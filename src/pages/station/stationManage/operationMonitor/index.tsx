/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-22 14:52:05
 * @LastEditTime: 2023-05-22 14:52:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\operationMonitor\index.ts
 */
import { getSiteId } from '@/pages/screen/Scene/helper';
import { Spin } from 'antd';
import { isEmpty } from 'lodash';
import React from 'react';
import { useRequest } from 'umi';
import { useHistory } from 'umi';
import { getDefaultOverviewPage } from './service';

const OperationMonitor: React.FC = () => {
  const { data = {}, loading } = useRequest(getDefaultOverviewPage);
  const history = useHistory();
  if (isEmpty(data)) {
    history.push({
      pathname: `/screen/standard`,
      search: `?id=${1}`,
    });
  } else {
    const { customPagePath } = data;
    history.push({
      pathname: customPagePath,
      search: `?id=${getSiteId()}`,
    });
  }

  return loading ? <Spin /> : null;
};

export default OperationMonitor;
