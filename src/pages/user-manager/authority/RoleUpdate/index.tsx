import { useMemo, useState, useEffect, useCallback } from 'react';
import { useRequest } from 'umi';
import { columns } from './config';
import type { RoleInfo, RoleParam } from '../type';
import { createRole, getRole, updateRole, getEffectMenus, getSelectMenu } from '../service';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { FormUpdate } from '../components/FormUpdate';
import type { FormUpdateBaseProps } from '../components/FormUpdate/type';
import TreeSelect from '@/components/TreeSelect';
import { formatMessage } from '@/utils';
import { getProductTypeList } from '@/services/equipment';
import { getRoleSiteList } from '@/services/station';

export const RoleUpdate = (props: FormUpdateBaseProps) => {
  const { visible, id, type } = props;

  const { data: menuData, run } = useRequest(getEffectMenus, {
    manual: true,
  });

  const requestProductType = useCallback(() => {
    return getProductTypeList({}).then(({ data }) => {
      const children = data?.map?.((item) => {
        return {
          title: item?.name || '',
          value: item?.id || '',
        };
      });
      return [
        {
          title: formatMessage({ id: 'system.1008', defaultMessage: '全选' }),
          value: '',
          children,
        },
      ];
    });
  }, []);

  const requestSiteOptions = useCallback(() => {
    return getRoleSiteList().then(({ data }) => {
      const children = data?.map?.((item) => {
        return {
          title: item?.name || '',
          value: item?.value || '',
        };
      });
      return [
        {
          title: formatMessage({ id: 'system.1008', defaultMessage: '全选' }),
          value: '',
          children,
        },
      ];
    });
  }, []);

  const formColumns = useMemo<ProFormColumnsType[]>(() => {
    const customCoulumns: ProFormColumnsType[] = [
      {
        title: formatMessage({ id: 'system.productPermissions', defaultMessage: '产品权限' }),
        dataIndex: 'productTypeIds',
        valueType: 'treeSelect',
        fieldProps: {
          multiple: true,
          treeCheckable: true,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
            },
          ],
        },
        colProps: {
          span: 24,
        },
        request: requestProductType,
      },
      {
        title: formatMessage({ id: 'system.sitePermissions', defaultMessage: '站点权限' }),
        dataIndex: 'siteTypes',
        valueType: 'treeSelect',
        fieldProps: {
          multiple: true,
          treeCheckable: true,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
            },
          ],
        },
        colProps: {
          span: 24,
        },
        request: requestSiteOptions,
      },
    ];
    return [
      ...columns,
      ...(type == '1' ? customCoulumns : []),
      {
        title: formatMessage({ id: 'user.menuPermissions', defaultMessage: '菜单权限' }),
        dataIndex: 'menuKeys',
        renderFormItem: () => {
          return <TreeSelect treeData={menuData} />;
        },
        colProps: {
          span: 24,
        },
      },
      {
        title: formatMessage({ id: 'common.remark', defaultMessage: '备注' }),
        dataIndex: 'remark',
        valueType: 'textarea',
        fieldProps: {
          placeholder: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
          className: 'w-full',
        },
        colProps: {
          span: 24,
        },
      },
    ];
  }, [menuData, type]);

  const afterRequest = useCallback((data, form) => {
    data.menuKeys = {
      halfCheckedKeys: data?.halfMenuIds || [],
    };
    const halfKeySet = new Set(data.menuKeys.halfCheckedKeys);
    const checkedKeys: number[] = [];
    (data?.menuIds || []).forEach((item: number) => {
      if (!halfKeySet.has(item)) {
        checkedKeys.push(item);
      }
    });
    data.menuKeys.checkedKeys = checkedKeys;
  }, []);

  const beforeSubmit = useCallback((data) => {
    data.menuIds = data?.menuKeys?.checkedKeys || [];
    data.halfMenuIds = data?.menuKeys?.halfCheckedKeys || [];
    data.menuIds.push(...data.halfMenuIds);
    delete data.menuKeys;
  }, []);

  useEffect(() => {
    if (visible) {
      run();
    }
  }, [visible, id]);

  return (
    <FormUpdate<RoleInfo, RoleParam>
      afterRequest={afterRequest}
      titleCreate={formatMessage({ id: 'common.new', defaultMessage: '新建' })}
      titleUpdate={formatMessage({ id: 'common.edit', defaultMessage: '编辑' })}
      columns={formColumns}
      onFinishUpdate={updateRole}
      onFinishCreate={createRole}
      request={getRole}
      beforeSubmit={beforeSubmit}
      {...props}
    />
  );
};
