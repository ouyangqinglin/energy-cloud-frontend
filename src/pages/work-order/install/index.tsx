import { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import { OrderStatus, type InstallListType } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { deleteInstallationWorkOrder, getObstacleReportList } from './service';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Update } from './Update';
import Read from './Read';
import { getInstallerList } from './service';
import type { OptionType } from '@/utils/dictionary';
import { message } from 'antd';
import { formatMessage } from '@/utils';

const Install = () => {
  const [updateModal, { set: setUpdateModal }] = useToggle<boolean>(false);
  const [readModal, { set: setReadModal }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const actionRef = useRef<ActionType>(null);
  const [initialValues, setInitialValues] = useState<InstallListType>({} as InstallListType);
  const [serviceProviderOptions, setServiceProviderOptions] = useState<OptionType[]>();

  const customConfig: YTProTableCustomProps<InstallListType, any> = {
    toolBarRenderOptions: {
      add: {
        onClick() {
          setInitialValues({} as InstallListType);
          setOperations(FormOperations.CREATE);
          setUpdateModal(true);
        },
        text: formatMessage({ id: 'common.add', defaultMessage: '新建' }),
      },
    },
    option: {
      onDeleteChange(_, entity) {
        deleteInstallationWorkOrder({ id: entity.id })?.then?.(({ code, data }) => {
          if (code == '200' || data) {
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
        id: 'taskManage.delWorkOrderTips',
        defaultMessage: `您确认要删除该安装工单吗？删除之后无法恢复！`,
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

  const requestList: YTProTableCustomProps<InstallListType, InstallListType>['request'] = (
    params,
  ) => {
    return getObstacleReportList(params);
  };
  const requestServiceProviderList = useCallback((searchText?: string) => {
    const params = { pageSize: 20, current: 1, userName: searchText };
    getInstallerList(params).then(({ data }) => {
      setServiceProviderOptions(
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
    requestServiceProviderList();
  }, [requestServiceProviderList]);
  const serviceProviderColumns = {
    title: formatMessage({ id: 'taskManage.installer', defaultMessage: '安装人员' }),
    dataIndex: 'handlerName',
    valueType: 'select',
    hideInTable: true,
    formItemProps: {
      name: 'handlerBy',
    },
    fieldProps: {
      showSearch: true,
      filterOption: false,
      onSearch: requestServiceProviderList,
      options: serviceProviderOptions,
    },
    width: 150,
    ellipsis: true,
  } as ProColumns<InstallListType>;

  const combinColumns = useMemo<ProColumns<InstallListType>[]>(() => {
    return [...columns, serviceProviderColumns];
  }, [serviceProviderOptions]);

  return (
    <>
      <YTProTable<InstallListType, InstallListType>
        columns={combinColumns}
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
          // keyForId: 'faultId',
        }}
      />
      <Read
        {...{
          operations: operations,
          visible: readModal,
          onVisibleChange: setReadModal,
          id: initialValues?.id,
          onSuccess: onSuccess, //重新刷新列表数据
          // keyForId: 'faultId',
        }}
      />
    </>
  );
};

export default Install;
