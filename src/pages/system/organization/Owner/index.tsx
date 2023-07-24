import { useCallback, useRef, useState } from 'react';
import type { ServiceInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { deleteService, getServiceList } from './service';
import { Update } from './Update';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import { message } from 'antd';
import { ActionType } from '@ant-design/pro-components';

const Owner = (props: { actionRef?: React.Ref<ActionType> }) => {
  const [state, { set }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<ServiceInfo>({} as ServiceInfo);
  const actionRef = useRef<ActionType>(null);

  const customConfig: YTProTableCustomProps<ServiceInfo, any> = {
    toolBarRenderOptions: {
      add: {
        onClick() {
          setInitialValues({} as ServiceInfo);
          setOperations(FormOperations.CREATE);
          set(true);
        },
        text: '新增',
      },
    },
    option: {
      onDeleteChange(_, entity) {
        deleteService?.({ orgId: [entity?.orgId] })?.then?.(({ data }) => {
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
      modalDeleteText: '您确认要删除该安装商吗？删除之后无法恢复！',
    },
  };
  const visibleUpdated = operations !== FormOperations.READ;

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, [actionRef]);

  const requestList: YTProTableCustomProps<ServiceInfo, ServiceInfo>['request'] = (params) => {
    return getServiceList(params);
  };
  return (
    <>
      <YTProTable<ServiceInfo, ServiceInfo>
        columns={columns}
        actionRef={actionRef}
        {...customConfig}
        request={requestList}
        rowKey="orgId"
        {...props}
      />
      <Update
        {...{
          operations: operations,
          visible: visibleUpdated && state,
          onVisibleChange: set,
          onSuccess: onSuccess,
          id: initialValues?.orgId,
        }}
      />
    </>
  );
};

export default Owner;
