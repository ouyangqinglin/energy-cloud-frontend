/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 15:28:18
 * @LastEditTime: 2023-05-23 15:07:47
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\LogTable\index.tsx
 */
import React, { useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { format } from 'timeago.js';
import { DatePicker } from 'antd';
import moment from 'moment';
import Empty from '../Empty';

export type LogTableProps = {
  params?: {
    id: string;
  };
  request?: (params: any) => Promise<any>;
};

export type LogType = {
  id: string;
  createByName: string;
  serviceName: string;
  input: string;
  createTime: string;
};

const AlarmTable: React.FC<LogTableProps> = (props) => {
  const { params, request } = props;
  const actionRef = useRef<ActionType>();
  const Component: any = DatePicker.RangePicker;
  const dateFormat = 'YYYY-MM-DD';
  const searchParams = {
    ...(params || {}),
    deviceId: params?.id,
    startTime: moment().subtract(1, 'day').format(dateFormat),
    endTime: moment().format(dateFormat),
  };

  const columns: ProColumns<LogType>[] = [
    {
      title: '日志ID',
      dataIndex: 'id',
      width: 100,
      ellipsis: true,
    },
    {
      title: '日志内容',
      dataIndex: 'serviceName',
      width: 100,
      ellipsis: true,
    },
    {
      title: '操作用户',
      dataIndex: 'createByName',
      width: 150,
      ellipsis: true,
    },
    {
      title: '发生时间',
      dataIndex: 'createTime',
      width: 200,
      ellipsis: true,
      render: (_, record) => `${record.createTime} (${format(record.createTime, 'zh_CN')})`,
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
      getPopupContainer={(triggerNode: any) => triggerNode.parentElement}
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
