/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-28 17:41:49
 * @LastEditTime: 2023-05-04 17:23:10
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\index.tsx
 */
import React, { useRef } from 'react';
import { Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { StationType } from './data.d';
import { buildStatus } from '@/utils/dictionary';
import { getList, removeData } from './service';
import StationForm from './components/edit';

const StationList: React.FC = () => {
  const actionRef = useRef<ActionType>();
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
      hideInSearch: true,
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
    {
      title: '操作',
      valueType: 'option',
      width: 220,
      fixed: 'right',
      render: (_, record) => [
        <Button type="link" size="small" key="in">
          进入
        </Button>,
        <Button
          type="link"
          size="small"
          key="delete"
          onClick={() => {
            Modal.confirm({
              title: '删除',
              content: '确定要删除改站点吗？',
              okText: '确认',
              cancelText: '取消',
              onOk: () => {
                removeData(record.id).then(() => {
                  message.success('删除成功');
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                });
              },
            });
          }}
        >
          删除
        </Button>,
        <Button type="link" size="small" key="delivery">
          交付
        </Button>,
      ],
    },
  ];

  const toolBar = () => [
    <Button type="primary" key="add">
      <PlusOutlined />
      新建站点
    </Button>,
    <StationForm />,
  ];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        search={{
          labelWidth: 'auto',
        }}
        rowKey="id"
        toolBarRender={toolBar}
        request={(params) =>
          getList(params).then((res) => {
            return {
              data: res.rows,
              total: res.total,
              success: true,
            };
          })
        }
        scroll={{ x: 1366 }}
      ></ProTable>
    </>
  );
};

export default StationList;
