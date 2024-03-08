/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 14:00:13
 * @LastEditTime: 2023-07-27 13:50:48
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\user-manager\authority\index.tsx
 */
import React, { useCallback, useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import type { RoleInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { deleteRole, getRoleList } from './service';
import { RoleUpdate } from './RoleUpdate';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import { message } from 'antd';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';

export type AuthorityProps = {
  type?: string;
};

const Authority: React.FC<AuthorityProps> = (props) => {
  const { type } = props;
  const { authorityMap } = useAuthority([
    'system:role:add',
    'system:role:edit',
    'system:role:remove',
  ]);

  const [state, { set }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<RoleInfo>({} as RoleInfo);
  const actionRef = useRef<ActionType>(null);

  const customConfig: YTProTableCustomProps<RoleInfo, any> = {
    toolBarRenderOptions: {
      add: authorityMap.get('system:role:add')
        ? {
            onClick() {
              setInitialValues({} as RoleInfo);
              setOperations(FormOperations.CREATE);
              set(true);
            },
            text: formatMessage({ id: 'common.add', defaultMessage: '新建' }),
          }
        : {},
    },
    option: {
      ...(type == '1' && authorityMap.get('system:role:remove')
        ? {
            onDeleteChange(_, entity) {
              deleteRole?.({ roleIds: [entity?.roleId] })?.then?.(({ data }) => {
                if (data) {
                  message.success(formatMessage({ id: 'common.del', defaultMessage: '删除成功' }));
                  actionRef?.current?.reload?.();
                }
              });
            },
          }
        : {}),
      ...(authorityMap.get('system:role:edit')
        ? {
            onEditChange(_, entity) {
              setInitialValues({ ...entity });
              setOperations(FormOperations.UPDATE);
              set(true);
            },
          }
        : {}),
      modalDeleteText: formatMessage({
        id: 'user.deleteRoleConfirm',
        defaultMessage: '您确认要删除该角色吗？删除之后无法恢复！',
      }),
    },
  };

  const visibleUpdated = operations !== FormOperations.READ;

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, [actionRef]);

  const requestList = useCallback(
    (params) => {
      return getRoleList({ ...params, type });
    },
    [type],
  );

  return (
    <>
      <YTProTable<RoleInfo, RoleInfo>
        columns={columns}
        actionRef={actionRef}
        {...customConfig}
        request={requestList}
        rowKey="roleId"
      />
      <RoleUpdate
        type={type}
        {...{
          operations: operations,
          visible: visibleUpdated && state,
          onVisibleChange: set,
          onSuccess: onSuccess,
          id: initialValues?.roleId,
        }}
      />
    </>
  );
};

export default Authority;
