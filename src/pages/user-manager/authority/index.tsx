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
import type { RoleInfo, RoleItemType } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { deleteRole, getRoleList } from './service';
import { RoleUpdate } from './RoleUpdate';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import { message } from 'antd';

const Authority = () => {
  const [state, { set }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<RoleInfo>({} as RoleInfo);
  const actionRef = useRef<ActionType>(null);

  const customConfig: YTProTableCustomProps<RoleInfo, any> = {
    toolbar: {
      onChange() {
        setInitialValues({} as RoleInfo);
        setOperations(FormOperations.CREATE);
        set(true);
      },
      buttonText: '新建角色',
    },
    option: {
      onDeleteChange(_, entity) {
        deleteRole?.({ roleIds: [entity?.roleId] })?.then?.(({ data }) => {
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

  const requestList: YTProTableCustomProps<RoleItemType, RoleItemType>['request'] = (params) => {
    return getRoleList(params);
  };
  return (
    <>
      <YTProTable<RoleItemType, RoleItemType>
        columns={columns}
        actionRef={actionRef}
        {...customConfig}
        request={requestList}
        rowKey="roleId"
      />
      <RoleUpdate
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
