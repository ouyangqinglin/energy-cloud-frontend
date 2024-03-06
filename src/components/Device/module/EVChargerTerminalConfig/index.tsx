import Detail from '@/components/Detail';
import { Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';
import styles from './index.less';
import { useMemo, useEffect, useRef, useContext, useState } from 'react';
import { formatMessage } from '@/utils';
import DeviceContext from '@/components/Device/Context/DeviceContext';
import { useRequest } from 'umi';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { OrderDataType } from './data';
import { columns as defaultColumns } from './config';
import { getEmsAssociationDevice } from '@/services/equipment';
import OrderDetail from './OrderDetail/index';

export type EVChargerOrderInfoType = {
  deviceId?: string;
};

const EVChargerOrderInfo: React.FC<EVChargerOrderInfoType> = (props) => {
  const { deviceId } = props;
  const { data: deviceData } = useContext(DeviceContext);
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [curveVisible, setCurveVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<OrderDataType>({});

  const [columns, setColumns] = useState<ProColumns<OrderDataType>[]>(defaultColumns(false));
  console.log('deviceData>>', deviceData);
  console.log('props>>', props);
  const actionRef = useRef<ActionType>();
  const {
    data: associationData,
    run,
    loading,
  } = useRequest(getEmsAssociationDevice, {
    manual: true,
  });
  const mockData = [
    {
      gunId: '1',
      keyId: '2',
      orderNumber: '1',
      userId: '1',
      deviceId: '1',
      gunType: '1',
      auxiliarySourceType: '1',
      chargeStrategyParame: '1',
      startSOC: '1',
      endSOC: '1',
      stopReason: '1',
      stopId: '1',
      stopChildId: '1',
      chargeDuration: '1',
      starmeterRead: '1',
      endmeterRead: '1',
      totalElectricityCost: '1',
      serviceType: '1',
      chargeMode: '2',
      chargeStrategy: '3',
      startTime: '4',
      endTime: '5',
      carVIN: '6',
      totalElectricityQuantity: '7',
      totalServiceCharge: '1',
      totalCost: '8',
    },
  ];
  useEffect(() => {
    if (deviceId) {
      run({ deviceId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: 'today',
        label: formatMessage({ id: 'device.todayOrder', defaultMessage: '今日订单' }),
      },
      {
        key: 'history',
        label: formatMessage({ id: 'device.historyOrder', defaultMessage: '历史订单' }),
      },
    ];
  }, []);

  const onTabChange = (value: string) => {
    if (value == 'history') {
      setColumns(defaultColumns(true));
    } else {
      setColumns(defaultColumns(false));
    }
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
            setAddVisible(true);
            setCurrentRow(rowData);
          }}
        >
          {formatMessage({ id: 'taskManage.view', defaultMessage: '查看' })}
        </Button>,
      ];
    },
  };
  return (
    <div>
      <Detail.Label
        title={formatMessage({ id: 'device.terminalConfig', defaultMessage: '终端配置' })}
        className="mt16"
      />
      <YTProTable<OrderDataType>
        loading={loading}
        actionRef={actionRef}
        columns={[...columns, actionColumn]}
        toolBarRender={false}
        dataSource={mockData}
        scroll={{ y: 'auto' }}
      />
      <OrderDetail
        onCancel={() => {
          setAddVisible(false);
        }}
        visible={addVisible}
        values={currentRow}
      />
    </div>
  );
};
export default EVChargerOrderInfo;
