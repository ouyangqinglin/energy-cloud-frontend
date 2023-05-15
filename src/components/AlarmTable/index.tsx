/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 15:28:18
 * @LastEditTime: 2023-05-15 10:07:19
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\AlarmTable\index.tsx
 */
import React, { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { format } from 'timeago.js';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import Empty from '../Empty';

export type AlarmTableProps = {
  params?: {
    id: string;
  };
  request?: (params: any) => Promise<any>;
};

export type AlarmType = {
  id: string;
  content: string;
  fromResource: string;
  alarmTime: string;
  recoveryTime: string;
};

const AlarmTable: React.FC<AlarmTableProps> = (props) => {
  const { params, request } = props;
  const actionRef = useRef<ActionType>();
  const Component: any = DatePicker.RangePicker;
  const dateFormat = 'YYYY/MM/DD';
  const searchParams = {
    ...(params || {}),
    startTime: '',
    endTime: '',
  };

  const columns: ProColumns<AlarmType>[] = [
    {
      title: '消息ID',
      dataIndex: 'id',
      width: 100,
      ellipsis: true,
    },
    {
      title: '消息内容',
      dataIndex: 'content',
      width: 150,
      ellipsis: true,
    },
    {
      title: '告警来源',
      dataIndex: 'fromResource',
      width: 100,
      ellipsis: true,
    },
    {
      title: '发生时间',
      dataIndex: 'alarmTime',
      width: 200,
      ellipsis: true,
      render: (_, record) => `${record.alarmTime} (${format(record.alarmTime, 'zh_CN')})`,
    },
    {
      title: '恢复时间',
      dataIndex: 'recoveryTime',
      width: 200,
      ellipsis: true,
      render: (_, record) => `${record.recoveryTime} (${format(record.recoveryTime, 'zh_CN')})`,
    },
  ];

  const onQueryChange = (_: any, date: string[]) => {
    searchParams.startTime = date[0];
    searchParams.endTime = date[1];
    actionRef.current?.reloadAndRest?.();
  };

  const toolBar = () => [
    <Component
      key="date"
      format={dateFormat}
      defaultValue={[moment().subtract(1, 'day'), moment()]}
      onChange={onQueryChange}
      ranges={{
        近24小时: [moment().subtract(1, 'day'), moment()],
        最近7天: [moment().subtract(6, 'day'), moment()],
        本月: [moment().startOf('month'), moment()],
        最近3个月: [moment().subtract(3, 'month'), moment()],
      }}
    />,
  ];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        search={false}
        options={false}
        rowKey="id"
        toolBarRender={toolBar}
        params={searchParams}
        request={
          request && params?.id
            ? (query) =>
                request(query).then(({ data = {} }) => {
                  return {
                    data: data.list,
                    total: data.total,
                    success: true,
                  };
                })
            : undefined
        }
        scroll={{ x: 1000 }}
        pagination={{
          showSizeChanger: true,
        }}
        locale={{
          emptyText: Empty,
        }}
      ></ProTable>
    </>
  );
};

export default AlarmTable;
