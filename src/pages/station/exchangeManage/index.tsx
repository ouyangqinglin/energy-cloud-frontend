/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2024-03-11 11:15:25
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\exchangeManage\index.tsx
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
import { exchangeSiteStatus, onlineStatus, operateStatus, vehicleType } from '@/utils/dictionary';
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
import { getLocale } from '@/utils';
const isUS = getLocale().isEnUS;

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
        <FormattedMessage id="common.add1" defaultMessage="导出" />
      </Button>,
      <Button type="primary" key="add">
        <PlusOutlined />
        <FormattedMessage id="common.add" defaultMessage="添加" />
      </Button>,
      <Button type="primary" key="add">
        <DeleteOutlined />
        <FormattedMessage id="common.add1" defaultMessage="作废" />
      </Button>,
    ],
    [authorityMap, onAddClick],
  );
  const rowBar = (_: any, record: DeviceDataType) => (
    <>
      <Button type="link" size="small" key="detail">
        <FormattedMessage id="common.viewDetail1" defaultMessage="查看" />
      </Button>
      <Button type="link" size="small" key="detail">
        <FormattedMessage id="common.viewDetail1" defaultMessage="编辑" />
      </Button>
    </>
  );
  const columns = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '换电站编号' }),
        dataIndex: 'id',
        width: 150,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'common.deviceName1', defaultMessage: '换电站名称' }),
        dataIndex: 'exchangeSiteName',
        width: 200,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'common.deviceCode1', defaultMessage: '省/市/区' }),
        dataIndex: 'provinceCityDistrict',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '详细地址' }),
        dataIndex: 'address',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.model1', defaultMessage: '换电站属性' }),
        dataIndex: 'exchangeSiteProperty',
        valueType: 'select',
        valueEnum: exchangeSiteStatus,
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.productType1', defaultMessage: '运营状态' }),
        dataIndex: 'status',
        valueEnum: operateStatus,
        width: 120,
        ellipsis: true,
        fieldProps: {
          placeholder: '请选择车辆行驶状态',
        },
      },
      {
        title: formatMessage({ id: 'equipmentList.affSite1', defaultMessage: '换电站型号' }),
        dataIndex: 'exchangeSiteModel',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'equipmentList.comStatus1', defaultMessage: '服务车辆类型' }),
        dataIndex: 'serviceType',
        valueType: 'select',
        valueEnum: vehicleType,
        fieldProps: {
          placeholder: '请选择车队',
        },
        width: 120,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '电池仓位数' }),
        dataIndex: 'batteryCompartmentNumber',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '充电机数量' }),
        dataIndex: 'chargerNumber',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '换电站供应商' }),
        dataIndex: 'exchangeSiteSupplier',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.xxx', defaultMessage: '关联换电场' }),
        dataIndex: 'connectExchangePlace',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.xxx', defaultMessage: '创建人' }),
        dataIndex: 'createBy',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.addTime', defaultMessage: '创建时间' }),
        dataIndex: 'createTime',
        valueType: 'dateRange',
        fieldProps: {
          format: isUS ? 'MM/DD/YYYY' : 'YYYY-MM-DD',
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
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '最后修改人' }),
        dataIndex: 'updateBy',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.upTime1', defaultMessage: '最后修改时间' }),
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
  }, [siteColumn, productTypeColumn]);

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
