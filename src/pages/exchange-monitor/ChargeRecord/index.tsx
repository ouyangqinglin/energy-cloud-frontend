/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2023-12-04 14:09:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\exchange-monitor\ChargeRecord\index.tsx
 */
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Button, Modal, message } from 'antd';
import { useHistory, useModel } from 'umi';
import {
  PlusOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { chargeType, onlineStatus } from '@/utils/dictionary';
import { getPage, unbindDevice } from './service';
import type { DeviceDataType } from '@/services/equipment';
import { getProductTypeList } from '@/services/equipment';
import { FormTypeEnum } from '@/components/SchemaForm';
import EquipForm from '@/components/EquipForm';
import { useSiteColumn, useSearchSelect, useAuthority } from '@/hooks';
import type { SearchParams } from '@/hooks/useSearchSelect';
import { formatMessage } from '@/utils';
import { FormattedMessage } from 'umi';
import DeviceSn from './deviceSn';

type DeviceListProps = {
  isStationChild?: boolean;
};

const DeviceList: React.FC<DeviceListProps> = (props) => {
  const { isStationChild } = props;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [snOpen, setSnOpen] = useState(false);
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
      title: formatMessage({ id: 'exchangeMonitor.productType', defaultMessage: '产品类型' }),
      dataIndex: 'productTypeName',
      formItemProps: {
        name: 'productTypeId',
      },
      hideInTable: true,
    },
    request: requestProductType,
  });
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
  }, [isStationChild]);

  const onDetailClick = useCallback(
    (rowData: DeviceDataType) => {
      history.push({
        pathname: isStationChild ? '/station/device-detail' : '/equipment/device-detail',
        search: `?id=${rowData.deviceId}&productId=${rowData.productId}`,
      });
    },
    [history, isStationChild],
  );

  const onSuccess = () => {
    actionRef?.current?.reload?.();
  };

  const handleRequest = (params: any) => {
    return getPage({ ...params, ...(isStationChild ? { siteId } : {}) });
  };

  const toolBar = useCallback(
    () => [
      <Button type="primary" key="add">
        <ExportOutlined />
        <FormattedMessage
          id="common.add1"
          defaultMessage={formatMessage({ id: 'exchangeMonitor.export', defaultMessage: '导出' })}
        />
      </Button>,
    ],
    [authorityMap],
  );
  const columns = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      {
        title: formatMessage({
          id: 'exchangeMonitor.recordSearch',
          defaultMessage: '换电记录搜索:',
        }),
        dataIndex: 'transNo',
        width: 200,
        ellipsis: true,
        fieldProps: {
          placeholder: formatMessage({
            id: 'exchangeMonitor.recordSearchPlaceholder',
            defaultMessage: '请输入车架号/车牌号/电池SN编号:',
          }),
        },
        hideInTable: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.chargeSerialNumber',
          defaultMessage: '充电流水号',
        }),
        dataIndex: 'transNo',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.ExchangeStationNumber',
          defaultMessage: '换电站编号',
        }),
        dataIndex: 'exchangeSiteId',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.ExchangeStationNumber',
          defaultMessage: '换电站名称',
        }),
        dataIndex: 'exchangeSiteName',
        width: 200,
        ellipsis: true,
        fieldProps: {
          placeholder: formatMessage({
            id: 'exchangeMonitor.ExchangeStationNamePlaceholder',
            defaultMessage: '请选择换电站名称',
          }),
        },
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.chargeType', defaultMessage: '充电类型' }),
        dataIndex: 'chargeType',
        valueEnum: chargeType,
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.batterySn', defaultMessage: '电池SN编码' }),
        dataIndex: 'batterySn',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.time', defaultMessage: '时间' }),
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
        hideInTable: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.ChargeStartTime',
          defaultMessage: '充电起始时间',
        }),
        dataIndex: 'chargeStartTime',
        valueType: 'dateRange',
        render: (_, record) => <span>{record.chargeStartTime}</span>,
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
        hideInSearch: true,
      },

      {
        title: formatMessage({
          id: 'exchangeMonitor.ChargeEndTime',
          defaultMessage: '充电结束时间',
        }),
        dataIndex: 'chargeEndTime',
        valueType: 'dateRange',
        render: (_, record) => <span>{record.chargeEndTime}</span>,
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
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.frameNumber', defaultMessage: '车架号' }),
        dataIndex: 'vin',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.LicensePlateNumber',
          defaultMessage: '车牌号',
        }),
        dataIndex: 'carNumber',
        width: 130,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.fleet', defaultMessage: '车队' }),
        dataIndex: 'fleet',
        valueType: 'select',
        valueEnum: onlineStatus,
        fieldProps: {
          placeholder: formatMessage({
            id: 'exchangeMonitor.fleetPlaceholder',
            defaultMessage: '请选择车队',
          }),
        },
        width: 140,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.ChargeStartSOC',
          defaultMessage: '充电起始SOC',
        }),
        dataIndex: 'chargeStartSoc',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.ChargeEndSOC', defaultMessage: '充电结束SOC' }),
        dataIndex: 'chargeEndSoc',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.ChargeCapacity',
          defaultMessage: '充电量（KWH）',
        }),
        dataIndex: 'chargeCapacity',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.ChargeTime', defaultMessage: '充电时长(S)' }),
        dataIndex: 'chargeTime',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
    ];
  }, []);

  return (
    <>
      <YTProTable
        actionRef={actionRef}
        columns={columns}
        toolBarRender={toolBar}
        request={handleRequest}
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
