/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2023-07-19 11:06:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Device\DeviceList\index.tsx
 */
import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { Button, Modal, message, Badge, Tabs } from 'antd';
import { useHistory } from 'umi';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { DeviceType, DeviceSearchType } from './data';
import { onlineStatus } from '@/utils/dictionary';
import { removeData, getTabs, getDevicePage } from './service';
import type { OptionType } from '@/utils/dictionary';
import { FormTypeEnum } from '@/utils/dictionary';
import EquipForm from '@/components/EquipForm';
import { EMScolumns, getOtColumns, TabColumnsMap } from './config';
import { useAuthority } from '@/hooks';

type DeviceListProps = {
  onDetail?: (rowData: DeviceType) => boolean;
  params?: DeviceSearchType;
  scrollY?: number | string;
};

const DeviceList: React.FC<DeviceListProps> = (props) => {
  const { onDetail, params } = props;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab0');
  const [tabItems, setTabItems] = useState<OptionType[]>([]);
  const actionRef = useRef<ActionType>();
  const [searchParams, setSearchParams] = useState({
    classType: 1,
  });
  const [columns, setColumns] = useState([...EMScolumns]);
  const { passAuthority } = useAuthority('oss:monitor:device:delete');

  const onSwitchOpen = useCallback(() => {
    setOpen((data) => !data);
  }, []);

  const onAddClick = useCallback(() => {
    setOpen(true);
  }, []);

  const onDetailClick = useCallback((rowData: DeviceType) => {
    if (onDetail?.(rowData) !== false) {
      history.push({
        pathname: '/site-monitor/device-detail',
        search: `?id=${rowData.deviceId}&productId=${rowData.productId}`,
      });
    }
  }, []);

  const onSuccess = () => {
    actionRef?.current?.reload?.();
  };

  const handleRequest = (paramsData: any) => {
    return getDevicePage({ ...paramsData, ...searchParams, ...(params || {}) });
  };

  const rowBar = (_: any, record: DeviceType) => (
    <>
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
        overflowCount={999999999}
      />
    );
  };

  const onTabChange = useCallback(
    (key: React.Key | undefined) => {
      setActiveTab(key as string);
      const realKey = (key as string).replace('tab', '');
      if (realKey) {
        setSearchParams({
          classType: Number(realKey),
        });
        const tableColumns = TabColumnsMap?.get(Number(realKey)) || [];
        setColumns([
          ...getOtColumns(onDetailClick),
          ...tableColumns,
          ...(passAuthority
            ? [
                {
                  title: '操作',
                  valueType: 'option',
                  width: 150,
                  fixed: 'right',
                  render: rowBar,
                },
              ]
            : []),
        ]);
      }
      actionRef.current?.reloadAndRest?.();
    },
    [tabItems, passAuthority],
  );

  useEffect(() => {
    getTabs({ ...(params || {}) }).then(({ data: tabData }) => {
      if (Array.isArray(tabData)) {
        const items = (tabData || []).map((item) => {
          return {
            id: item.typeId ?? '',
            label: item.typeName,
            value: item.count,
          };
        });
        const key = 'tab' + (items[0]?.id || 0);
        setTabItems(items);
        onTabChange(key);
      }
    });
  }, [params]);

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

  return (
    <>
      <Tabs className="px24" activeKey={activeTab} items={tabItemList} onChange={onTabChange} />
      <YTProTable
        actionRef={actionRef}
        columns={columns}
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={onAddClick}>
            新建
          </Button>,
        ]}
        request={handleRequest}
      />
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
