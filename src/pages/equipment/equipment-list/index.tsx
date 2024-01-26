/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2024-01-20 10:19:04
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\equipment-list\index.tsx
 */
import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Button, Modal, message, Tooltip } from 'antd';
import { useHistory, useModel } from 'umi';
import {
  CaretDownFilled,
  CaretRightFilled,
  DownOutlined,
  PlusOutlined,
  RightOutlined,
} from '@ant-design/icons';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { removeData, unbindDevice } from './service';
import { onlineStatus } from '@/utils/dict';
import { getDevicePage, DeviceDataType, getProductTypeTree } from '@/services/equipment';
import { FormTypeEnum } from '@/components/SchemaForm';
import EquipForm from '@/components/EquipForm';
import { useSiteColumn, useAuthority } from '@/hooks';
// import { SearchParams } from '@/hooks/useSearchSelect';
import { formatMessage } from '@/utils';
import { FormattedMessage } from 'umi';
import DeviceSn from './deviceSn';
import { productTypeIconMap } from '@/utils/IconUtil';
import { DeviceProductTypeEnum } from '@/utils/dictionary';

type DeviceListProps = {
  isStationChild?: boolean;
};

const DeviceList: React.FC<DeviceListProps> = (props) => {
  const { isStationChild } = props;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [snOpen, setSnOpen] = useState(false);
  const [productTypeList, setProductTypeList] = useState([]);
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const actionRef = useRef<ActionType>();
  const [siteColumn] = useSiteColumn<DeviceDataType>({
    hideInTable: true,
  });
  const { authorityMap } = useAuthority([
    'iot:siteManage:siteConfig:deviceManage:add',
    'iot:siteManage:siteConfig:deviceManage:unbind',
    'iot:device:add',
  ]);

  const requestProductTypeTree = () => {
    return getProductTypeTree().then(({ data }) => {
      setProductTypeList(data || []);
    });
  };

  useEffect(() => {
    requestProductTypeTree();
  }, []);

  const productTypeColumn = {
    title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
    dataIndex: 'productTypeName',
    formItemProps: {
      name: 'productTypeInfo',
    },
    hideInTable: true,
    valueType: 'cascader',
    fieldProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      options: productTypeList,
      changeOnSelect: true,
    },
  };
  const onCancelSn = useCallback(() => {
    setSnOpen(false);
  }, []);

  const onSwitchOpen = useCallback(() => {
    setOpen((data) => !data);
  }, []);

  const onAddClick = useCallback(() => {
    if (isStationChild) {
      setSnOpen(true);
    } else {
      setOpen(true);
    }
  }, []);

  const onDetailClick = useCallback(
    (rowData: DeviceDataType) => {
      history.push({
        pathname: isStationChild ? '/station/device-detail' : '/equipment/device-detail',
        search: `?id=${rowData.deviceId}`,
      });
    },
    [isStationChild],
  );

  const onSuccess = () => {
    actionRef?.current?.reload?.();
  };

  const handleRequest = (params: any) => {
    const { productTypeInfo, ...rest } = params;
    const [productTypeId, productId] = productTypeInfo || [];
    const filters = productId ? { productId } : { productTypeId };
    return getDevicePage({
      ...rest,
      ...filters,
      isFindParentByChild: 1,
      rootFilter: 1,
      ...(isStationChild ? { siteId } : {}),
    });
  };

  const toolBar = useCallback(
    () =>
      (isStationChild && authorityMap.get('iot:siteManage:siteConfig:deviceManage:add')) ||
      (!isStationChild && authorityMap.get('iot:device:add'))
        ? [
            <Button type="primary" key="add" onClick={onAddClick}>
              <PlusOutlined />
              <FormattedMessage id="common.add" defaultMessage="新建" />
            </Button>,
          ]
        : [],
    [authorityMap, isStationChild],
  );
  const rowBar = (_: any, record: DeviceDataType) => (
    <>
      {!isStationChild && record.canBeDeleted !== 0 ? (
        <Button
          className="pl0"
          type="link"
          size="small"
          key="delete"
          onClick={() => {
            Modal.confirm({
              title: formatMessage({ id: 'common.delete', defaultMessage: '删除' }),
              content: formatMessage({
                id: 'equipmentList.deleteTips',
                defaultMessage: '确定要删除该设备吗？',
              }),
              okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
              cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
              onOk: () => {
                return removeData({ deviceId: record.deviceId }).then(({ data }) => {
                  if (data) {
                    message.success(
                      formatMessage({ id: 'common.del', defaultMessage: '删除成功' }),
                    );
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
          <FormattedMessage id="common.delete" defaultMessage="删除" />
        </Button>
      ) : (
        <></>
      )}
      {isStationChild &&
      record.canUnbind == 1 &&
      authorityMap.get('iot:siteManage:siteConfig:deviceManage:unbind') ? (
        <Button
          className="pl0"
          type="link"
          size="small"
          key="unbind"
          onClick={() => {
            Modal.confirm({
              title: formatMessage({ id: 'common.unbind', defaultMessage: '解绑' }),
              content: formatMessage({
                id: 'equipmentList.unbindTips',
                defaultMessage: '确定要解绑该设备吗？',
              }),
              okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
              cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
              onOk: () => {
                return unbindDevice({ deviceId: record.deviceId }).then(({ data }) => {
                  if (data) {
                    message.success(
                      formatMessage({ id: 'common.unbindSuccess', defaultMessage: '解绑成功' }),
                    );
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
          <FormattedMessage id="common.unbind" defaultMessage="解绑" />
        </Button>
      ) : (
        <></>
      )}
    </>
  );
  const columns = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      ...(isStationChild ? [] : [siteColumn]),
      productTypeColumn,
      {
        title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
        dataIndex: 'name',
        ellipsis: true,
        width: 200,
        render: (_, record) => {
          const Component =
            productTypeIconMap.get(record?.productType ?? DeviceProductTypeEnum.Default) ||
            productTypeIconMap.get(DeviceProductTypeEnum.Default);
          return (
            <>
              <span className="cl-primary cursor" onClick={() => onDetailClick(record)}>
                {Component && <Component className="mr8" />}
                {record.name}
              </span>
            </>
          );
        },
      },
      {
        title: formatMessage({ id: 'common.deviceCode', defaultMessage: '设备编码' }),
        dataIndex: 'deviceId',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
        dataIndex: 'sn',
        width: 150,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }),
        dataIndex: 'model',
        width: 220,
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
        dataIndex: 'productTypeName',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'equipmentList.affSite', defaultMessage: '所属站点' }),
        dataIndex: 'siteName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.addTime', defaultMessage: '添加时间' }),
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
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'common.upTime', defaultMessage: '上线时间' }),
        dataIndex: 'sessionStartTime',
        valueType: 'dateTime',
        hideInSearch: true,
        width: 150,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'equipmentList.comStatus', defaultMessage: '通信状态' }),
        dataIndex: 'connectStatus',
        valueType: 'select',
        valueEnum: onlineStatus,
        width: 120,
      },
      {
        title: formatMessage({ id: 'common.operate', defaultMessage: '操作' }),
        valueType: 'option',
        fixed: 'right',
        width: 80,
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
        rowKey="deviceId"
        resizable={true}
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
      {isStationChild ? (
        <>
          <DeviceSn
            open={snOpen}
            onCancel={onCancelSn}
            isStationChild={isStationChild}
            onSuccess={onSuccess}
            //onOk={triggerSubmit}
          />
        </>
      ) : (
        <EquipForm
          open={open}
          onCancel={onSwitchOpen}
          type={FormTypeEnum.Add}
          onSuccess={onSuccess}
          initialValues={isStationChild ? { siteId: parseInt(siteId) } : {}}
        />
      )}
    </>
  );
};

export default DeviceList;
