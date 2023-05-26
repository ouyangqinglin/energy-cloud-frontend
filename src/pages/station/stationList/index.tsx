/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-28 17:41:49
 * @LastEditTime: 2023-05-25 14:14:25
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\index.tsx
 */
import React, { useRef, useState, useCallback } from 'react';
import { Button, Modal, message } from 'antd';
import { useHistory } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { StationType, StationFormType } from './data.d';
import { buildStatus } from '@/utils/dictionary';
import { getList, removeData } from './service';
import StationForm from './components/edit';
import { FormTypeEnum } from '@/utils/dictionary';

const StationList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const actionRef = useRef<ActionType>();

  const onAddClick = useCallback(() => {
    setOpen(true);
  }, []);

  const onEditData = (data: StationType) => {
    setOpen(true);
  };

  const onInClick = useCallback((record) => {
    history.push({
      pathname: `/station-manage/operation-monitor?id=${record.id}`,
    });
  }, []);

  const onSuccess = () => {
    actionRef?.current?.reload?.();
  };

  const toolBar = () => [
    <Button type="primary" key="add" onClick={onAddClick}>
      <PlusOutlined />
      新建站点
    </Button>,
  ];

  const rowBar = (_: any, record: StationType) => (
    <>
      <Button type="link" size="small" key="in" onClick={() => onInClick(record)}>
        进入
      </Button>
      <Button type="link" size="small" key="edit" onClick={() => onEditData(record)}>
        编辑
      </Button>
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
      </Button>
      <Button type="link" size="small" key="delivery">
        交付
      </Button>
    </>
  );
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
            startTime: value[0],
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
      dataIndex: 'countryCode',
      hideInSearch: true,
    },
    {
      title: '省份',
      dataIndex: 'provinceCode',
      hideInSearch: true,
    },
    {
      title: '城市',
      dataIndex: 'cityCode',
      hideInSearch: true,
    },
    {
      title: '代理商',
      dataIndex: 'agent',
      hideInSearch: true,
      ellipsis: true,
      width: 150,
    },
    {
      title: '建设状态',
      dataIndex: 'constructionStatus',
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
      dataIndex: 'lastOperationTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 220,
      fixed: 'right',
      render: rowBar,
    },
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
        pagination={{
          showSizeChanger: true,
        }}
      ></ProTable>
      <StationForm
        open={open}
        onOpenChange={setOpen}
        type={FormTypeEnum.Add}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default StationList;
