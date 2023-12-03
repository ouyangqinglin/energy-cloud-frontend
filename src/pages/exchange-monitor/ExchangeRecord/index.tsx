/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2023-12-01 15:42:16
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\equipment-list\index.tsx
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
import { onlineStatus } from '@/utils/dictionary';
import { unbindDevice } from './service';
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
    return getDevicePage({ ...params, ...(isStationChild ? { siteId } : {}) });
  };

  const toolBar = useCallback(
    () =>
      authorityMap.get('iot:siteManage:siteConfig:deviceManage:add') ||
      authorityMap.get('iot:device:add')
        ? [
            <Button type="primary" key="add">
              <ExportOutlined />
              <FormattedMessage id="common.add1" defaultMessage="导出" />
            </Button>,
          ]
        : [],
    [authorityMap],
  );
  const columns = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      {
        title: formatMessage({ id: 'common.deviceName1', defaultMessage: '换电场名称:' }),
        dataIndex: 'name',
        width: 200,
        ellipsis: true,
        fieldProps: {
          placeholder: '请选择换电场名称',
        },
        hideInTable: true,
      },

      {
        title: formatMessage({ id: 'common.deviceCode1', defaultMessage: '换电流水号' }),
        dataIndex: 'deviceId',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '换电站编号' }),
        dataIndex: 'sn',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.deviceName1', defaultMessage: '换电站名称' }),
        dataIndex: 'name',
        width: 200,
        ellipsis: true,
        fieldProps: {
          placeholder: '请选择换电站名称',
        },
      },
      {
        title: formatMessage({ id: 'common.productType1', defaultMessage: '车架号' }),
        dataIndex: 'productTypeName',
        width: 120,
        ellipsis: true,
        fieldProps: {
          placeholder: '请选择使用性质',
        },
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'equipmentList.affSite1', defaultMessage: '车牌号' }),
        dataIndex: 'siteName',
        width: 150,
        ellipsis: true,
        fieldProps: {
          placeholder: '请选择车辆行驶状态',
        },
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'equipmentList.comStatus1', defaultMessage: '车队' }),
        dataIndex: 'connectStatus',
        valueType: 'select',
        valueEnum: onlineStatus,
        fieldProps: {
          placeholder: '请选择车队',
        },
        width: 120,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '存电池SN编码' }),
        dataIndex: 'sn',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '取电池SN编码' }),
        dataIndex: 'sn',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '存电池SOC' }),
        dataIndex: 'sn',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '取电池SOC' }),
        dataIndex: 'sn',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.addTime1', defaultMessage: '时间' }),
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
        title: formatMessage({ id: 'common.addTime1', defaultMessage: '换电起始时间' }),
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
        title: formatMessage({ id: 'common.addTime1', defaultMessage: '换电结束时间' }),
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
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'common.deviceName1', defaultMessage: '换电记录搜索:' }),
        dataIndex: 'name',
        width: 200,
        ellipsis: true,
        fieldProps: {
          placeholder: '请输入车架号/车牌号/电池SN编号',
        },
        hideInTable: true,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '换电工位' }),
        dataIndex: 'sn',
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
