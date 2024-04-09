/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2023-12-04 13:58:10
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\exchange-monitor\ExchangeRecord\index.tsx
 */
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { useHistory, useModel } from 'umi';
import { ExportOutlined } from '@ant-design/icons';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { onlineStatus } from '@/utils/dictionary';
import { getPage } from './service';
import type { DeviceDataType } from '@/services/equipment';
import { formatMessage } from '@/utils';
import { FormattedMessage } from 'umi';
import { getLocale } from '@/utils';
import { YTDATERANGE } from '@/components/YTDateRange';
import { ProConfigProvider } from '@ant-design/pro-components';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';

type DeviceListProps = {
  isStationChild?: boolean;
};

const DeviceList: React.FC<DeviceListProps> = (props) => {
  const { isStationChild } = props;
  const [open, setOpen] = useState(false);
  const [snOpen, setSnOpen] = useState(false);
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const actionRef = useRef<ActionType>();

  const onCancelSn = useCallback(() => {
    setSnOpen(false);
  }, []);

  const onSwitchOpen = useCallback(() => {
    setOpen((data) => !data);
  }, []);

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
          defaultMessage={formatMessage({ id: 'exchangeMonitor.export', defaultMessage: '导出:' })}
        />
      </Button>,
    ],
    [],
  );
  const columns = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      {
        title: formatMessage({
          id: 'exchangeMonitor.exchangeSiteName',
          defaultMessage: '换电场名称:',
        }),
        dataIndex: 'exchangeSiteName',
        width: 200,
        ellipsis: true,
        fieldProps: {
          placeholder: formatMessage({
            id: 'exchangeMonitor.exchangeSiteNamePlaceholder',
            defaultMessage: '请选择换电场名称',
          }),
        },
        hideInTable: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.exchangeNumber',
          defaultMessage: '换电流水号',
        }),
        dataIndex: 'transNo',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.exchangeStationNumber',
          defaultMessage: '换电站编号',
        }),
        dataIndex: 'exchangeSiteId',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.exchangeStationName',
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
        width: 150,
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
        width: 120,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.StorageBatterySn',
          defaultMessage: '存电池SN编码',
        }),
        dataIndex: 'storageBatterySn',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.TakeBatterySn',
          defaultMessage: '取电池SN编码',
        }),
        dataIndex: 'takeBatterySn',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.StorageBatterSOC',
          defaultMessage: '存电池SOC',
        }),
        dataIndex: 'storageBatterySoc',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.TakeBatterSOC', defaultMessage: '取电池SOC' }),
        dataIndex: 'takeBatterySoc',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.time', defaultMessage: '时间' }),
        dataIndex: 'createTime',
        valueType: YTDATERANGE,
        fieldProps: {
          dateFormat: getLocale().dateFormat,
          format: 'YYYY-MM-DD',
        },
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
          id: 'exchangeMonitor.exchangeStartTime',
          defaultMessage: '换电起始时间',
        }),
        dataIndex: 'exchangeStartTime',
        valueType: YTDATERANGE,
        fieldProps: {
          dateFormat: getLocale().dateFormat,
          format: 'YYYY-MM-DD',
        },
        render: (_, record) => <span>{record.exchangeStartTime}</span>,
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
          id: 'exchangeMonitor.exchangeEndTime',
          defaultMessage: '换电结束时间',
        }),
        dataIndex: 'exchangeEndTime',
        valueType: YTDATERANGE,
        fieldProps: {
          dateFormat: getLocale().dateFormat,
          format: 'YYYY-MM-DD',
        },
        render: (_, record) => <span>{record.exchangeEndTime}</span>,
        search: {
          transform: (value) => {
            return {
              startTime: value[0],
              endTime: value[1],
            };
          },
        },
        width: 150,
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.recordSearch',
          defaultMessage: '换电记录搜索:',
        }),
        dataIndex: 'name',
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
          id: 'exchangeMonitor.exchangeStationPower',
          defaultMessage: '换电工位',
        }),
        dataIndex: 'exchangeWorkstation',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
    ];
  }, []);

  return (
    <>
      <ProConfigProvider
        valueTypeMap={{
          ...YTDateRangeValueTypeMap,
        }}
      >
        <YTProTable
          actionRef={actionRef}
          columns={columns}
          toolBarRender={toolBar}
          request={handleRequest}
        />
      </ProConfigProvider>
    </>
  );
};

export default DeviceList;
