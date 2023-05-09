/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 15:28:18
 * @LastEditTime: 2023-05-09 09:21:57
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

export type AlarmTableProps = {
  params: object;
  request: (params: any) => Promise<any>;
};

export type AlarmType = {
  id: string;
  content: string;
  source: string;
  createdTime: string;
  recoverTime: string;
};

const AlarmTable: React.FC<AlarmTableProps> = (props) => {
  const { params, request } = props;
  const actionRef = useRef<ActionType>();
  const Component: any = DatePicker.RangePicker;
  const dateFormat = 'YYYY/MM/DD';
  const searchParams = {
    ...params,
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
      dataIndex: 'source',
      width: 100,
      ellipsis: true,
    },
    {
      title: '发生时间',
      dataIndex: 'createdTime',
      width: 200,
      ellipsis: true,
      render: (_, record) => `${record.createdTime} (${format(record.createdTime, 'zh_CN')})`,
    },
    {
      title: '恢复时间',
      dataIndex: 'recoverTime',
      width: 200,
      ellipsis: true,
      render: (_, record) => `${record.recoverTime} (${format(record.recoverTime, 'zh_CN')})`,
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
        request={(query) =>
          request(query).then((res) => {
            return {
              data: res.rows,
              total: res.total,
              success: true,
            };
          })
        }
        scroll={{ x: 1000 }}
        pagination={{
          showSizeChanger: true,
        }}
      ></ProTable>
    </>
  );
};

export default AlarmTable;
