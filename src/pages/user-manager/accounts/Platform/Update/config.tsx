import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { TABLESELECT } from '@/components/TableSelect';
import { FormOperations } from '@/components/YTModalForm/typing';
import { effectStatus } from '@/utils/dictionary';
import type { ProColumns } from '@ant-design/pro-components';
import { Select } from 'antd';
import { isEmpty, isNil } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { getRoleListForCurrentUser, getServiceProviderList, getSiteList } from '../service';
import type { TransformCustomerUpdateInfo } from '../type';

export const Columns: (
  operation: FormOperations,
) => ProColumns<TransformCustomerUpdateInfo, TABLESELECTVALUETYPE>[] = (operation) => {
  return [
    {
      title: '账户',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      dataIndex: ['userName'],
    },
    {
      title: '用户名',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      dataIndex: 'nickName',
    },
    {
      title: '电话',
      dataIndex: ['phonenumber'],
    },
    {
      title: '角色',
      dataIndex: 'roleIds',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      hideInTable: true,
      fieldProps: {
        mode: 'multiple',
      },
      renderFormItem(schema, config, form, action) {
        const rolesMap = form?.getFieldValue('rolesMap');
        return <Select mode="multiple" allowClear options={rolesMap} />;
      },
    },
    {
      title: '状态',
      dataIndex: ['status'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      valueEnum: effectStatus,
    },
    {
      title: operation === FormOperations.CREATE ? '初始密码' : '修改密码',
      valueType: 'password',
      colProps: {
        span: 16,
      },
      dataIndex: 'password',
    },
    {
      title: '备注',
      colProps: {
        span: 16,
      },
      dataIndex: ['remark'],
      valueType: 'textarea',
    },
  ];
};
