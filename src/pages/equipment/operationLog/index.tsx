/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-30 08:50:38
 * @LastEditTime: 2023-05-30 15:41:03
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\operationLog\index.tsx
 */
import React, { useCallback, useState } from 'react';
import { useRequest } from 'umi';
import YTProTable from '@/components/YTProTable';
import type { ProColumns } from '@ant-design/pro-table';
import { getList, getDetail } from './service';
import { OperationLogType } from './data.d';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';

const OperationLog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { data, run } = useRequest(getDetail, {
    manual: true,
  });

  const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const requestList = useCallback((params: OperationLogType) => {
    return getList(params).tableThen();
  }, []);

  const onDetailClick = useCallback((_, record) => {
    switchOpen();
    run(record.id);
  }, []);

  const detailItems: DetailItem[] = [
    { label: '日志ID', field: 'id' },
    { label: '日志内容', field: 'content' },
    { label: '所属站点', field: 'siteName' },
    { label: '设备名称', field: 'deviceName' },
    { label: '操作人', field: 'operator' },
    { label: '发生时间', field: 'createTime' },
  ];

  const columns: ProColumns<OperationLogType>[] = [
    {
      title: '日志ID',
      dataIndex: 'id',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '日志内容',
      dataIndex: 'content',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      width: 150,
      ellipsis: true,
    },
    {
      title: '所属站点',
      dataIndex: 'siteName',
      width: 150,
      ellipsis: true,
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
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
  ];

  return (
    <>
      <YTProTable<OperationLogType, OperationLogType>
        columns={columns}
        request={requestList}
        option={{
          columnsProp: {
            width: '100px',
          },
          onDetailChange: onDetailClick,
        }}
      />
      <DetailDialog
        width="420px"
        title="日志详情"
        open={open}
        onCancel={switchOpen}
        detailProps={{
          data: data,
          items: detailItems,
          column: 1,
          labelStyle: { width: '90px' },
        }}
      />
    </>
  );
};

export default OperationLog;
