/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2023-12-04 13:59:16
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\exchange-monitor\TravelRecord\index.tsx
 */
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { useHistory, useModel } from 'umi';
import { ExportOutlined } from '@ant-design/icons';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { getPage } from './service';
import type { DeviceDataType } from '@/services/equipment';
import { getProductTypeList } from '@/services/equipment';
import { FormTypeEnum } from '@/components/SchemaForm';
import EquipForm from '@/components/EquipForm';
import { useSiteColumn, useSearchSelect, useAuthority } from '@/hooks';
import type { SearchParams } from '@/hooks/useSearchSelect';
import { formatMessage } from '@/utils';
import { FormattedMessage } from 'umi';
import { getLocale } from '@/utils';
import moment from 'moment';

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
        <FormattedMessage
          id="common.add1"
          defaultMessage={formatMessage({ id: 'exchangeMonitor.export', defaultMessage: '导出' })}
        />
      </Button>,
    ],
    [],
  );
  const rowBar = (_: any, record: DeviceDataType) => (
    <>
      <Button type="link" size="small" key="detail">
        <FormattedMessage id="exchangeMonitor.checkTrack" defaultMessage="查看轨迹" />
      </Button>
    </>
  );
  const columns = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      {
        title: formatMessage({ id: 'exchangeMonitor.vehicleSearch', defaultMessage: '车辆搜索' }),
        dataIndex: 'vin',
        width: 200,
        ellipsis: true,
        fieldProps: {
          placeholder: formatMessage({
            id: 'exchangeMonitor.recordSearchPlaceholder',
            defaultMessage: '请输入车架号/车牌号/出厂SN编号',
          }),
        },
        hideInTable: true,
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
        title: formatMessage({ id: 'exchangeMonitor.startPoint', defaultMessage: '起点' }),
        dataIndex: 'start',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.startTime', defaultMessage: '起始时间' }),
        dataIndex: 'startTime',
        valueType: 'dateRange',
        fieldProps: {
          format: getLocale().dateFormat,
        },
        render: (_, record) => <span>{record.createTime}</span>,
        search: {
          transform: (value) => {
            return {
              startTime: moment(value[0]).format('YYYY-MM-DD'),
              endTime: moment(value[1]).format('YYYY-MM-DD'),
            };
          },
        },
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.endPoint', defaultMessage: '终点' }),
        dataIndex: 'end',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.endTime', defaultMessage: '结束时间' }),
        dataIndex: 'endTime',
        valueType: 'dateRange',
        fieldProps: {
          format: getLocale().dateFormat,
        },
        render: (_, record) => <span>{record.createTime}</span>,
        search: {
          transform: (value) => {
            return {
              startTime: moment(value[0]).format('YYYY-MM-DD'),
              endTime: moment(value[1]).format('YYYY-MM-DD'),
            };
          },
        },
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.totalEnergy', defaultMessage: '总能耗' }),
        dataIndex: 'totalEnergyConsumption',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.averageEnergy',
          defaultMessage: '平均能耗(KWH/KM)',
        }),
        dataIndex: 'averageEnergyConsumptionKm',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.driveMileage', defaultMessage: '行驶里程' }),
        dataIndex: 'driveMileage',
        width: 200,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.driveTime', defaultMessage: '行驶时长(min)' }),
        dataIndex: 'driveTime',
        width: 200,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.fleet', defaultMessage: '车队' }),
        dataIndex: 'fleet',
        width: 150,
        ellipsis: true,
        fieldProps: {
          placeholder: formatMessage({
            id: 'exchangeMonitor.fleetPlaceholder',
            defaultMessage: '请选择车型名称',
          }),
        },
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.gunChargeCapacity',
          defaultMessage: '插枪充电量',
        }),
        dataIndex: 'gunChargeCapacity',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.startPointSOC', defaultMessage: '起点SOC' }),
        dataIndex: 'startSoc',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.endPointSOC', defaultMessage: '终点SOC' }),
        dataIndex: 'endSoc',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.socTotalEnergyConsumption',
          defaultMessage: 'SOC折算总能耗',
        }),
        dataIndex: 'socTotalEnergyConsumption',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.socAverageEnergyConsumption',
          defaultMessage: 'SOC折算平均能耗',
        }),
        dataIndex: 'socAverageEnergyConsumption',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.dischargeCapacity', defaultMessage: '放电量' }),
        dataIndex: 'dischargeCapacity',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.averageDischargeCapacity',
          defaultMessage: '平均放电量',
        }),
        dataIndex: 'averageDischargeCapacity',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.averageDischargeCapacityH',
          defaultMessage: '平均放电量(H)',
        }),
        dataIndex: 'averageDischargeCapacityH',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.startMileage', defaultMessage: '起点里程表' }),
        dataIndex: 'startMileage',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.endMileage', defaultMessage: '终点里程表' }),
        dataIndex: 'endMileage',
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
        title: formatMessage({ id: 'exchangeMonitor.time', defaultMessage: '时间' }),
        dataIndex: 'createTime',
        valueType: 'dateRange',
        fieldProps: {
          format: getLocale().dateFormat,
        },
        render: (_, record) => <span>{record.createTime}</span>,
        search: {
          transform: (value) => {
            return {
              startTime: moment(value[0]).format('YYYY-MM-DD'),
              endTime: moment(value[1]).format('YYYY-MM-DD'),
            };
          },
        },
        width: 150,
        ellipsis: true,
        hideInTable: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.createTime', defaultMessage: '创建时间' }),
        dataIndex: 'createTime',
        valueType: 'dateRange',
        fieldProps: {
          format: getLocale().dateFormat,
        },
        render: (_, record) => <span>{record.createTime}</span>,
        search: {
          transform: (value) => {
            return {
              startTime: moment(value[0]).format('YYYY-MM-DD'),
              endTime: moment(value[1]).format('YYYY-MM-DD'),
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
  }, [siteColumn, productTypeColumn]);

  return (
    <>
      <YTProTable
        actionRef={actionRef}
        columns={columns}
        toolBarRender={toolBar}
        request={handleRequest}
      />
    </>
  );
};

export default DeviceList;
