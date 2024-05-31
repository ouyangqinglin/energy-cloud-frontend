/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2024-04-12 11:24:46
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Device\DeviceList\index.tsx
 */
import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { Button, Modal, message, Badge, Tabs } from 'antd';
import { useHistory } from 'umi';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { DeviceType, DeviceSearchType } from './data';
import { onlineStatus } from '@/utils/dict';
import { removeData, getTabs, getDevicePage } from './service';
import type { OptionType } from '@/types';
import { FormTypeEnum } from '@/components/SchemaForm';
import EquipForm from '@/components/EquipForm';
import { EMScolumns, getOtColumns, TabColumnsMap } from './config';
import { useAuthority } from '@/hooks';
import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons';

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
  const [searchParams, setSearchParams] = useState<{ classType?: number }>({});
  const [columns, setColumns] = useState([...EMScolumns]);
  const { passAuthority } = useAuthority('oss:monitor:device:delete');

  const onSwitchOpen = useCallback(() => {
    setOpen((data) => !data);
  }, []);

  const onDetailClick = useCallback((rowData: DeviceType) => {
    if (onDetail?.(rowData) !== false) {
      history.push({
        pathname: '/site-monitor/device-detail',
        search: `?id=${rowData.deviceId}`,
      });
    }
  }, []);

  const onSuccess = () => {
    actionRef?.current?.reload?.();
  };

  const handleRequest = (paramsData: any) => {
    return getDevicePage({ ...paramsData, ...searchParams, ...(params || {}) });
  };

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
      setSearchParams(
        realKey
          ? {
              classType: Number(realKey),
            }
          : {},
      );
      const tableColumns = TabColumnsMap?.get(Number(realKey)) || [];
      setColumns([...getOtColumns(onDetailClick), ...tableColumns]);
      actionRef.current?.reloadAndRest?.();
    },
    [tabItems, passAuthority],
  );

  useEffect(() => {
    if (params?.siteIds) {
      getTabs({ ...(params || {}) }).then(({ data: tabData }) => {
        if (Array.isArray(tabData)) {
          const items = (tabData || []).map((item) => {
            return {
              id: item.typeId ?? '',
              label: item.typeName,
              value: item.count,
            };
          });
          const key = 'tab' + items[0]?.id;
          setTabItems(items);
          onTabChange(key);
        } else {
          setTabItems([]);
        }
      });
    }
  }, [params]);

  const tabItemList = tabItems.map((item, index) => {
    const key = 'tab' + item.id;
    return {
      key,
      label: (
        <>
          <span>
            {item.label}
            {item.id && renderBadge(item.value, activeTab === key)}
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
        toolBarRender={() => [<></>]}
        request={handleRequest}
        manualRequest={true}
        rowKey="deviceId"
        resizable
        expandable={{
          childrenColumnName: 'childDeviceList',
          expandIcon: ({ expanded, expandable, record, onExpand }) => {
            return (
              <>
                {expandable ? (
                  <>
                    {expanded ? (
                      <CaretDownFilled
                        className="mr8 cursor table-expand-icon"
                        onClick={(e) => onExpand(record, e)}
                      />
                    ) : (
                      <CaretRightFilled
                        className="mr8 cursor table-expand-icon"
                        onClick={(e) => onExpand(record, e)}
                      />
                    )}
                  </>
                ) : (
                  <span className="mr8 table-expand-icon"></span>
                )}
              </>
            );
          },
        }}
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
