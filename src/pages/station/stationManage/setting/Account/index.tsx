/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-03 14:00:53
 * @LastEditTime: 2023-07-03 16:32:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\Account\index.tsx
 */

import React, { useCallback, useRef, useState } from 'react';
import { useModel } from 'umi';
import { useBoolean } from 'ahooks';
import type { ActionType } from '@ant-design/pro-table';
import type { AccountType } from './type';
import { getPage, getData, addData, editData } from './service';
import YTProTable from '@/components/YTProTable';
import SchemaForm, { FormTypeEnum } from '@/components/SchamaForm';
import { columns, formColumns } from './config';

const Account: React.FC = () => {
  const [openForm, { set, setTrue: setOpenFormTrue }] = useBoolean(false);
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const [formInfo, setFormInfo] = useState({
    type: FormTypeEnum.Add,
    id: '',
  });
  const actionRef = useRef<ActionType>();

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

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, []);

  return (
    <>
      <YTProTable<AccountType, Pick<AccountType, 'siteId'>>
        actionRef={actionRef}
        columns={columns}
        toolbar={{
          onChange: onAddClick,
          buttonText: '新增用户',
        }}
        option={{
          onEditChange: onEditChange,
        }}
        params={{
          siteId,
        }}
        request={getPage}
      />
      <SchemaForm<AccountType>
        title="用户"
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
