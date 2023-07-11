import { useMemo, useState, useEffect, useCallback } from 'react';
import { useRequest } from 'umi';
import { columns } from './config';
import type { RoleInfo, RoleParam } from '../type';
import { createRole, getRole, updateRole, getEffectMenus, getSelectMenu } from '../service';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { FormUpdate } from '../components/FormUpdate';
import type { FormUpdateBaseProps } from '../components/FormUpdate/type';
import TreeSelect from '@/components/TreeSelect';

export const RoleUpdate = (props: FormUpdateBaseProps) => {
  const { visible, id } = props;

  const { data: menuData, run } = useRequest(getEffectMenus, {
    manual: true,
  });

  const formColumns = useMemo<ProFormColumnsType[]>(() => {
    return [
      ...columns,
      {
        title: '菜单权限',
        dataIndex: 'menuIds',
        renderFormItem: () => {
          return <TreeSelect treeData={menuData} />;
        },
        colProps: {
          span: 24,
        },
      },
    ];
  }, [menuData]);

  const afterRequest = useCallback(
    (_, form) => {
      if (id) {
        getSelectMenu(id).then(({ data }) => {
          form?.setFieldValue('menuIds', data);
        });
      }
    },
    [id],
  );

  useEffect(() => {
    if (visible) {
      run();
    }
  }, [visible, id]);

  return (
    <FormUpdate<RoleInfo, RoleParam>
      afterRequest={afterRequest}
      titleCreate={`新增角色`}
      titleUpdate={`编辑角色`}
      columns={formColumns}
      onFinishUpdate={updateRole}
      onFinishCreate={createRole}
      request={getRole}
      {...props}
    />
  );
};
