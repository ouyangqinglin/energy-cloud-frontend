/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2023-07-04 17:34:10
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\equipment-list\index.tsx
 */
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Button, Modal, message, Badge } from 'antd';
import { useHistory } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { EquipmentType } from './data.d';
import { onlineStatus } from '@/utils/dictionary';
import { getList, removeData, getTabs } from './service';
import type { OptionType } from '@/utils/dictionary';
import { FormTypeEnum } from '@/utils/dictionary';
import EquipForm from '@/components/EquipForm';
import { useSiteColumn } from '@/hooks';

type DeviceListProps = {
  isStationChild?: boolean;
};

const DeviceList: React.FC<DeviceListProps> = (props) => {
  const { isStationChild } = props;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab0');
  const [tabItems, setTabItems] = useState<OptionType[]>([]);
  const actionRef = useRef<ActionType>();
  const [siteColumn] = useSiteColumn<EquipmentType>({
    hideInTable: true,
  });
  const [searchParams, setSearchParams] = useState({
    subSystemId: '',
  });

  const onSwitchOpen = useCallback(() => {
    setOpen((data) => !data);
  }, []);

  const onAddClick = useCallback(() => {
    setOpen(true);
  }, []);

  const onDetailClick = useCallback((rowData: EquipmentType) => {
    history.push({
      pathname: isStationChild ? '/site-monitor/device-detail' : '/equipment/device-monitor',
      search: `?id=${rowData.deviceId}&productId=${rowData.productId}`,
    });
  }, []);

  const onSuccess = () => {
    actionRef?.current?.reload?.();
  };

  const handleRequest = (params: any) => {
    getTabs({}).then(({ data: tabData }) => {
      if (Array.isArray(tabData)) {
        const items = (tabData || []).map((item) => {
          return {
            id: item.id ?? '',
            label: item.name,
            value: item.count,
          };
        });
        setTabItems(items);
      }
    });
    return getList({ ...params, ...searchParams }).then(({ data }) => {
      return {
        data: data?.list,
        total: data?.total,
        success: true,
      };
    });
  };

  const onTabChange = useCallback((key: React.Key | undefined) => {
    setActiveTab(key as string);
    setSearchParams({
      subSystemId: (key as string).replace('tab', ''),
    });
    actionRef.current?.reloadAndRest?.();
  }, []);

  const toolBar = useCallback(
    () => [
      <Button type="primary" key="add" onClick={onAddClick}>
        <PlusOutlined />
        新建设备
      </Button>,
    ],
    [],
  );
  const rowBar = (_: any, record: EquipmentType) => (
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
              removeData({ deviceId: record.deviceId }).then(() => {
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
    const key = 'tab' + item.id;
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
  const columns = useMemo<ProColumns<EquipmentType>[]>(() => {
    return [
      siteColumn,
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
        render: (dom, record) => (record.connectStatus == 2 ? '-' : dom),
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
  }, [siteColumn]);

  return (
    <>
      <div className="bg-white">
        <ProTable
          actionRef={actionRef}
          columns={columns}
          search={{
            labelWidth: 'auto',
            searchText: '搜索',
          }}
          rowKey="id"
          toolBarRender={toolBar}
          options={false}
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
        />
      </div>
      <EquipForm
        open={open}
        onCancel={onSwitchOpen}
        type={FormTypeEnum.Add}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default DeviceList;
