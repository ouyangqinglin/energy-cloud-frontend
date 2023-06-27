/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-24 15:15:42
 * @LastEditTime: 2023-06-19 14:31:47
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\partner\service\index.tsx
 */
import React, { useCallback } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { getRemoteUpgradeList } from './service';
import { RemoteUpgradeDataRes } from './type';

const RemoteUpgrade: React.FC = () => {
  const requestList: YTProTableCustomProps<RemoteUpgradeDataRes, RemoteUpgradeDataRes>['request'] =
    useCallback((params) => {
      return getRemoteUpgradeList(params);
    }, []);
  const onAddClick = useCallback(() => {}, []);
  const onEditClick: ProColumns<RemoteUpgradeDataRes>['render'] = useCallback((_, row) => {}, []);
  return (
    <>
      <YTProTable<RemoteUpgradeDataRes, RemoteUpgradeDataRes>
        columns={columns}
        option={{
          columnsProp: {
            width: '120px',
          },
          onEditChange: onEditClick,
        }}
        request={requestList}
      />
    </>
  );
};

export default RemoteUpgrade;
