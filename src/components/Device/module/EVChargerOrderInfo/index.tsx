import Detail from '@/components/Detail';
import { Tabs, Button } from 'antd';
import type { TabsProps } from 'antd';
import styles from './index.less';
import { useMemo, useEffect, useRef } from 'react';
import { formatMessage } from '@/utils';
import { useRequest } from 'umi';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { OrderDataType } from './data';
import { columns } from './config';
import { getEmsAssociationDevice } from '@/services/equipment';

export type EVChargerOrderInfoType = {
  deviceId?: string;
};

const EVChargerOrderInfo: React.FC<EVChargerOrderInfoType> = (props) => {
  const { deviceId } = props;
  const actionRef = useRef<ActionType>();
  const {
    data: associationData,
    run,
    loading,
  } = useRequest(getEmsAssociationDevice, {
    manual: true,
  });
  useEffect(() => {
    if (deviceId) {
      run({ deviceId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: formatMessage({ id: 'device.todayOrder', defaultMessage: '今日订单' }),
      },
      {
        key: '2',
        label: formatMessage({ id: 'device.historyOrder', defaultMessage: '历史订单' }),
      },
    ];
  }, []);

  const onTabChange = (value: string) => {
    console.log('value>>', value);
  };
  const actionColumn: ProColumns = {
    title: formatMessage({ id: 'alarmManage.operate', defaultMessage: '操作' }),
    valueType: 'option',
    width: 100,
    fixed: 'right',
    hideInTable: true,
    render: (_, record) => {
      return (
        <>
          <Button>查看</Button>
          <Button>曲线</Button>
        </>
      );
    },
  };
  return (
    <div>
      <Detail.Label
        title={formatMessage({ id: 'device.orderInformation', defaultMessage: '订单信息' })}
        className="mt16"
      />
      <Tabs className={styles.tabs} items={tabItems} onChange={onTabChange} />
      <YTProTable<OrderDataType>
        className="mb16"
        loading={loading}
        search={false}
        options={false}
        actionRef={actionRef}
        columns={[...columns, actionColumn]}
        toolBarRender={false}
        dataSource={associationData}
        scroll={{ y: 'auto' }}
      />
    </div>
  );
};
export default EVChargerOrderInfo;
