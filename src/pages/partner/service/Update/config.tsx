import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { isCreate } from '@/components/YTModalForm/helper';
import { FormOperations } from '@/components/YTModalForm/typing';
import { effectStatus } from '@/utils/dictionary';
import type { ProColumns } from '@ant-design/pro-components';
import { isNil } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { getServiceId } from '../service';
import type { ServiceUpdateInfo } from '../type';

export const Columns: (
  operation: FormOperations,
  orgId: number,
) => ProColumns<ServiceUpdateInfo, TABLESELECTVALUETYPE>[] = (operation, orgId) => {
  return [
    {
      title: '服务商名称',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      dataIndex: ['orgName'],
    },
    {
      title: '服务商ID',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      request: async () => {
        if (isCreate(operation)) {
          const res = await getServiceId();
          if (res) {
            return res.data;
          }
        }
        return await orgId;
      },
      // dataIndex: 'orgId',
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
      title: '电话',
      dataIndex: ['phonenumber'],
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
