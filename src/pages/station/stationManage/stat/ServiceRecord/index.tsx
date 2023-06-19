/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 17:11:48
 * @LastEditTime: 2023-06-19 17:21:25
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\stat\ServiceRecord\index.tsx
 */
import React, { useCallback } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import type { ServiceRecordType } from './data';
import { serviceProgressType, serviceType } from '@/utils/dictionary';
import { getAgent } from '@/services/agent';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';

const ServiceRecord: React.FC = () => {
  const requestList: YTProTableCustomProps<ServiceRecordType, ServiceRecordType>['request'] =
    useCallback((params) => {
      return getAgent(params);
    }, []);

  const onDeleteChange: ProColumns<ServiceRecordType>['render'] = useCallback((_, row) => {}, []);

  const columns: ProColumns<ServiceRecordType>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 50,
    },
    {
      title: '服务类型',
      dataIndex: 'serviceType',
      valueType: 'select',
      valueEnum: serviceType,
      width: 120,
    },
    {
      title: '任务编号',
      dataIndex: 'taskId',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '维护人员',
      dataIndex: 'maintenanceStaff',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '当前进度',
      dataIndex: 'currentProgress',
      valueType: 'select',
      valueEnum: serviceProgressType,
      width: 120,
      hideInSearch: true,
    },
    {
      title: '预约时间',
      dataIndex: 'appointmentTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '完成时间',
      dataIndex: 'endTime',
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
  ];

  return (
    <>
      <YTProTable<ServiceRecordType, ServiceRecordType>
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

export default ServiceRecord;
