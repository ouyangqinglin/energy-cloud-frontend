import { useCallback, useRef, useState } from 'react';
import type { CustomerInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { deleteCustomer, getCustomerList } from './service';
import { Update } from './Update';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import { message } from 'antd';
import { ActionType } from '@ant-design/pro-components';

const Customer = (props: { actionRef?: React.Ref<ActionType> }) => {
  const [state, { set }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<CustomerInfo>({} as CustomerInfo);
  const actionRef = useRef<ActionType>(null);

  const customConfig: YTProTableCustomProps<CustomerInfo, any> = {
    toolbar: {
      onChange() {
        setInitialValues({} as CustomerInfo);
        setOperations(FormOperations.CREATE);
        set(true);
      },
      buttonText: '新建角色',
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
    },
  };
  const visibleUpdated = operations !== FormOperations.READ;

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, [actionRef]);

  const requestList: YTProTableCustomProps<CustomerInfo, CustomerInfo>['request'] = (params) => {
    return getCustomerList(params);
  };
  return (
    <>
      <YTProTable<CustomerInfo, CustomerInfo>
        columns={columns}
        actionRef={actionRef}
        {...customConfig}
        request={requestList}
        rowKey="userId"
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

export default Customer;
