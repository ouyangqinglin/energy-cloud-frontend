import React, { useState, useRef } from 'react';
import { Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumnType, ActionType } from '@ant-design/pro-components';
import { getColumns } from './config';
import { useRequest } from 'umi';
import type { PageTemplateType } from './data';
import { formatMessage } from '@/utils';
import YTProTable from '@/components/YTProTable';
import { getPageTemplate, updateMenu, addMenu, deleteMenu, getproduct } from './service';
import UpdateForm from './components/edit';

const PhysicalModel: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showType, setShowType] = useState<'add' | 'edit' | 'check'>('add');
  const [currentRow, setCurrentRow] = useState<Partial<PageTemplateType>>({});
  const productIdsEnum: any[] = useRequest(getproduct).data || [];
  /*
   *@Author: aoshilin
   *@Date: 2024-01-29 17:35:23
   *@Description: 新增
   */
  const handleAdd = async (fields: PageTemplateType) => {
    const hide = message.loading('正在添加');
    try {
      const resp = await addMenu({ ...fields });
      hide();
      if (resp.code === 200) {
        message.success('添加成功');
      } else {
        message.error(resp.msg);
      }
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };
  /*
   *@Author: aoshilin
   *@Date: 2024-01-29 17:35:40
   *@Description: 编辑
   */
  const handleUpdate = async (fields: PageTemplateType) => {
    const hide = message.loading('正在配置');
    try {
      const resp = await updateMenu(fields);
      hide();
      if (resp.code === 200) {
        message.success('配置成功');
      } else {
        message.error(resp.msg);
      }
      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
      return false;
    }
  };
  /*
   *@Author: aoshilin
   *@Date: 2024-01-29 17:36:46
   *@Description: 删除
   */
  const handleRemoveOne = async (selectedRow: PageTemplateType) => {
    const hide = message.loading('正在删除');
    if (!selectedRow) return true;
    try {
      const params = { id: selectedRow.id };
      const resp = await deleteMenu(params);
      hide();
      if (resp.code === 200) {
        message.success('删除成功，即将刷新');
      } else {
        message.error(resp.msg);
      }
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  const handleproduct = () => {
    const result = {} as any;
    productIdsEnum.forEach((item) => {
      result[item.id] = {
        text: item.model,
      };
    });
    return result;
  };
  const operationColumn: ProColumnType[] = [
    {
      title: formatMessage({ id: 'pages.searchTable.titleOption', defaultMessage: '操作' }),
      dataIndex: 'option',
      width: '220px',
      valueType: 'option',
      render: (_, record) => {
        const rowData = record as PageTemplateType;
        return [
          <Button
            type="link"
            size="small"
            key="edit"
            onClick={() => {
              setModalVisible(true);
              setCurrentRow(rowData);
              setShowType('check');
            }}
          >
            {formatMessage({ id: 'common.viewDetail1', defaultMessage: '查看' })}
          </Button>,
          <Button
            type="link"
            size="small"
            key="edit"
            hidden={!rowData.editable}
            onClick={() => {
              setModalVisible(true);
              setCurrentRow(rowData);
              setShowType('edit');
            }}
          >
            {formatMessage({ id: 'pages.searchTable.edit', defaultMessage: '编辑' })}
          </Button>,
          <Button
            type="link"
            size="small"
            danger
            key="batchRemove"
            hidden={!rowData.editable}
            onClick={async () => {
              Modal.confirm({
                title: '删除',
                content: '确定删除该项吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                  const success = await handleRemoveOne(rowData);
                  if (success) {
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  }
                },
              });
            }}
          >
            {formatMessage({ id: 'pages.searchTable.delete', defaultMessage: '删除' })}
          </Button>,
        ];
      },
    },
    {
      title: formatMessage({ id: 'pageTemplate.productModels', defaultMessage: '关联产品型号' }),
      dataIndex: 'productId',
      valueType: 'select',
      ellipsis: true,
      hideInTable: true,
      valueEnum: handleproduct(),
    },
  ];
  const columns = getColumns(operationColumn);
  return (
    <>
      <YTProTable
        columns={columns}
        actionRef={actionRef}
        request={getPageTemplate}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={async () => {
              setCurrentRow({});
              setModalVisible(true);
              setShowType('add');
            }}
          >
            <PlusOutlined />{' '}
            {formatMessage({ id: 'pages.searchTable.new', defaultMessage: '新建' })}
          </Button>,
        ]}
      />
      <UpdateForm
        onSubmit={async (values) => {
          let success = false;
          if (values.id) {
            success = await handleUpdate({ ...values } as any);
          } else {
            success = await handleAdd({ ...values } as any);
          }
          if (success) {
            setModalVisible(false);
            setCurrentRow({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setModalVisible(false);
          setCurrentRow({});
        }}
        showType={showType}
        visible={modalVisible}
        values={currentRow}
      />
    </>
  );
};

export default PhysicalModel;
