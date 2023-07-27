/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-26 09:11:39
 * @LastEditTime: 2023-07-26 19:53:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\UserManage\Account.tsx\Account.tsx
 */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import YTProTable from '@/components/YTProTable';
import { getTableColumns, getFormColumns, AccountDataType } from './config';
import { ProConfigProvider } from '@ant-design/pro-components';
import { ActionType } from '@ant-design/pro-table';
import { useBoolean } from 'ahooks';
import SchemaForm, { FormTypeEnum } from '@/components/SchamaForm';
import { getPage, getData, addData, editData, deleteData } from './service';
import { message } from 'antd';
import { tableSelectValueTypeMap, TABLESELECT } from '@/components/TableSelect';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';

export type AccountProps = {
  params?: Record<string, any>;
};

const Account: React.FC<AccountProps> = (props) => {
  const { params } = props;

  const actionRef = useRef<ActionType>();
  const [openForm, { set, setTrue: setOpenFormTrue }] = useBoolean(false);
  const [formInfo, setFormInfo] = useState({
    type: FormTypeEnum.Add,
    id: '',
  });

  const tableColumns = useMemo(() => {
    return getTableColumns(params?.type);
  }, [params]);

  const formColumns = useMemo(() => {
    return getFormColumns(params?.type);
  }, [params]);

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
        message.success('删除成功');
        onSuccess();
      }
    });
  }, []);

  const beforeSubmit = useCallback((formData: AccountDataType) => {
    formData.roleIds = [formData.roleId];
  }, []);

  const afterRequest = useCallback((formData: AccountDataType) => {
    formData.userId = formData?.user?.userId;
    formData.nickName = formData?.user?.nickName;
    formData.userName = formData?.user?.userName;
    formData.roleId = formData?.user?.roles?.[0]?.roleId || '';
    formData.orgId = formData?.user?.orgId;
    formData.status = formData?.user?.status;
    formData.phone = formData?.user?.phone;
    formData.remark = formData?.user?.remark;
  }, []);

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
            text: '新建',
          },
        }}
        option={{
          onEditChange: onEditClick,
          onDeleteChange: onDeleteClick,
        }}
      />
      <ProConfigProvider valueTypeMap={tableSelectValueTypeMap}>
        <SchemaForm<AccountDataType, TABLESELECTVALUETYPE>
          width="800px"
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
        />
      </ProConfigProvider>
    </>
  );
};

export default Account;
