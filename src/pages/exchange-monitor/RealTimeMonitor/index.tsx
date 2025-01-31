/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 13:38:22
 * @LastEditTime: 2023-12-05 13:49:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\exchange-monitor\RealTimeMonitor\index.tsx
 */
import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Button, Row, Col } from 'antd';
import { useHistory, useModel } from 'umi';
import { ExportOutlined } from '@ant-design/icons';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { onlineStatus } from '@/utils/dictionary';
import { getPage } from './service';
import type { DeviceDataType } from '@/services/equipment';
import { getProductTypeList } from '@/services/equipment';
import { useSiteColumn, useSearchSelect, useAuthority } from '@/hooks';
import type { SearchParams } from '@/hooks/useSearchSelect';
import { formatMessage, startExchangeTime } from '@/utils';
import { FormattedMessage } from 'umi';
import { statisticsItems } from './helper';
import styles from './index.less';
import { useInterval } from 'ahooks';
import { getLocale } from '@/utils';
import moment from 'moment';
import { YTDATERANGE } from '@/components/YTDateRange';
import type { YTDATERANGEVALUETYPE } from '@/components/YTDateRange';
import { ProConfigProvider } from '@ant-design/pro-components';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';

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
        <FormattedMessage
          id="exchangeMonitor.export"
          defaultMessage={formatMessage({ id: 'exchangeMonitor.export', defaultMessage: '导出' })}
        />
      </Button>,
    ],
    [authorityMap, onAddClick],
  );
  const rowBar = (_: any, record: DeviceDataType) => (
    <>
      <Button type="link" size="small" key="detail">
        <FormattedMessage
          id="common.viewDetail1"
          defaultMessage={formatMessage({ id: 'exchangeMonitor.detail', defaultMessage: '详情' })}
        />
      </Button>
    </>
  );
  const columns = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      {
        title: formatMessage({ id: 'exchangeMonitor.exchangeStation', defaultMessage: '换电站' }),
        dataIndex: 'exchangeSiteId',
        width: 200,
        ellipsis: true,
        fieldProps: {
          placeholder: formatMessage({
            id: 'exchangeMonitor.exchangeStationPlaceholder',
            defaultMessage: '请输入换电站编号/换电站名税',
          }),
        },
        hideInTable: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.exchangeStationNumber',
          defaultMessage: '换电站编号',
        }),
        dataIndex: 'exchangeSiteId',
        width: 120,
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
        hideInSearch: true,
      },

      {
        title: formatMessage({
          id: 'exchangeMonitor.exchangeStationAmount',
          defaultMessage: '换电站数量',
        }),
        dataIndex: 'exchangeSiteNumber',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.chargeStationUsableNumber',
          defaultMessage: '充电桩可用数量',
        }),
        dataIndex: 'chargingStationAvailableNumber',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.chargeEngineUsableNumber',
          defaultMessage: '充电机可用数量',
        }),
        dataIndex: 'chargerAvailableNumber',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'exchangeMonitor.batteryHouseNumber',
          defaultMessage: '电池仓数量',
        }),
        dataIndex: 'batteryCompartmentNumber',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.totalPower', defaultMessage: '总功率' }),
        dataIndex: 'totalPower',
        valueType: 'select',
        valueEnum: onlineStatus,
        hideInSearch: true,
        width: 120,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.address', defaultMessage: '地址' }),
        dataIndex: 'address',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'exchangeMonitor.updateTime', defaultMessage: '更新时间' }),
        dataIndex: 'updateTime',
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
