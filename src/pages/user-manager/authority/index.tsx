/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 14:00:13
 * @LastEditTime: 2024-03-09 10:24:41
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

  const [state, { set }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<RoleInfo>({} as RoleInfo);
  const actionRef = useRef<ActionType>(null);
  const { authorityMap } = useAuthority([
    'system:role:custom:add',
    'system:role:custom:edit',
    'system:role:custom:delete',
    'system:role:predefine:add',
    'system:role:predefine:edit',
    'system:role:predefine:delete',
  ]);

  const customConfig: YTProTableCustomProps<RoleInfo, any> = {
    toolBarRenderOptions: {},
    option: {
      modalDeleteText: formatMessage({
        id: 'user.deleteRoleConfirm',
        defaultMessage: '您确认要删除该角色吗？删除之后无法恢复！',
      }),
    },
  };

  if (
    (type == '1' && authorityMap.get('system:role:custom:add')) ||
    (type == '0' && authorityMap.get('system:role:predefine:add'))
  ) {
    customConfig.toolBarRenderOptions = {
      add: {
        onClick() {
          setInitialValues({} as RoleInfo);
          setOperations(FormOperations.CREATE);
          set(true);
        },
        text: formatMessage({ id: 'common.new', defaultMessage: '新建' }),
      },
    };
  }
  if (type == '1' && authorityMap.get('system:role:custom:delete')) {
    customConfig.option.onDeleteChange = (_, entity) => {
      deleteRole?.({ roleIds: [entity?.roleId] })?.then?.(({ data }) => {
        if (data) {
          message.success(formatMessage({ id: 'common.del', defaultMessage: '删除成功' }));
          actionRef?.current?.reload?.();
        }
      });
    };
  }
  if (
    (type == '1' && authorityMap.get('system:role:custom:edit')) ||
    (type == '0' && authorityMap.get('system:role:predefine:edit'))
  ) {
    customConfig.option.onEditChange = (_, entity) => {
      setInitialValues({ ...entity });
      setOperations(FormOperations.UPDATE);
      set(true);
    };
  }

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
