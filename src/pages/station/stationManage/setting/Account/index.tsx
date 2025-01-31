/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-03 14:00:53
 * @LastEditTime: 2023-07-05 11:16:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\Account\index.tsx
 */

import React, { useCallback, useRef, useState } from 'react';
import { message } from 'antd';
import { useModel } from 'umi';
import { useBoolean } from 'ahooks';
import type { ActionType } from '@ant-design/pro-table';
import type { AccountType } from './type';
import { getPage, getData, addData, editData, deleteData } from './service';
import YTProTable from '@/components/YTProTable';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { columns, formColumns } from './config';

const Account: React.FC = () => {
  const [openForm, { set, setTrue: setOpenFormTrue }] = useBoolean(false);
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const [formInfo, setFormInfo] = useState({
    type: FormTypeEnum.Add,
    id: '',
  });
  const actionRef = useRef<ActionType>();

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

  const onEditChange = useCallback((_, row: AccountType) => {
    setFormInfo({
      type: FormTypeEnum.Edit,
      id: row.userId,
    });
    setOpenFormTrue();
  }, []);

  const onDeleteChange = useCallback((_, record: AccountType) => {
    return deleteData({ userIds: [record.userId] }).then(({ data }) => {
      if (data) {
        message.success('删除成功');
        onSuccess();
      }
    });
  }, []);

  const beforeSubmit = useCallback((formData: AccountType) => {
    formData.roleIds = [formData.roleId];
  }, []);

  const afterRequest = useCallback((formData: AccountType) => {
    formData.userId = formData?.user?.userId;
    formData.nickName = formData?.user?.nickName;
    formData.userName = formData?.user?.userName;
    formData.roleId = formData?.user?.roles?.[0]?.roleId;
    formData.status = formData?.user?.status;
    formData.phonenumber = formData?.user?.phonenumber;
    formData.remark = formData?.user?.remark;
  }, []);

  return (
    <>
      <YTProTable<AccountType, Pick<AccountType, 'siteId'>>
        actionRef={actionRef}
        columns={columns}
        toolBarRenderOptions={{
          add: {
            onClick: onAddClick,
            text: '新建',
          },
        }}
        option={{
          onEditChange: onEditChange,
          onDeleteChange: onDeleteChange,
        }}
        params={{
          siteId,
        }}
        request={getPage}
      />
      <SchemaForm<AccountType>
        suffixTitle="用户"
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
        extraData={{
          siteIds: [siteId],
        }}
        grid={true}
        colProps={{
          span: 12,
        }}
      />
    </>
  );
};

export default Account;
