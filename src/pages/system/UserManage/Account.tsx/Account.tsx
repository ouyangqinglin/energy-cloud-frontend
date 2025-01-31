/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-26 09:11:39
 * @LastEditTime: 2024-06-03 16:48:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\UserManage\Account.tsx\Account.tsx
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import YTProTable from '@/components/YTProTable';
import { getTableColumns, getFormColumns } from './config';
import type { AccountDataType } from './config';
import type { ActionType } from '@ant-design/pro-components';
import { useBoolean } from 'ahooks';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { getPage, getData, addData, editData, deleteData } from './service';
import { Button, message, Modal } from 'antd';
import { tableSelectValueTypeMap } from '@/components/TableSelect';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { OrgTypeEnum } from '@/components/OrgTree/type';
import { api } from '@/services';
import type { OptionType } from '@/types';
import { arrayToMap, formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';
import type { YTProTableProps } from '@/components/YTProTable/typing';
import { ProConfigProvider } from '@ant-design/pro-components';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';
import { getLog } from '../../authorization/service';
import { getLogData } from '../../authorization/data';

export type AccountProps = {
  params?: Record<string, any>;
  type?: any;
};

const Account: React.FC<AccountProps> = (props) => {
  const { params, type } = props;
  const actionRef = useRef<ActionType>();
  const [openForm, { set, setTrue: setOpenFormTrue }] = useBoolean(false);
  const [roleOptions, setRoleOptions] = useState<OptionType[]>([]);
  const [open, setOpen] = useState(false);
  const [formInfo, setFormInfo] = useState({
    type: FormTypeEnum.Add,
    id: '',
  });
  const { authorityMap } = useAuthority([
    'system:user:account:system:add',
    'system:user:account:system:edit',
    'system:user:account:system:delete',

    'system:user:account:install:add',
    'system:user:account:install:edit',
    'system:user:account:install:delete',

    'system:user:account:owner:add',
    'system:user:account:owner:edit',
    'system:user:account:owner:delete',

    'system:user:account:operator:add',
    'system:user:account:operator:edit',
    'system:user:account:operator:delete',
  ]);

  const showAdd = useMemo(() => {
    return (
      (type == OrgTypeEnum.System && authorityMap.get('system:user:account:system:add')) ||
      (type == OrgTypeEnum.Install && authorityMap.get('system:user:account:install:add')) ||
      (type == OrgTypeEnum.Owner && authorityMap.get('system:user:account:owner:add')) ||
      (type == OrgTypeEnum.Operator && authorityMap.get('system:user:account:operator:add'))
    );
  }, [type, authorityMap]);

  const tableColumns = useMemo(() => {
    return getTableColumns(params?.orgTypes, roleOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleOptions]);

  const formColumns = useMemo(() => {
    return getFormColumns(params?.orgTypes, roleOptions, formInfo.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formInfo.type, roleOptions]);

  const initialValues = useMemo(() => {
    const result: AccountDataType = {};
    if (OrgTypeEnum.System != params?.orgTypes?.[0]) {
      const typeRoleMap = arrayToMap(roleOptions, 'orgType', 'roleId');
      result.roleId = typeRoleMap[params?.orgTypes?.[0]];
    }
    if (params?.parentId) {
      result.orgId = params?.orgId;
    }
    if (params?.siteId) {
      result.sites = [{ id: params?.siteId, name: params?.siteName }];
    }
    return result;
  }, [params, roleOptions]);

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

  const onClickStation = useCallback((record: AccountDataType) => {
    console.log('onClickStation', record);
    setOpen(true);
    // setAppId(params.appId);
    // return getLog(params);
  }, []);

  const handleOk = () => {
    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  };

  const onDeleteClick = useCallback((_, record: AccountDataType) => {
    return deleteData({ userIds: [record.userId] }).then(({ data }) => {
      if (data) {
        message.success(formatMessage({ id: 'common.del', defaultMessage: '删除成功' }));
        onSuccess();
      }
    });
  }, []);

  const footer = () => [
    <Button key="back" onClick={onCancel}>
      关闭
    </Button>,
  ];

  const options = useMemo(() => {
    const result: YTProTableProps<any, any>['option'] = {};
    if (
      (type == OrgTypeEnum.System && authorityMap.get('system:user:account:system:edit')) ||
      (type == OrgTypeEnum.Install && authorityMap.get('system:user:account:install:edit')) ||
      (type == OrgTypeEnum.Owner && authorityMap.get('system:user:account:owner:edit')) ||
      (type == OrgTypeEnum.Operator && authorityMap.get('system:user:account:operator:edit'))
    ) {
      result.onEditChange = onEditClick;
    }
    if (
      (type == OrgTypeEnum.System && authorityMap.get('system:user:account:system:delete')) ||
      (type == OrgTypeEnum.Install && authorityMap.get('system:user:account:install:delete')) ||
      (type == OrgTypeEnum.Owner && authorityMap.get('system:user:account:owner:delete')) ||
      (type == OrgTypeEnum.Operator && authorityMap.get('system:user:account:operator:delete'))
    ) {
      result.onDeleteChange = onDeleteClick;
    }
    // TODO: 未联调，暂时注释
    // result.render = (_, record) => (<Button type="link" onClick={() => onClickStation(record)}>站点</Button>);
    return result;
  }, [type, authorityMap, onEditClick, onDeleteClick]);

  const beforeSubmit = (formData: AccountDataType) => {
    formData.roleIds = [formData?.roleId || ''];
    const roleType = roleOptions.filter((i) => i.roleId == formData.roleId)[0]?.type || 0;
    if (roleType == 1) {
      formData.siteIds = formData?.webConfig?.filter((i) => !i.includes('#')) || [];
    } else {
      formData.siteIds = formData?.sites?.map?.((item) => item.id) || [];
    }
  };
  const HandlerWebConfig = (webConfig: any) => {
    const config = JSON.parse(webConfig);
    const isAry = Array.isArray(config);
    if (isAry) {
      return config.map((i) => String(i));
    } else {
      return config;
    }
  };
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
      formData.webConfig = HandlerWebConfig(formData?.user?.webConfig);
    },
    [params],
  );
  useEffect(() => {
    actionRef?.current?.reloadAndRest?.();
  }, [params]);
  //获取角色下拉框数据
  useEffect(() => {
    api
      .getRoles({
        builtInRole: params?.orgTypes?.[0] == OrgTypeEnum.System ? 0 : 1,
        manageOrgType: params?.orgTypes?.[0],
      })
      .then(({ data }) => {
        const result =
          data?.map?.((item: any) => {
            return {
              ...item,
              label: item?.roleName,
              value: item?.roleId,
            };
          }) || [];
        setRoleOptions(result);
      });
  }, [params?.orgTypes]);

  // TODO: 站点table请求
  const requestList = useCallback((query: getLogData) => {
    return getLog({ ...query });
  }, []);

  return (
    <>
      <ProConfigProvider
        valueTypeMap={{
          ...YTDateRangeValueTypeMap,
        }}
      >
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
              show: showAdd,
              onClick: onAddClick,
              text: formatMessage({ id: 'common.new', defaultMessage: '新建' }),
            },
          }}
          option={options}
        />
      </ProConfigProvider>

      <ProConfigProvider valueTypeMap={tableSelectValueTypeMap}>
        <SchemaForm<AccountDataType, TABLESELECTVALUETYPE>
          width="816px"
          type={formInfo.type}
          columns={formColumns}
          open={openForm}
          onOpenChange={set}
          shouldUpdate={false}
          id={formInfo.id}
          idKey="userId"
          editData={editData}
          addData={addData}
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

      <ProConfigProvider>
        <Modal
          title="站点查看"
          open={open}
          onOk={handleOk}
          onCancel={onCancel}
          width={1000}
          destroyOnClose
          footer={footer}
        >
          {/* <YTProTable<any, any>
            actionRef={actionRef}
            // @ts-ignore
            columns={getStationColumns}
            request={requestList}
            toolBarRender={() => []}
          /> */}
        </Modal>
      </ProConfigProvider>
    </>
  );
};

export default Account;
