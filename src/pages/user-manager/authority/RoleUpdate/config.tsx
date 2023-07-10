import { effectStatus } from '@/utils/dictionary';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { Tree } from 'antd';

export const columns: ProFormColumnsType[] = [
  {
    title: '角色名称',
    fieldProps: {
      placeholder: '请输入角色名称',
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入角色名称',
        },
      ],
    },
    dataIndex: 'roleName',
  },
  {
    title: '状态',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择状态',
        },
      ],
    },
    valueEnum: effectStatus,
    fieldProps: {
      placeholder: '请输入',
    },
    dataIndex: 'status',
  },
  {
    title: '备注：',
    dataIndex: 'remark',
    valueType: 'textarea',
    fieldProps: {
      placeholder: '请输入',
      className: 'w-full',
    },
  },
  // {
  //   title: '菜单权限',
  //   dataIndex: 'menuIds',
  //   renderFormItem: () => {
  //     return <Tree
  //       checkable={true}
  //       multiple={true}
  //       checkStrictly={true}
  //       defaultExpandAll={false}
  //       treeData={menuTree}
  //       checkedKeys={}
  //       onCheck={(keys: any) => {
  //         setMenuIds(keys.checked);
  //       }}
  //     />
  //   }
  // }
];
