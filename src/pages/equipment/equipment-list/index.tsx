/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2023-08-15 15:20:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\equipment-list\index.tsx
 */
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Button, Modal, message, Badge } from 'antd';
import { useHistory, useModel } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { onlineStatus } from '@/utils/dictionary';
import { removeData, getTabs } from './service';
import { getDevicePage, DeviceDataType, getProductTypeList } from '@/services/equipment';
import { FormTypeEnum } from '@/utils/dictionary';
import EquipForm from '@/components/EquipForm';
import { useSiteColumn, useSearchSelect } from '@/hooks';
import { SearchParams } from '@/hooks/useSearchSelect';

type DeviceListProps = {
  isStationChild?: boolean;
};

const DeviceList: React.FC<DeviceListProps> = (props) => {
  const { isStationChild } = props;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const actionRef = useRef<ActionType>();
  const [siteColumn] = useSiteColumn<DeviceDataType>({
    hideInTable: true,
  });

  const requestProductType = useCallback((searchParams: SearchParams) => {
    return getProductTypeList(searchParams).then(({ data }) => {
      return data?.map?.((item) => {
        return {
          label: item?.name || '',
          value: item?.id || '',
        };
      });
    });
  }, []);

  const [productTypeColumn] = useSearchSelect<DeviceDataType>({
    proColumns: {
      title: '产品类型',
      dataIndex: 'productTypeName',
      formItemProps: {
        name: 'productTypeId',
      },
      hideInTable: true,
    },
    request: requestProductType,
  });

  const onSwitchOpen = useCallback(() => {
    setOpen((data) => !data);
  }, []);

  const onAddClick = useCallback(() => {
    setOpen(true);
  }, []);

  const onDetailClick = useCallback(
    (rowData: DeviceDataType) => {
      history.push({
        pathname: isStationChild ? '/station/device-detail' : '/equipment/device-detail',
        search: `?id=${rowData.deviceId}&productId=${rowData.productId}`,
      });
    },
    [isStationChild],
  );

  const onSuccess = () => {
    actionRef?.current?.reload?.();
  };

  const handleRequest = (params: any) => {
    return getDevicePage({ ...params, ...(isStationChild ? { siteId } : {}) });
  };

  const toolBar = useCallback(
    () => [
      <Button type="primary" key="add" onClick={onAddClick}>
        <PlusOutlined />
        新建
      </Button>,
    ],
    [],
  );
  const rowBar = (_: any, record: DeviceDataType) => (
    <>
      <Button type="link" size="small" key="detail" onClick={() => onDetailClick(record)}>
        查看详情
      </Button>
      <Button
        type="link"
        size="small"
        key="delete"
        onClick={() => {
          Modal.confirm({
            title: '删除',
            content: '确定要删除该设备吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
              return removeData({ deviceId: record.deviceId }).then(({ data }) => {
                if (data) {
                  message.success('删除成功');
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                  return true;
                } else {
                  return false;
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
  const columns = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      ...(isStationChild ? [] : [siteColumn]),
      {
        title: '设备ID',
        dataIndex: 'deviceId',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      productTypeColumn,
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
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '所属站点',
        dataIndex: 'siteName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
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
        valueType: 'select',
        valueEnum: onlineStatus,
        width: 120,
      },
      {
        title: '操作',
        valueType: 'option',
        width: 150,
        fixed: 'right',
        render: rowBar,
      },
    ];
  }, [siteColumn, productTypeColumn]);

  return (
    <>
      <YTProTable
        actionRef={actionRef}
        columns={columns}
        toolBarRender={toolBar}
        request={handleRequest}
      />
      <EquipForm
        open={open}
        onCancel={onSwitchOpen}
        type={FormTypeEnum.Add}
        onSuccess={onSuccess}
        initialValues={isStationChild ? { siteId: parseInt(siteId) } : {}}
      />
    </>
  );
};

export default DeviceList;
