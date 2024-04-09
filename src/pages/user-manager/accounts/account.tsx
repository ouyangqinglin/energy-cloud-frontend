/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 14:39:13
 * @LastEditTime: 2023-06-19 15:27:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\user-manager\accounts\account.tsx
 */
import React, { useState, useMemo } from 'react';
import type { AccountListDataType, CustomerInfo } from './data.d';
import { getAccountList } from './service';
import YTProTable from '@/components/YTProTable';
import type { YTProTableProps, YTProColumns } from '@/components/YTProTable/typing';
import { useBoolean } from 'ahooks';
import { CustomerModal } from './components/edit';
import { FormOperations } from '@/components/YTModalForm/typing';
import YTModalForm from '@/components/YTModalForm';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { effectStatus } from '@/utils/dict';
import { getLocale } from '@/utils';

export enum PageTypeEnum {
  Custom,
  Platform,
  Station,
}

type AccountsProps = {
  type?: PageTypeEnum;
};

const Account: React.FC<AccountsProps> = (props) => {
  const { type } = props;

  const columns = useMemo<YTProColumns<AccountListDataType>[]>(
    () => [
      {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 48,
      },
      {
        title: '账号',
        dataIndex: 'account',
        width: 140,
        ellipsis: true,
      },
      {
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        title: '角色',
        dataIndex: 'roles',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        width: 120,
        hideInSearch: true,
      },
      {
        title: '安装商',
        width: 120,
        ellipsis: true,
        dataIndex: 'serviceOrganization',
        hideInSearch: type == PageTypeEnum.Platform || type == PageTypeEnum.Station,
        hideInTable: type == PageTypeEnum.Platform || type == PageTypeEnum.Station,
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueEnum: effectStatus,
      },
      {
        title: '备注',
        dataIndex: 'note',
        hideInSearch: true,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateRange',
        hideInSearch: true,
        width: 150,
      },
      {
        title: '创建人',
        dataIndex: 'creator',
        hideInSearch: true,
      },
      {
        title: '最后更新时间',
        dataIndex: 'updateTime',
        valueType: 'dateTime',
        hideInSearch: true,
        width: 150,
      },
      {
        title: '更新人',
        dataIndex: 'operator',
        hideInSearch: true,
      },
    ],
    [type],
  );

  const [state, { toggle, setTrue }] = useBoolean(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<CustomerInfo>({} as CustomerInfo);
  const customConfig: YTProTableProps<AccountListDataType, any> = {
    toolBarRenderOptions: {
      add: {
        onClick() {
          setInitialValues({} as CustomerInfo);
          setOperations(FormOperations.CREATE);
          setTrue();
        },
      },
    },
    option: {
      onDeleteChange() {},
      onEditChange(_, entity) {
        setInitialValues({ ...entity } as CustomerInfo);
        setOperations(FormOperations.UPDATE);
        setTrue();
      },
    },
  };

  return (
    <>
      <YTProTable<AccountListDataType>
        columns={columns}
        {...customConfig}
        request={(params) => getAccountList(params)}
      />
      <CustomerModal
        initialValues={initialValues}
        operations={operations}
        visible={state}
        onVisibleChange={toggle}
      />
      {/* <YTModalForm<any>
        title={'test'}
        visible={state}
        onVisibleChange={toggle}
        columns={[]}
        operations={operations}
      >
        <ProFormText
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText name="company" label="我方公司名称" placeholder="请输入名称" />
      </YTModalForm> */}
    </>
  );
};

export default Account;
