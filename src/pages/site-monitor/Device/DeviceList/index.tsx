/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 14:38:39
 * @LastEditTime: 2023-06-21 14:55:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\device\DeviceList\index.tsx
 */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { EquipmentType } from './data.d';
import { onlineStatus } from '@/utils/dictionary';
import { getList } from './service';
import { deviceDialogMap } from '@/components/ScreenDialog';
import type { DeviceDialogMapType } from '@/components/ScreenDialog';

type DeviceListProps = {
  subSystemId?: string;
  siteId?: string;
};

const DeviceList: React.FC<DeviceListProps> = (props) => {
  const { subSystemId, siteId } = props;
  const [deviceId, setDeviceId] = useState('');
  const [detailOpen, setDetailOpen] = useState(false);
  const [deviceDialog, setDeviceDialog] = useState<DeviceDialogMapType>();
  const actionRef = useRef<ActionType>();
  const Component = deviceDialog?.component;

  const onSwitchDetailOpen = useCallback(() => {
    setDetailOpen((data) => !data);
  }, []);

  const onDetailClick = useCallback((rowData: EquipmentType) => {
    setDeviceId(rowData.deviceId);
    setDeviceDialog(deviceDialogMap?.[rowData.productId] || deviceDialogMap?.default);
    onSwitchDetailOpen();
  }, []);

  const handleRequest = (params: any) => {
    return getList({ ...params, subSystemId, siteId }).then(({ data }) => {
      return {
        data: data?.list,
        total: data?.total,
        success: true,
      };
    });
  };

  useEffect(() => {
    actionRef?.current?.reloadAndRest?.();
  }, [siteId, subSystemId]);

  const rowBar = (_: any, record: EquipmentType) => (
    <>
      <Button type="link" size="small" key="detail" onClick={() => onDetailClick(record)}>
        查看详情
      </Button>
    </>
  );

  const columns: ProColumns<EquipmentType>[] = [
    {
      title: '设备ID',
      dataIndex: 'deviceId',
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
      width: 150,
      ellipsis: true,
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
      dataIndex: 'productTypeName',
      width: 150,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '所属子系统',
      dataIndex: 'subsystemName',
      width: 80,
      hideInSearch: true,
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
      ellipsis: true,
    },
    {
      title: '上线时间',
      dataIndex: 'sessionStartTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 150,
      ellipsis: true,
    },
    {
      title: '通信状态',
      dataIndex: 'connectStatus',
      render: (dom, record) => (record.connectStatus == 2 ? '-' : dom),
      valueType: 'select',
      valueEnum: onlineStatus,
      width: 120,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: rowBar,
    },
  ];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        search={false}
        rowKey="id"
        toolBarRender={() => [<></>]}
        options={false}
        request={handleRequest}
        scroll={{ x: 1366 }}
        pagination={{
          showSizeChanger: true,
        }}
      />
      {Component && (
        <Component
          id={deviceId}
          open={detailOpen}
          onCancel={onSwitchDetailOpen}
          {...deviceDialog?.props}
        />
      )}
    </>
  );
};

export default DeviceList;
