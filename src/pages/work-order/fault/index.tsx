import { useCallback, useRef, useState } from 'react';
import { OrderStatus, type ObstacleReportInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { getObstacleReport, getObstacleReportList, handleOrderComplete } from './service';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import type { ActionType } from '@ant-design/pro-components';
import { useSiteColumn } from '@/hooks';
import { FormRead } from '../components/FormRead';
import { columnsRead } from './configRead';
import { Button } from 'antd';
import YTModalForm from '@/components/YTModalForm';
import { MaintenanceUpdate } from './Update';
import { formatMessage } from '@/utils';
import { ProConfigProvider } from '@ant-design/pro-components';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';

const Customer = (props: { actionRef?: React.Ref<ActionType> }) => {
  const [state, { set }] = useToggle<boolean>(false);
  const [maintenanceModal, { set: setMaintenanceModal }] = useToggle<boolean>(false);
  const [statusModal, { set: setStatusModal }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.READ);
  const [initialValues, setInitialValues] = useState<ObstacleReportInfo>({} as ObstacleReportInfo);
  const actionRef = useRef<ActionType>(null);

  const customConfig: YTProTableCustomProps<ObstacleReportInfo, any> = {
    option: {
      onDetailChange(_, entity) {
        setInitialValues({ ...entity });
        setOperations(FormOperations.READ);
        set(true);
      },
    },
  };

  const [siteSearchColumn] = useSiteColumn({
    hideInTable: true,
    formItemProps: {
      rules: [{ required: true }],
      name: 'siteId',
    },
  });

  const requestList: YTProTableCustomProps<ObstacleReportInfo, ObstacleReportInfo>['request'] = (
    params,
  ) => {
    return getObstacleReportList(params);
  };

  const toggleModal = (visible: boolean) => {
    setStatusModal(visible);
    set(!visible);
  };

  const reload = useCallback(() => {
    actionRef?.current?.reload?.();
  }, []);

  const completeOrder = async (params: any) => {
    await handleOrderComplete({ ...params, ...{ id: initialValues?.id } });
    set(false);
    setStatusModal(false);
    reload();
  };

  return (
    <>
      <ProConfigProvider
        valueTypeMap={{
          ...YTDateRangeValueTypeMap,
        }}
      >
        <YTProTable<ObstacleReportInfo, ObstacleReportInfo>
          columns={[siteSearchColumn, ...columns]}
          toolBarRender={() => []}
          actionRef={actionRef}
          request={requestList}
          rowKey="id"
          search={{
            labelWidth: 70,
          }}
          form={{
            labelAlign: 'left',
          }}
          {...customConfig}
          {...props}
        />
        <FormRead<ObstacleReportInfo>
          titleRead={formatMessage({
            id: 'taskManage.viewFaultRepairOrder',
            defaultMessage: '查看故障修复工单',
          })}
          columns={columnsRead}
          submitter={{
            render: () => {
              return [
                <Button
                  key="cancel"
                  onClick={() => {
                    set(false);
                  }}
                >
                  {formatMessage({ id: 'common.cancel', defaultMessage: '取消' })}
                </Button>,
                <Button
                  className={initialValues?.status == OrderStatus.READY ? '' : 'hide'}
                  key="ok"
                  type="primary"
                  onClick={() => {
                    setStatusModal(true);
                  }}
                >
                  {formatMessage({ id: 'taskManage.finished', defaultMessage: '完成' })}
                </Button>,
                <Button
                  className={initialValues?.status == OrderStatus.READY ? '' : 'hide'}
                  key="ok"
                  type="primary"
                  onClick={() => {
                    set(false);
                    setMaintenanceModal(true);
                  }}
                >
                  {formatMessage({
                    id: 'taskManage.createMaintenanceOrder',
                    defaultMessage: '创建维修工单',
                  })}
                </Button>,
              ];
            },
          }}
          request={getObstacleReport}
          {...{
            operations: operations,
            visible: state,
            onVisibleChange: set,
            id: initialValues?.id,
            keyForId: 'faultId',
          }}
        />
      </ProConfigProvider>

      <MaintenanceUpdate
        visible={maintenanceModal}
        onVisibleChange={setMaintenanceModal}
        siteId={initialValues?.siteId}
        id={initialValues?.id}
        operations={FormOperations.CREATE}
        initialValues={{ siteName: initialValues?.siteName } as any}
        onSuccess={reload}
      />
      <YTModalForm<any, any>
        title={formatMessage({ id: 'taskManage.completionReason', defaultMessage: '完成原因' })}
        visible={statusModal}
        onVisibleChange={toggleModal}
        layoutType={'ModalForm'}
        onFinish={completeOrder}
        columns={[
          {
            title: formatMessage({ id: 'taskManage.reason', defaultMessage: '原因' }),
            valueType: 'textarea',
            dataIndex: 'description',
            colProps: {
              span: 24,
            },
          },
        ]}
      />
    </>
  );
};

export default Customer;
