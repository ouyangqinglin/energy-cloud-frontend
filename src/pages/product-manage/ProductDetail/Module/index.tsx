/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-18 15:05:27
 * @LastEditTime: 2023-08-18 16:24:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\product-manage\ProductDetail\Module\index.tsx
 */

import React, { useCallback, useRef, useState } from 'react';
import { message } from 'antd';
import YTProTable from '@/components/YTProTable';
import { columns, formColumns, ModuleDataType } from './config';
import { getPage, addData, editData, deleteData } from './service';
import { ActionType } from '@ant-design/pro-components';
import { FormTypeEnum } from '@/utils/dictionary';
import { useBoolean } from 'ahooks';
import SchemaForm from '@/components/SchemaForm';

export type ModuleProps = {
  id?: string;
};

const Module: React.FC<ModuleProps> = (props) => {
  const { id } = props;

  const actionRef = useRef<ActionType>();
  const [openForm, { set, setTrue: setOpenFormTrue }] = useBoolean(false);
  const [rowData, setRowData] = useState<ModuleDataType>({});
  const [formInfo, setFormInfo] = useState({
    type: FormTypeEnum.Add,
    id: '',
  });

  const onAddClick = useCallback(() => {
    setFormInfo({
      type: FormTypeEnum.Add,
      id: '',
    });
    setOpenFormTrue();
  }, []);

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, []);

  const getData = useCallback(() => {
    return Promise.resolve({ data: rowData });
  }, [rowData]);

  const onDeleteChange = useCallback((_, record: ModuleDataType) => {
    return deleteData({ moduleId: record?.id }).then(({ data }) => {
      if (data) {
        message.success('删除成功');
        onSuccess();
      }
    });
  }, []);

  const onEditChange = useCallback((_, record: ModuleDataType) => {
    setFormInfo({
      type: FormTypeEnum.Edit,
      id: record.id as string,
    });
    setOpenFormTrue();
    setRowData({ ...record });
  }, []);

  const beforeSubmit = useCallback(
    (formData: ModuleDataType) => {
      formData.productId = id;
    },
    [id],
  );

  return (
    <>
      <YTProTable
        actionRef={actionRef}
        columns={columns}
        params={{ productId: id }}
        request={getPage}
        option={{
          onDeleteChange,
          onEditChange,
        }}
        toolBarRenderOptions={{
          add: {
            onClick: onAddClick,
          },
        }}
      />
      <SchemaForm<ModuleDataType>
        width="400px"
        type={formInfo.type}
        columns={formColumns}
        open={openForm}
        onOpenChange={set}
        id={formInfo.id}
        addData={addData}
        getData={getData}
        editData={editData}
        beforeSubmit={beforeSubmit}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default Module;
