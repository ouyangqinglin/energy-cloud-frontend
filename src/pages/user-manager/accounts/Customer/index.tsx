import { useCallback, useRef, useState } from 'react';
import type { CustomerInfo, PlatformSearchType } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { deleteCustomer, getCustomerList } from './service';
import { Update } from './Update';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import { message } from 'antd';
import { ActionType } from '@ant-design/pro-components';
import { ProConfigProvider } from '@ant-design/pro-components';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';

const Customer = (props: { actionRef?: React.Ref<ActionType>; params?: PlatformSearchType }) => {
  const [state, { set }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<CustomerInfo>({} as CustomerInfo);
  const actionRef = useRef<ActionType>(null);

  const customConfig: YTProTableCustomProps<CustomerInfo, any> = {
    toolBarRenderOptions: {
      add: {
        onClick() {
          setInitialValues({} as CustomerInfo);
          setOperations(FormOperations.CREATE);
          set(true);
        },
        text: '新建',
      },
    },
    option: {
      onDeleteChange(_, entity) {
        deleteCustomer?.({ userIds: [entity?.userId] })?.then?.(({ data }) => {
          if (data) {
            message.success('删除成功');
            actionRef?.current?.reload?.();
          }
        });
      },
      onEditChange(_, entity) {
        setInitialValues({ ...entity });
        setOperations(FormOperations.UPDATE);
        set(true);
      },
      modalDeleteText: '您确认要删除该账号吗？删除之后无法恢复！',
      columnsProp: {
        width: 100,
      },
    },
  };
  const visibleUpdated = operations !== FormOperations.READ;

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, [actionRef]);

  const requestList: YTProTableCustomProps<CustomerInfo, CustomerInfo>['request'] = (
    searchParams,
  ) => {
    return getCustomerList({ ...searchParams, ...(props.params || {}) });
  };
  return (
    <>
      <ProConfigProvider
        valueTypeMap={{
          ...YTDateRangeValueTypeMap,
        }}
      >
        <YTProTable<CustomerInfo, CustomerInfo>
          columns={columns}
          actionRef={actionRef}
          {...customConfig}
          request={requestList}
          rowKey="userId"
          {...props}
        />
      </ProConfigProvider>

      <Update
        {...{
          operations: operations,
          visible: visibleUpdated && state,
          onVisibleChange: set,
          onSuccess: onSuccess,
          id: initialValues?.userId,
        }}
      />
    </>
  );
};

export default Customer;
