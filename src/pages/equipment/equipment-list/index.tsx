/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2023-05-06 15:10:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\equipment-list\index.tsx
 */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button, Modal, message, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { EquipmentType, StationFormType } from './data.d';
import { onlineStatus } from '@/utils/dictionary';
import { getList, removeData, getTabs } from './service';
import StationForm from './components/edit';
import { OptionType } from '@/utils/dictionary';

const StationList: React.FC = () => {
  const [formData, setFormData] = useState<StationFormType | undefined>();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab0');
  const [tabItems, setTabItems] = useState<OptionType[]>([]);

  const actionRef = useRef<ActionType>();

  const onAddClick = useCallback(() => {
    setFormData(undefined);
    setOpen(true);
  }, []);

  const onEditData = (data: EquipmentType) => {
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

  const handleRequest = (params: any) => {
    getTabs({}).then((res) => {
      setTabItems(res.data || []);
    });
    return getList(params).then((res) => {
      return {
        data: res.rows,
        total: res.total,
        success: true,
      };
    });
  };

  const onTabChange = (key: React.Key | undefined) => {
    setActiveTab(key as string);
    actionRef.current?.reloadAndRest?.();
  };

  const toolBar = () => [
    <Button type="primary" key="add" onClick={onAddClick}>
      <PlusOutlined />
      新建设备
    </Button>,
  ];
  const rowBar = (_: any, record: EquipmentType) => (
    <>
      <Button type="link" size="small" key="detail">
        查看详情
      </Button>
      <Button type="link" size="small" key="forbidden">
        启用
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
    </>
  );
  const renderBadge = (count: number | string, active = false) => {
    return (
      <Badge
        showZero
        count={count}
        style={{
          marginBlockStart: -2,
          marginInlineStart: 4,
          color: active ? '#165DFF' : '#303133',
          backgroundColor: active ? '#E8F3FF' : '#F2F3F5',
        }}
      />
    );
  };
  const tabItemList = tabItems.map((item, index) => {
    const key = 'tab' + index;
    return {
      key,
      label: (
        <>
          <span>
            {item.label}
            {renderBadge(item.value, activeTab === key)}
          </span>
        </>
      ),
    };
  });
  const columns: ProColumns<EquipmentType>[] = [
    {
      title: '设备ID',
      dataIndex: 'id',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      width: 120,
      ellipsis: true,
    },
    {
      title: '设备SN',
      dataIndex: 'sn',
      width: 120,
    },
    {
      title: '型号',
      dataIndex: 'model',
      width: 150,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '产品类型',
      dataIndex: 'type',
      width: 120,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '子系统',
      dataIndex: 'childSystem',
      width: 80,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '所属站点',
      dataIndex: 'station',
      width: 150,
      ellipsis: true,
    },
    {
      title: '添加时间',
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
      title: '上线时间',
      dataIndex: 'onlineTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '通信状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: onlineStatus,
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
        request={handleRequest}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activeTab,
            items: tabItemList,
            onChange: onTabChange,
          },
        }}
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
