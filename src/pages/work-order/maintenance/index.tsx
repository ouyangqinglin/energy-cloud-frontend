import { useCallback, useRef, useState } from 'react';
import type { MaintenanceListType, SiteInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { deleteMaintenanceWorkOrder, getMaintenanceWorkOrderList } from './service';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import type { ActionType } from '@ant-design/pro-components';
import { useSiteColumn } from '@/hooks';
import { MaintenanceUpdate } from './Update';
import Read from './Read';
import { message } from 'antd';
import SelectSiteModal from './SelectSite';

const Maintenance = () => {
  const [updateModal, { set: setUpdateModal }] = useToggle<boolean>(false);
  const [readModal, { set: setReadModal }] = useToggle<boolean>(false);
  const [siteModal, { set: setSiteModal }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const actionRef = useRef<ActionType>(null);
  const [initialValues, setInitialValues] = useState<MaintenanceListType>(
    {} as MaintenanceListType,
  );

  const customConfig: YTProTableCustomProps<MaintenanceListType, any> = {
    toolBarRenderOptions: {
      add: {
        onClick() {
          setInitialValues({} as MaintenanceListType);
          setOperations(FormOperations.CREATE);
          setSiteModal(true);
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

  const [siteId, setSiteId] = useState<number>();
  const ensureSite = (value: SiteInfo[]) => {
    if (value.length) {
      setSiteId(value[0]?.id);
      setUpdateModal(true);
    }
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
      <SelectSiteModal
        onChange={ensureSite}
        open={siteModal}
        onCancel={() => setSiteModal(false)}
      />
      <MaintenanceUpdate
        {...{
          operations: operations,
          visible: updateModal,
          onVisibleChange: setUpdateModal,
          id: initialValues?.id,
          onSuccess: onSuccess,
          siteId: initialValues?.siteId ?? siteId,
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
