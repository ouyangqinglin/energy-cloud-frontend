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
import { getApplicationAuthorizationList } from './service';
import { ListDataType } from './type';

const RemoteUpgrade: React.FC = () => {
  const requestList: YTProTableCustomProps<ListDataType, ListDataType>['request'] = useCallback(
    (params) => {
      return getApplicationAuthorizationList(params);
    },
    [],
  );
  const onAddClick = useCallback(() => {}, []);
  const onEditClick: ProColumns<ListDataType>['render'] = useCallback((_, row) => {}, []);
  return (
    <>
      <YTProTable<ListDataType, ListDataType>
        columns={columns}
        toolbar={{
          buttonText: '新增应用授权',
          onChange: () => {},
        }}
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
