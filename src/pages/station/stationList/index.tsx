/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-28 17:41:49
 * @LastEditTime: 2023-05-06 11:28:31
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\index.tsx
 */
import React, { useRef, useState, useCallback } from 'react';
import { Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { StationType, StationFormType } from './data.d';
import { buildStatus } from '@/utils/dictionary';
import { getList, removeData } from './service';
import StationForm from './components/edit';

const StationList: React.FC = () => {
  const [formData, setFormData] = useState<StationFormType | undefined>();
  const [open, setOpen] = useState(false);

  const actionRef = useRef<ActionType>();

  const onAddClick = useCallback(() => {
    setFormData(undefined);
    setOpen(true);
  }, []);

  const onEditData = (data: StationType) => {
    // data.addr = {
    //   address: '广东省深圳市龙华区长兴路',
    //   point: {
    //     lng: 114.0714940667767,
    //     lat: 22.686739677916982
    //   }
    // };
    setFormData(data);
    setOpen(true);
  };

  const onOpenChange = (value: boolean) => {
    if (!value) {
      setOpen(value);
    }
  };

  const toolBar = () => [
    <Button type="primary" key="add" onClick={onAddClick}>
      <PlusOutlined />
      新建站点
    </Button>,
  ];

  const rowBar = (_: any, record: StationType) => (
    <>
      <Button type="link" size="small" key="in">
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
      <StationForm values={formData} open={open} onOpenChange={onOpenChange} />
    </>
  );
};

export default StationList;
