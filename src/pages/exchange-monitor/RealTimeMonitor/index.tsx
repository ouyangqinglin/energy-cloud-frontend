/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2023-12-05 13:49:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\exchange-monitor\RealTimeMonitor\index.tsx
 */
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Button, Modal, message, Row, Col } from 'antd';
import { useHistory, useModel } from 'umi';
import { Card } from 'antd';
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
import { getPage, unbindDevice } from './service';
import type { DeviceDataType } from '@/services/equipment';
import { getProductTypeList } from '@/services/equipment';
import { FormTypeEnum } from '@/components/SchemaForm';
import EquipForm from '@/components/EquipForm';
import { useSiteColumn, useSearchSelect, useAuthority } from '@/hooks';
import type { SearchParams } from '@/hooks/useSearchSelect';
import { formatMessage, startExchangeTime } from '@/utils';
import { FormattedMessage } from 'umi';
import DeviceSn from './deviceSn';
import { statisticsItems } from './helper';
import styles from './index.less';
import { useInterval } from 'ahooks';

type DeviceListProps = {
  isStationChild?: boolean;
};

const statisticsData: any = {
  site: 12,
  totalChargePower: 495681.62,
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
  startExchangeTime();
  const [exchangeNum, setExchangeNum] = useState(window.exchangeData.exchangeCount);

  useInterval(() => {
    setExchangeNum(window.exchangeData.exchangeCount);
  }, 1000 * 60 * 5);

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
    ],
    [authorityMap, onAddClick],
  );
  const rowBar = (_: any, record: DeviceDataType) => (
    <>
      <Button type="link" size="small" key="detail">
        <FormattedMessage id="common.viewDetail1" defaultMessage="详情" />
      </Button>
    </>
  );
  const columns = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      {
        title: formatMessage({ id: 'common.deviceName1', defaultMessage: '换电站' }),
        dataIndex: 'exchangeSiteId',
        width: 200,
        ellipsis: true,
        fieldProps: {
          placeholder: '请输入换电站编号/换电站名税',
        },
        hideInTable: true,
      },
      {
        title: formatMessage({ id: 'common.deviceCode1', defaultMessage: '换电站编号' }),
        dataIndex: 'exchangeSiteId',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.deviceName1', defaultMessage: '换电站名称' }),
        dataIndex: 'exchangeSiteName',
        width: 200,
        ellipsis: true,
        hideInSearch: true,
      },

      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '换电站数量' }),
        dataIndex: 'exchangeSiteNumber',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.model1', defaultMessage: '充电桩可用数量' }),
        dataIndex: 'chargingStationAvailableNumber',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.productType1', defaultMessage: '充电机可用数量' }),
        dataIndex: 'chargerAvailableNumber',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'equipmentList.affSite1', defaultMessage: '电池仓数量' }),
        dataIndex: 'batteryCompartmentNumber',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'equipmentList.comStatus1', defaultMessage: '总功率' }),
        dataIndex: 'totalPower',
        valueType: 'select',
        valueEnum: onlineStatus,
        hideInSearch: true,
        width: 120,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial1', defaultMessage: '地址' }),
        dataIndex: 'address',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.addTime1', defaultMessage: '更新时间' }),
        dataIndex: 'updateTime',
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
        title: formatMessage({ id: 'common.operate', defaultMessage: '操作' }),
        valueType: 'option',
        width: 120,
        fixed: 'right',
        render: rowBar,
      },
    ];
  }, [siteColumn, productTypeColumn]);

  const statistics = useMemo(() => {
    return statisticsItems.map((item) => {
      return (
        <Col span={8} key={item.field}>
          <div className={`card-wrap shadow flex p24 ${styles.contain}`}>
            <img className={styles.icon} src={item.icon} />
            <div>
              <div className={styles.title}>{item.label}</div>
              <div className={styles.num}>
                {{ ...statisticsData, exchangeNum }?.[item.field]}
                <span className={styles.unit}>{item.unit}</span>
              </div>
            </div>
          </div>
        </Col>
      );
    });
  }, [exchangeNum]);

  return (
    <>
      <div className="p20">
        <Row gutter={20}>{statistics}</Row>
      </div>
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
