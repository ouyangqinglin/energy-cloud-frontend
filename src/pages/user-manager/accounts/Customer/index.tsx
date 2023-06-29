/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 14:00:13
 * @LastEditTime: 2023-06-19 14:18:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\user-manager\authority\index.tsx
 */
import { useCallback, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { CustomerInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { deleteCustomer, getCustomerList } from './service';
import { Update } from './Update';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import { message } from 'antd';

const Customer = () => {
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
        deleteCustomer?.({ roleIds: [entity?.roleId] })?.then?.(({ data }) => {
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
      modalDeleteText: '您确认要删除该角色吗？删除之后无法恢复！',
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
