import { useRef, useState } from 'react';
import type { ObstacleReportInfo } from './type';
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
import { MaintenanceUpdate } from '../maintenance/Update';

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

  const completeOrder = async (params: any) => {
    await handleOrderComplete({ ...params, ...{ id: initialValues?.id } });
    set(false);
    setStatusModal(false);
  };

  return (
    <>
      <YTProTable<ObstacleReportInfo, ObstacleReportInfo>
        columns={[siteSearchColumn, ...columns]}
        toolBarRender={() => []}
        actionRef={actionRef}
        request={requestList}
        rowKey="id"
        {...customConfig}
        {...props}
      />
      <FormRead<ObstacleReportInfo>
        titleRead="查看故障修复工单"
        columns={columnsRead}
        submitter={{
          render: () => {
            return [
              <Button
                key="ok"
                type="primary"
                onClick={() => {
                  setStatusModal(true);
                }}
              >
                完成
              </Button>,
              <Button
                key="ok"
                type="primary"
                onClick={() => {
                  set(false);
                  setMaintenanceModal(true);
                }}
              >
                创建维修工单
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
      <MaintenanceUpdate
        visible={maintenanceModal}
        onVisibleChange={setMaintenanceModal}
        siteId={initialValues?.siteId}
        operations={FormOperations.CREATE}
      />
      <YTModalForm<any, any>
        title={'完成原因'}
        visible={statusModal}
        onVisibleChange={toggleModal}
        layoutType={'ModalForm'}
        onFinish={completeOrder}
        columns={[
          {
            title: '原因',
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
