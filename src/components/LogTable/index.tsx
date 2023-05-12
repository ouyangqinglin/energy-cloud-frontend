/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 15:28:18
 * @LastEditTime: 2023-05-12 11:57:12
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\LogTable\index.tsx
 */
import React, { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { format } from 'timeago.js';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import Empty from '../Empty';

export type LogTableProps = {
  params?: object;
  request?: (params: any) => Promise<any>;
};

export type LogType = {
  id: string;
  operator: string;
  params: string;
  value: string;
  createdTime: string;
};

const AlarmTable: React.FC<LogTableProps> = (props) => {
  const { params = {}, request } = props;
  const actionRef = useRef<ActionType>();
  const Component: any = DatePicker.RangePicker;
  const dateFormat = 'YYYY/MM/DD';
  const searchParams = {
    ...params,
    startTime: '',
    endTime: '',
  };

  const columns: ProColumns<LogType>[] = [
    {
      title: '日志ID',
      dataIndex: 'id',
      width: 100,
      ellipsis: true,
    },
    {
      title: '操作用户',
      dataIndex: 'operator',
      width: 150,
      ellipsis: true,
    },
    {
      title: '目标参数',
      dataIndex: 'params',
      width: 100,
      ellipsis: true,
    },
    {
      title: '设定值',
      dataIndex: 'value',
      width: 100,
      ellipsis: true,
    },
    {
      title: '操作时间',
      dataIndex: 'createdTime',
      width: 200,
      ellipsis: true,
      render: (_, record) => `${record.createdTime} (${format(record.createdTime, 'zh_CN')})`,
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
          request
            ? (query) =>
                request(query).then((res) => {
                  return {
                    data: res.rows,
                    total: res.total,
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
