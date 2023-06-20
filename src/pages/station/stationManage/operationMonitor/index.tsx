/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-22 14:52:05
 * @LastEditTime: 2023-06-13 19:38:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\operationMonitor\index.tsx
 */
import { useEffect } from 'react';
import { Spin, Empty } from 'antd';
import React from 'react';
import { useRequest, useHistory, useModel } from 'umi';
import { getDefaultOverviewPage } from './service';
import EmptyPage from '@/components/EmptyPage';

const OperationMonitor: React.FC = () => {
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id }));
  const { data, loading, run } = useRequest(getDefaultOverviewPage, {
    manual: true,
  });
  const history = useHistory();

  const standPage = data?.homeType != 1 ? <EmptyPage /> : <></>;

  useEffect(() => {
    if (data) {
      if (data.homeType == 1) {
        history.push({
          pathname: data.customPagePath,
          search: `?id=${siteId}`,
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (siteId) {
      run(siteId);
    }
  }, [siteId]);

  return loading ? <Spin /> : standPage;
};

export default OperationMonitor;
