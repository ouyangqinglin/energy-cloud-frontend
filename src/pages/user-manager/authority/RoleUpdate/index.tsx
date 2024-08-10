import { useMemo, useCallback } from 'react';
import { columns } from './config';
import type { RoleInfo, RoleParam } from '../type';
import { createRole, getRole, updateRole } from '../service';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { FormUpdate } from '../components/FormUpdate';
import type { FormUpdateBaseProps } from '../components/FormUpdate/type';
import { formatMessage } from '@/utils';
import { getProductTypeList } from '@/services/equipment';
import { getRoleSiteList } from '@/services/station';

import TabTreeSelect from './TabTreeSelect';
import { difference } from 'lodash';

export const RoleUpdate = (props: FormUpdateBaseProps) => {
  const { type } = props;

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
        renderFormItem: (_, __, form) => <TabTreeSelect form={form} />,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const afterRequest = useCallback((data) => {
    const webMenuKeys = {
      halfCheckedKeys: data?.halfMenuIds || [],
      checkedKeys: difference(data?.menuIds || [], data?.halfMenuIds || []),
    };
    const appMenuKeys = {
      halfCheckedKeys: data?.halfMenuIds || [],
      checkedKeys: difference(data?.appMenuIds || [], data?.halfAppMenuIds || []),
    };
    data.menuKeys = [webMenuKeys, appMenuKeys];
  }, []);

  const beforeSubmit = useCallback((data) => {
    // web
    const webMenuKeys = data?.menuKeys?.[0];
    data.menuIds = webMenuKeys.checkedKeys;
    data.halfMenuIds = null;
    if (webMenuKeys.halfCheckedKeys.length) {
      data.halfMenuIds = webMenuKeys.halfCheckedKeys;
      data.menuIds.push(...data.halfMenuIds);
    }
    //app
    const appMenuKeys = data?.menuKeys?.[1];
    data.appMenuIds = appMenuKeys.checkedKeys;
    data.halfAppMenuIds = null;
    if (appMenuKeys.halfCheckedKeys.length) {
      data.halfAppMenuIds = appMenuKeys.halfCheckedKeys;
      data.appMenuIds.push(...data.halfAppMenuIds);
    }
    delete data.menuKeys;
  }, []);

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
