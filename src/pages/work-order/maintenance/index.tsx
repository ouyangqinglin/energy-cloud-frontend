import { useCallback, useRef, useState } from 'react';
import type { MaintenanceListType } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { deleteMaintenanceWorkOrder, getMaintenanceWorkOrderList } from './service';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import type { ActionType } from '@ant-design/pro-components';
import { useSiteColumn } from '@/hooks';
import { Update } from './Update';
import Read from './Read';
import { message } from 'antd';

const Maintenance = () => {
  const [updateModal, { set: setUpdateModal }] = useToggle<boolean>(false);
  const [readModal, { set: setReadModal }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const actionRef = useRef<ActionType>(null);
  const [initialValues, setInitialValues] = useState<MaintenanceListType>(
    {} as MaintenanceListType,
  );

  const customConfig: YTProTableCustomProps<MaintenanceListType, any> = {
    toolBarRenderOptions: {
      add: {
        onClick() {
          // setInitialValues({} as InstallListType);
          setOperations(FormOperations.CREATE);
          setUpdateModal(true);
        },
        text: '新建',
      },
    },
    option: {
      onDeleteChange(_, entity) {
        deleteMaintenanceWorkOrder({ id: entity.id })?.then?.(({ data }) => {
          if (data) {
            message.success('删除成功');
            actionRef?.current?.reload?.();
          }
        });
      },
      onEditChange(_, entity) {
        setInitialValues({ ...entity });
        setOperations(FormOperations.UPDATE);
        setUpdateModal(true);
      },
      onDetailChange(_, entity) {
        setInitialValues({ ...entity });
        setOperations(FormOperations.READ);
        setReadModal(true);
      },
      modalDeleteText: `您确认要删除该维护工单吗？删除之后无法恢复！`,
    },
  };

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, [actionRef]);

  const [siteSearchColumn] = useSiteColumn<MaintenanceListType>({
    hideInTable: true,
    formItemProps: {
      rules: [{ required: true }],
      name: 'siteId',
    },
  });

  const requestList: YTProTableCustomProps<MaintenanceListType, MaintenanceListType>['request'] = (
    params,
  ) => {
    return getMaintenanceWorkOrderList(params);
  };

  return (
    <>
      <YTProTable<MaintenanceListType, MaintenanceListType>
        columns={[siteSearchColumn, ...columns]}
        // toolBarRender={() => []}
        actionRef={actionRef}
        request={requestList}
        rowKey="id"
        {...customConfig}
      />
      <Update
        {...{
          operations: operations,
          visible: updateModal,
          onVisibleChange: setUpdateModal,
          id: initialValues?.id,
          onSuccess: onSuccess,
        }}
      />
      <Read
        {...{
          operations: operations,
          visible: readModal,
          onVisibleChange: setReadModal,
          id: initialValues?.id,
        }}
      />
    </>
  );
};

export default Maintenance;
