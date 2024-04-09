/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2023-12-04 10:13:56
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\car-list\index.tsx
 */
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { useModel } from 'umi';
import {
  PlusOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { vehicleDrivingStatus } from '@/utils/dictionary';
import { getPage } from './service';
import type { DeviceDataType } from '@/services/equipment';
import { getProductTypeList } from '@/services/equipment';
import { FormTypeEnum } from '@/components/SchemaForm';
import EquipForm from '@/components/EquipForm';
import { useSiteColumn, useSearchSelect, useAuthority } from '@/hooks';
import type { SearchParams } from '@/hooks/useSearchSelect';
import { formatMessage } from '@/utils';
import { FormattedMessage } from 'umi';
import DeviceSn from './deviceSn';
import { getLocale } from '@/utils';
import moment from 'moment';
import { YTDATERANGE } from '@/components/YTDateRange';
import type { YTDATERANGEVALUETYPE } from '@/components/YTDateRange';
import { ProConfigProvider } from '@ant-design/pro-components';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';
type DeviceListProps = {
  isStationChild?: boolean;
};

const DeviceList: React.FC<DeviceListProps> = (props) => {
  const { isStationChild } = props;
  const [open, setOpen] = useState(false);
  const [snOpen, setSnOpen] = useState(false);
  const { siteId } = useModel('station', (model: any) => ({ siteId: model.state?.id || '' }));
  const actionRef = useRef<ActionType>();
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
      title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
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

  const onSuccess = () => {
    actionRef?.current?.reload?.();
  };

  const handleRequest = (params: any) => {
    return getPage({ ...params, ...(isStationChild ? { siteId } : {}) });
  };

  const toolBar = useCallback(
    () => [
      <Button type="primary" key="add">
        <PlusOutlined />
        <FormattedMessage id="common.new" defaultMessage="添加" />
      </Button>,
      <Button type="primary" key="cancel">
        <DeleteOutlined />
        <FormattedMessage id="exchangeMonitor.cancel" defaultMessage="作废" />
      </Button>,
      <Button type="primary" key="export">
        <ExportOutlined />
        <FormattedMessage id="common.export" defaultMessage="导出" />
      </Button>,
      <Button type="primary" key="import">
        <ImportOutlined />
        <FormattedMessage id="common.import" defaultMessage="导入" />
      </Button>,
      <Button type="primary" key="templateDownload">
        <DownloadOutlined />
        <FormattedMessage id="device.templateDownload" defaultMessage="模版下载" />
      </Button>,
    ],
    [authorityMap, onAddClick],
  );
  const rowBar = (_: any, record: DeviceDataType) => (
    <>
      <Button type="link" size="small" key="detail">
        <FormattedMessage id="common.view" defaultMessage="查看" />
      </Button>
      <Button type="link" size="small" key="detail">
        <FormattedMessage id="common.edit" defaultMessage="编辑" />
      </Button>
    </>
  );
  const columns = useMemo<ProColumns<DeviceDataType, YTDATERANGEVALUETYPE>[]>(() => {
    return [
      {
        title: formatMessage({ id: 'exchangeMonitor.vehicleSearch', defaultMessage: '车辆搜索' }),
        dataIndex: 'carName',
        width: 200,
        ellipsis: true,
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
        },
        hideInTable: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.vehicleName', defaultMessage: '车辆名称' }),
        dataIndex: 'carName',
        width: 200,
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
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.vehicleModelName',
          defaultMessage: '车型名称',
        }),
        dataIndex: 'modelName',
        width: 150,
        ellipsis: true,
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.userNature', defaultMessage: '使用性质' }),
        dataIndex: 'useCharacter',
        width: 120,
        ellipsis: true,
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.driveStatus', defaultMessage: '车辆行驶状态' }),
        dataIndex: 'driveStatus',
        valueEnum: vehicleDrivingStatus,
        width: 150,
        ellipsis: true,
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.fleet', defaultMessage: '所属车队' }),
        dataIndex: 'fleet',
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
        },
        width: 120,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.factorySn', defaultMessage: '出厂SN编号' }),
        dataIndex: 'factorySn',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.createBy', defaultMessage: '创建人' }),
        dataIndex: 'createBy',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.createTime', defaultMessage: '创建时间' }),
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
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.updateBy', defaultMessage: '最后修改人' }),
        dataIndex: 'updateBy',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.updateTime', defaultMessage: '最后修改时间' }),
        dataIndex: 'updateTime',
        valueType: 'dateTime',
        hideInSearch: true,
        width: 150,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'common.operate', defaultMessage: '操作' }),
        valueType: 'option',
        width: 120,
        fixed: 'right',
        render: rowBar,
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
