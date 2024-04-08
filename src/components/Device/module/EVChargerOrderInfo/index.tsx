import Detail from '@/components/Detail';
import { Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';
import styles from './index.less';
import { useMemo, useRef, useState } from 'react';
import { formatMessage } from '@/utils';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { OrderDataType } from './data';
import { columns as defaultColumns } from './config';
import { getytOrder } from '@/services/equipment';
import OrderDetail from './OrderDetail/index';
import OrderCurve from './OrderCurve/index';
import { ProConfigProvider } from '@ant-design/pro-components';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';
export type EVChargerOrderInfoType = {
  deviceId?: string;
};

const EVChargerOrderInfo: React.FC<EVChargerOrderInfoType> = (props) => {
  const { deviceId } = props;
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [curveVisible, setCurveVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<OrderDataType>({});
  const [orderType, setOrderType] = useState<string>('0');
  const [orderId, setOrderId] = useState<string>('0');

  const [columns, setColumns] = useState<ProColumns<OrderDataType>[]>(defaultColumns(false));
  const actionRef = useRef<ActionType>();

  const handleRequest = (params: any) => {
    return getytOrder({
      ...params,
      deviceId,
      type: orderType,
    });
  };

  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '0',
        label: formatMessage({ id: 'device.todayOrder', defaultMessage: '今日订单' }),
      },
      {
        key: '1',
        label: formatMessage({ id: 'device.historyOrder', defaultMessage: '历史订单' }),
      },
    ];
  }, []);

  const onTabChange = (value: string) => {
    setOrderType(value);
    if (value == '1') {
      setColumns(defaultColumns(true));
    } else {
      setColumns(defaultColumns(false));
    }
    actionRef?.current?.reload?.();
  };
  const actionColumn: ProColumns = {
    title: formatMessage({ id: 'alarmManage.operate', defaultMessage: '操作' }),
    valueType: 'option',
    width: 100,
    fixed: 'right',
    render: (_, record) => {
      const rowData = record as OrderDataType;
      return [
        <Button
          type="link"
          size="small"
          key="edit"
          onClick={() => {
            setDetailVisible(true);
            setCurrentRow(rowData);
          }}
        >
          {formatMessage({ id: 'taskManage.view', defaultMessage: '查看' })}
        </Button>,
        <Button
          type="link"
          size="small"
          key="edit"
          onClick={() => {
            setCurveVisible(true);
            setOrderId(rowData?.id || '');
          }}
        >
          {formatMessage({ id: 'device.curve', defaultMessage: '曲线' })}
        </Button>,
      ];
    },
  };
  return (
    <div>
      <Detail.Label
        title={formatMessage({ id: 'device.orderInformation', defaultMessage: '订单信息' })}
        className="mt16"
      />
      <Tabs className={styles.tabs} items={tabItems} onChange={onTabChange} />

      <ProConfigProvider
        valueTypeMap={{
          ...YTDateRangeValueTypeMap,
        }}
      >
        <YTProTable<OrderDataType>
          actionRef={actionRef}
          columns={[...columns, actionColumn]}
          toolBarRender={false}
          request={handleRequest}
          scroll={{ y: 'auto' }}
        />
        <OrderDetail
          onCancel={() => {
            setDetailVisible(false);
          }}
          visible={detailVisible}
          values={currentRow}
        />
        <OrderCurve
          onCancel={() => {
            setCurveVisible(false);
          }}
          orderId={orderId}
          visible={curveVisible}
        />
      </ProConfigProvider>
    </div>
  );
};
export default EVChargerOrderInfo;
