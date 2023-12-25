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
import type { ActionType } from '@ant-design/pro-components';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';

const Owner = () => {
  const [state, { set }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<ServiceInfo>({} as ServiceInfo);
  const actionRef = useRef<ActionType>(null);
  const { authorityMap } = useAuthority([
    'system:ownerOrg:add',
    'system:ownerOrg:edit',
    'system:ownerOrg:remove',
  ]);

  const customConfig: YTProTableCustomProps<ServiceInfo, any> = {
    toolBarRenderOptions: {
      add: {
        show: authorityMap.get('system:ownerOrg:add'),
        onClick() {
          setInitialValues({} as ServiceInfo);
          setOperations(FormOperations.CREATE);
          set(true);
        },
        text: formatMessage({ id: 'common.newBuilt', defaultMessage: '新建' }),
      },
    },
    option: {
      ...(authorityMap.get('system:ownerOrg:remove')
        ? {
            onDeleteChange(_, entity) {
              deleteService?.({ orgId: entity?.orgId })?.then?.(({ data, code }) => {
                if (data || code === 200) {
                  message.success(formatMessage({ id: 'common.del', defaultMessage: '删除成功' }));
                  actionRef?.current?.reload?.();
                }
              });
            },
          }
        : {}),
      ...(authorityMap.get('system:ownerOrg:edit')
        ? {
            onEditChange(_, entity) {
              setInitialValues({ ...entity });
              setOperations(FormOperations.UPDATE);
              set(true);
            },
          }
        : {}),
      modalDeleteText: formatMessage({
        id: 'system.deleteOwnerConfirm',
        defaultMessage: '您确认要删除该业主吗？删除之后无法恢复！',
      }),
    },
  };
  const visibleUpdated = operations !== FormOperations.READ;

  const onSuccess = useCallback(() => {
    console.log(123);

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
      />
      <Update
        {...{
          operations: operations,
          visible: visibleUpdated && state,
          onVisibleChange: set,
          onSuccess: onSuccess,
          orgId: initialValues?.orgId,
        }}
      />
    </>
  );
};

export default Owner;
