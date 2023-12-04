/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2023-12-04 10:13:56
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\car-list\index.tsx
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
import { onlineStatus, vehicleDrivingStatus } from '@/utils/dictionary';
import { getPage, unbindDevice } from './service';
import type { DeviceDataType } from '@/services/equipment';
import { getDevicePage, getProductTypeList } from '@/services/equipment';
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
        <PlusOutlined />
        <FormattedMessage id="common.add" defaultMessage="添加" />
      </Button>,
      <Button type="primary" key="add">
        <DeleteOutlined />
        <FormattedMessage id="common.add1" defaultMessage="作废" />
      </Button>,
      <Button type="primary" key="add">
        <ExportOutlined />
        <FormattedMessage id="common.add1" defaultMessage="导出" />
      </Button>,
      <Button type="primary" key="add">
        <ImportOutlined />
        <FormattedMessage id="common.add1" defaultMessage="导入" />
      </Button>,
      <Button type="primary" key="add">
        <DownloadOutlined />
        <FormattedMessage id="common.add1" defaultMessage="模版下载" />
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
        title: formatMessage({ id: 'common.deviceName1', defaultMessage: '车辆搜索' }),
        dataIndex: 'carName',
        width: 200,
        ellipsis: true,
        fieldProps: {
          placeholder: '请输入车架号/车牌号/出厂SN编号',
        },
        hideInTable: true,
      },
      {
        title: formatMessage({ id: 'common.deviceName1', defaultMessage: '车辆名称' }),
        dataIndex: 'carName',
        width: 200,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.deviceCode1', defaultMessage: '车架号' }),
        dataIndex: 'vin',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '车牌号' }),
        dataIndex: 'carNumber',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.model1', defaultMessage: '车型名称' }),
        dataIndex: 'modelName',
        width: 150,
        ellipsis: true,
        fieldProps: {
          placeholder: '请选择车型名称',
        },
      },
      {
        title: formatMessage({ id: 'common.productType1', defaultMessage: '使用性质' }),
        dataIndex: 'useCharacter',
        width: 120,
        ellipsis: true,
        fieldProps: {
          placeholder: '请选择使用性质',
        },
      },
      {
        title: formatMessage({ id: 'equipmentList.affSite1', defaultMessage: '车辆行驶状态' }),
        dataIndex: 'driveStatus',
        valueEnum: vehicleDrivingStatus,
        width: 150,
        ellipsis: true,
        fieldProps: {
          placeholder: '请选择车辆行驶状态',
        },
      },
      {
        title: formatMessage({ id: 'equipmentList.comStatus1', defaultMessage: '所属车队' }),
        dataIndex: 'fleet',
        fieldProps: {
          placeholder: '请选择车队',
        },
        width: 120,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '出厂SN编号' }),
        dataIndex: 'factorySn',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '创建人' }),
        dataIndex: 'createBy',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.addTime1', defaultMessage: '创建时间' }),
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
