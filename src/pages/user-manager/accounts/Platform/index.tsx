import { useCallback, useRef, useState } from 'react';
import type { CustomerInfo, PlatformSearchType } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { deleteCustomer, getList } from './service';
import { Update } from './Update';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import { message } from 'antd';
import type { ActionType } from '@ant-design/pro-components';

const Platform = (props: { actionRef?: React.Ref<ActionType>; params?: PlatformSearchType }) => {
  const [state, { set }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<CustomerInfo>({} as CustomerInfo);
  const actionRef = useRef<ActionType>(null);

  const customConfig: YTProTableCustomProps<CustomerInfo, any> = {
    toolBarRenderOptions: {
      onChange() {
        setInitialValues({} as CustomerInfo);
        setOperations(FormOperations.CREATE);
        set(true);
      },
      buttonText: '新建账号',
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
    return getList({ ...searchParams, ...(props.params || {}) });
  };
  return (
    <>
      <YTProTable<CustomerInfo, CustomerInfo>
        columns={columns}
        actionRef={actionRef}
        {...customConfig}
        request={requestList}
        rowKey="userId"
        scroll={{ y: 520 }}
        {...props}
      />
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

export default Platform;
