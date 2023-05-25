/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-25 10:21:56
 * @LastEditTime: 2023-05-25 14:00:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\alarm\index.tsx
 */
import React from 'react';
import type { ProColumns, ProTableProps } from '@ant-design/pro-table';
import type { AlarmType } from './data.d';
import { alarmStatus, alarmSourceStatus } from '@/utils/dictionary';
import YTProTable from '@/components/YTProTable';
import { getList } from './service';

const Alarm: React.FC = () => {
  const requestList: ProTableProps<AlarmType, AlarmType>['request'] = (params) => {
    return getList(params).then(({ data }) => {
      return {
        data: data?.list,
        total: data?.total,
        success: true,
      };
    });
  };

  const onDetailClick = () => {};

  const columns: ProColumns<AlarmType>[] = [
    {
      title: '告警ID',
      dataIndex: 'id',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '告警内容',
      dataIndex: 'content',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '关联设备',
      dataIndex: 'device',
      width: 150,
      ellipsis: true,
    },
    {
      title: '所属站点',
      dataIndex: 'station',
      width: 150,
      ellipsis: true,
    },
    {
      title: '告警状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: alarmStatus,
      width: 120,
    },
    {
      title: '告警来源',
      dataIndex: 'source',
      valueEnum: alarmSourceStatus,
      width: 120,
    },
    {
      title: '发生时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      width: 150,
      render: (_, record) => record.createTime,
      search: {
        transform: (value) => {
          return {
            beginTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '恢复时间',
      dataIndex: 'recoveryTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
  ];

  return (
    <>
      <YTProTable<AlarmType, AlarmType>
        columns={columns}
        request={requestList}
        option={{
          columnsProp: {
            width: '100px',
          },
          onDetailChange: onDetailClick,
        }}
      />
    </>
  );
};

export default Alarm;
