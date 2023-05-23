/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-28 17:41:49
 * @LastEditTime: 2023-05-16 11:47:28
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\index.tsx
 */
import React from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import type { StationType } from './data.d';
import { buildStatus } from '@/utils/dictionary';
import { getList } from './service';
import YTProTable from '@/components/YTProTable';
import type { CustomTableProps } from '@/components/YTProTable/typing';

const StationList: React.FC = () => {
  const columns: ProColumns<StationType>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
    },
    {
      title: '站点名称',
      dataIndex: 'name',
      width: 120,
      ellipsis: true,
    },
    {
      title: '站点ID',
      dataIndex: 'id',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      render: (_, record) => <span>{record.createTime}</span>,
      search: {
        transform: (value) => {
          return {
            beginTime: value[0],
            endTime: value[1],
          };
        },
      },
      width: 150,
    },
    {
      title: '交付时间',
      dataIndex: 'deliveryTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '国家',
      dataIndex: 'country',
      hideInSearch: true,
    },
    {
      title: '省份',
      dataIndex: 'province',
      hideInSearch: true,
    },
    {
      title: '城市',
      dataIndex: 'city',
      hideInSearch: true,
    },
    {
      title: '服务单位',
      dataIndex: 'serviceCompany',
      hideInSearch: true,
      ellipsis: true,
      width: 150,
    },
    {
      title: '建设状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: buildStatus,
      hideInSearch: true,
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      hideInSearch: true,
    },
    {
      title: '最后操作时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
  ];

  const customConfig: CustomTableProps<StationType, any> = {
    toolbar: {
      onChange() {},
    },
    option: {
      onDeleteChange() {},
    },
  };

  return (
    <YTProTable<StationType>
      columns={columns}
      {...customConfig}
      request={(params) =>
        getList(params).then((res) => {
          return {
            data: res.rows,
            total: res.total,
            success: true,
          };
        })
      }
    />
  );
};

export default StationList;
