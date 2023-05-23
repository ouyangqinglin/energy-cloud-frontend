import React from 'react';
import type { AccountListDataType } from './data.d';
import { getAccountList } from './service';
import YTProTable from '@/components/YTProTable';
import type { CustomTableProps, YTProColumns } from '@/components/YTProTable/typing';
import { useToggle } from 'ahooks';
import { YTModalForm } from './components/edit';

const Customer: React.FC = () => {
  const columns: YTProColumns<AccountListDataType>[] = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
    },
    {
      title: '用户账号',
      dataIndex: 'account',
      width: 140,
      ellipsis: true,
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '角色',
      dataIndex: 'role',
      hideInSearch: true,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: 120,
      hideInSearch: true,
    },
    {
      title: '服务机构',
      width: 120,
      ellipsis: true,
      dataIndex: 'serviceOrganization',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: new Map([
        [1, '有效'],
        [0, '无效'],
      ]),
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
      render: (_, record) => <span>{record.createTime}</span>,
      hideInSearch: true,
      width: 150,
    },
    // {
    //   title: '代理商',
    //   dataIndex: 'provider',
    //   valueType: 'select',
    //   hideInTable: true,
    //   request: async () => {
    //     const {
    //       data: { provider = [] },
    //     } = await getProviders();
    //     const rawSource = provider.map((it) => {
    //       return {
    //         label: it.name,
    //         value: it.id,
    //       };
    //     });
    //     return rawSource;
    //   },
    //   width: 150,
    // },
    {
      title: '代理商',
      dataIndex: 'provider',
      valueType: 'select',
      hideInTable: true,
      requestOption: {
        url: '/accounts/get/provider',
        mapKey: {
          label: 'name',
          value: 'id',
        },
        dataIndex: 'provider',
      },
      width: 150,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      hideInSearch: true,
    },
    {
      title: '最后操作时间',
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
  ];

  const [state, { setLeft, setRight }] = useToggle<boolean>(false);
  const customConfig: CustomTableProps<AccountListDataType, any> = {
    toolbar: {
      onChange() {
        setRight();
      },
    },
    option: {
      onDeleteChange() {},
    },
  };

  return (
    <>
      <YTProTable<AccountListDataType>
        columns={columns}
        {...customConfig}
        scroll={{ x: 1366 }}
        request={(params) => getAccountList(params)}
      />
      <YTModalForm open={state} onClose={setLeft} />
    </>
  );
};

export default Customer;
