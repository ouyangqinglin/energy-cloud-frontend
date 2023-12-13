/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-26 09:11:39
 * @LastEditTime: 2023-07-31 09:10:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\UserManage\Account.tsx\Account.tsx
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import YTProTable from '@/components/YTProTable';
import { getTableColumns, getFormColumns, AccountDataType } from './config';
import { ProConfigProvider } from '@ant-design/pro-components';
import { ActionType } from '@ant-design/pro-components';
import { useBoolean } from 'ahooks';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { getPage, getData, addData, editData, deleteData } from './service';
import { message } from 'antd';
import { tableSelectValueTypeMap, TABLESELECT } from '@/components/TableSelect';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { OrgTypeEnum } from '@/components/OrgTree/type';
import { api } from '@/services';
import { OptionType } from '@/types';
import { arrayToMap, formatMessage } from '@/utils';

export type AccountProps = {
  params?: Record<string, any>;
  type?: any;
};

const Account: React.FC<AccountProps> = (props) => {
  const { params } = props;
  const actionRef = useRef<ActionType>();
  const [openForm, { set, setTrue: setOpenFormTrue }] = useBoolean(false);
  const [systemRoleOptions, setSystemRoleOptions] = useState<OptionType[]>([]);
  const [partnerRoleOptions, setPartnerRoleOptions] = useState<OptionType[]>([]);
  const [yzRoleOptions, setYzRoleOptions] = useState<OptionType[]>([]);
  const [operatorRoleOptions, setOperatorRoleOptions] = useState<OptionType[]>([]);
  const [formInfo, setFormInfo] = useState({
    type: FormTypeEnum.Add,
    id: '',
  });

  const tableColumns = useMemo(() => {
    return getTableColumns(params?.orgTypes);
  }, [params]);

  const formColumns = useMemo(() => {
    return getFormColumns(
      params?.orgTypes,
      systemRoleOptions,
      partnerRoleOptions,
      operatorRoleOptions,
      yzRoleOptions,
      type,
    );
  }, [params, tableColumns]);

  const initialValues = useMemo(() => {
    const result: AccountDataType = {};
    if (OrgTypeEnum.System != params?.orgTypes?.[0]) {
      const typeRoleMap = arrayToMap(partnerRoleOptions, 'orgType', 'roleId');
      result.roleId = typeRoleMap[params?.orgTypes?.[0]];
    }
    if (params?.parentId) {
      result.orgId = params?.orgId;
    }
    if (params?.siteId) {
      result.sites = [{ id: params?.siteId, name: params?.siteName }];
    }
    return result;
  }, [params, partnerRoleOptions]);

  const requestPage = useCallback(
    (tableParams) => {
      return getPage({ ...tableParams, ...params });
    },
    [params],
  );

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, []);

  const onAddClick = useCallback(() => {
    setFormInfo({
      type: FormTypeEnum.Add,
      id: '',
    });
    setOpenFormTrue();
  }, []);

  const onEditClick = useCallback((_, row: AccountDataType) => {
    setFormInfo({
      type: FormTypeEnum.Edit,
      id: row.userId as string,
    });
    setOpenFormTrue();
  }, []);

  const onDeleteClick = useCallback((_, record: AccountDataType) => {
    return deleteData({ userIds: [record.userId] }).then(({ data }) => {
      if (data) {
        message.success(formatMessage({ id: 'common.del', defaultMessage: '删除成功' }));
        onSuccess();
      }
    });
  }, []);

  const beforeSubmit = useCallback(
    (formData: AccountDataType) => {
      formData.roleIds = [formData?.roleId || ''];
      formData.siteIds = formData?.sites?.map?.((item) => item.id) || [];
    },
    [params],
  );

  const afterRequest = useCallback(
    (formData: AccountDataType) => {
      formData.userId = formData?.user?.userId;
      formData.nickName = formData?.user?.nickName;
      formData.userName = formData?.user?.userName;
      formData.roleId = formData?.user?.roles?.[0]?.roleId || '';
      formData.orgId = formData?.user?.orgId;
      formData.status = formData?.user?.status;
      formData.phone = formData?.user?.phone;
      formData.remark = formData?.user?.remark;
      formData.sites = formData?.user?.sites;
    },
    [params],
  );

  useEffect(() => {
    actionRef?.current?.reloadAndRest?.();
  }, [params]);
  //获取角色下拉框数据
  useEffect(() => {
    api.getRoles({ builtInRole: 0 }).then(({ data }) => {
      const result =
        data?.map?.((item: any) => {
          return {
            ...item,
            label: item?.roleName,
            value: item?.roleId,
          };
        }) || [];
      setSystemRoleOptions(result);
    });
    api.getRoles({ builtInRole: 1 }).then(({ data }) => {
      const result =
        data?.map?.((item: any) => {
          return {
            ...item,
            label: item?.roleName,
            value: item?.roleId,
          };
        }) || [];
      setPartnerRoleOptions(result);
    });
    api.getRoles({ builtInRole: 2 }).then(({ data }) => {
      const result =
        data?.map?.((item: any) => {
          return {
            ...item,
            label: item?.roleName,
            value: item?.roleId,
          };
        }) || [];
      setOperatorRoleOptions(result);
    });
    api.getRoles({ builtInRole: 3 }).then(({ data }) => {
      const result =
        data?.map?.((item: any) => {
          return {
            ...item,
            label: item?.roleName,
            value: item?.roleId,
          };
        }) || [];
      setYzRoleOptions(result);
    });
  }, [openForm]);

  return (
    <>
      <YTProTable
        actionRef={actionRef}
        columns={tableColumns}
        request={requestPage}
        search={{
          labelWidth: 75,
        }}
        form={{
          labelAlign: 'left',
        }}
        toolBarRenderOptions={{
          add: {
            onClick: onAddClick,
            text: formatMessage({ id: 'common.add', defaultMessage: '新建' }),
          },
        }}
        option={{
          onEditChange: onEditClick,
          onDeleteChange: onDeleteClick,
        }}
      />
      <ProConfigProvider valueTypeMap={tableSelectValueTypeMap}>
        <SchemaForm<AccountDataType, TABLESELECTVALUETYPE>
          width="816px"
          type={formInfo.type}
          columns={formColumns}
          open={openForm}
          onOpenChange={set}
          id={formInfo.id}
          idKey="userId"
          addData={addData}
          editData={editData}
          getData={getData}
          beforeSubmit={beforeSubmit}
          afterRequest={afterRequest}
          onSuccess={onSuccess}
          grid={true}
          colProps={{
            span: 8,
          }}
          initialValues={initialValues}
        />
      </ProConfigProvider>
    </>
  );
};

export default Account;
