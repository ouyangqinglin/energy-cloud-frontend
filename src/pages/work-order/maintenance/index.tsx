import { useCallback, useRef, useState, useEffect } from 'react';
import { OrderStatus, type MaintenanceListType, type SiteInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { deleteMaintenanceWorkOrder, getMaintenanceWorkOrderList } from './service';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { useSiteColumn } from '@/hooks';
import { MaintenanceUpdate } from './Update';
import Read from './Read';
import { getInstallerList } from './service';
import { message } from 'antd';
import SelectSiteModal from './SelectSite';
import { formatMessage } from '@/utils';
import { OptionType } from '@/types';

const Maintenance = () => {
  const [updateModal, { set: setUpdateModal }] = useToggle<boolean>(false);
  const [readModal, { set: setReadModal }] = useToggle<boolean>(false);
  const [siteModal, { set: setSiteModal }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const actionRef = useRef<ActionType>(null);
  const [maintenanceOptions, setMaintenanceOptions] = useState<OptionType[]>();
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
        text: formatMessage({ id: 'common.new', defaultMessage: '新建' }),
      },
    },
    option: {
      onDeleteChange(_, entity) {
        deleteMaintenanceWorkOrder({ id: entity.id })?.then?.(({ data }) => {
          if (data) {
            message.success(formatMessage({ id: 'common.del', defaultMessage: '删除成功' }));
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
      modalDeleteText: formatMessage({
        id: 'taskManage.delMaintenanceJob',
        defaultMessage: `您确认要删除该维护工单吗？删除之后无法恢复！`,
      }),
      btnInterceptor(entity, buttonKey) {
        if (buttonKey == 'onEditChange' || buttonKey == 'onDeleteChange') {
          if (entity?.status != OrderStatus.READY) {
            return false;
          }
        }
      },
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
      setInitialValues({ ...initialValues, siteName: value[0]?.name ?? '' });
      setUpdateModal(true);
    }
  };
  const requestMaintenanceList = useCallback((searchText?: string) => {
    const params = { pageSize: 20, current: 1, userName: searchText };
    getInstallerList(params).then(({ data }) => {
      setMaintenanceOptions(
        data.list?.map?.((item: any) => {
          return {
            label: item?.userName || '',
            value: item?.userId || '',
          };
        }),
      );
    });
  }, []);
  useEffect(() => {
    requestMaintenanceList();
  }, [requestMaintenanceList]);
  const maintenanceColumns = {
    title: formatMessage({ id: 'taskManage.maintainer', defaultMessage: '维护人员' }),
    dataIndex: 'handlerName',
    valueType: 'select',
    hideInTable: true,
    formItemProps: {
      name: 'handlerBy',
    },
    fieldProps: {
      showSearch: true,
      filterOption: false,
      onSearch: requestMaintenanceList,
      options: maintenanceOptions,
    },
    width: 150,
    ellipsis: true,
  } as ProColumns<MaintenanceListType>;
  return (
    <>
      <YTProTable<MaintenanceListType, MaintenanceListType>
        columns={[siteSearchColumn, maintenanceColumns, ...columns]}
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
          initialValues: initialValues,
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
