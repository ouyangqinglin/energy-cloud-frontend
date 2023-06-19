/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 17:22:37
 * @LastEditTime: 2023-06-19 17:26:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\stat\Fault\index.tsx
 */
import React, { useCallback } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import type { FaultType } from './data';
import { serviceProgressType, serviceType } from '@/utils/dictionary';
import { getAgent } from '@/services/agent';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';

const Fault: React.FC = () => {
  const requestList: YTProTableCustomProps<FaultType, FaultType>['request'] = useCallback(
    (params) => {
      return getAgent(params);
    },
    [],
  );

  const onDeleteChange: ProColumns<FaultType>['render'] = useCallback((_, row) => {}, []);

  const columns: ProColumns<FaultType>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 50,
    },
    {
      title: '故障标题',
      dataIndex: 'faultTitle',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '故障描述',
      dataIndex: 'faultDescription',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '当前进度',
      dataIndex: 'currentProgress',
      valueType: 'select',
      valueEnum: serviceProgressType,
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      render: (_, record) => <span>{record.endTime}</span>,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
      width: 150,
    },
    {
      title: '完成时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
      width: 150,
      hideInSearch: true,
    },
  ];

  return (
    <>
      <YTProTable<FaultType, FaultType>
        columns={columns}
        option={{
          onDeleteChange: onDeleteChange,
        }}
        toolBarRender={() => [<></>]}
        request={requestList}
      />
    </>
  );
};

export default Fault;
