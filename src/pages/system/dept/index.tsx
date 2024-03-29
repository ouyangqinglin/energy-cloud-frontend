import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, message, Modal } from 'antd';
import YTProTable from '@/components/YTProTable';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useAccess } from 'umi';
import { FooterToolbar } from '@ant-design/pro-layout';
import WrapContent from '@/components/WrapContent';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { DeptType, DeptListParams } from './data.d';
import { getDeptList, getDeptListExcludeChild, removeDept, addDept, updateDept } from './service';
import UpdateForm from './components/edit';
import { getDict } from '../dict/service';
import { buildTreeData } from '@/utils/utils';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: DeptType) => {
  const hide = message.loading('正在添加');
  try {
    const resp = await addDept({ ...fields });
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

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: DeptType) => {
  const hide = message.loading('正在配置');
  try {
    const resp = await updateDept(fields);
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

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: DeptType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const resp = await removeDept(selectedRows.map((row) => row.orgId).join(','));
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

const handleRemoveOne = async (selectedRow: DeptType) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.orgId];
    const resp = await removeDept(params.join(','));
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

const DeptTableList: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<DeptType>();
  const [selectedRowsState, setSelectedRows] = useState<DeptType[]>([]);

  const [deptTree, setDeptTree] = useState<any>([]);
  const [statusOptions, setStatusOptions] = useState<any>([]);

  /** 国际化配置 */
  const intl = useIntl();

  const access = useAccess();

  useEffect(() => {
    getDict('sys_normal_disable').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item: any) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setStatusOptions(opts);
      }
    });
  }, []);

  const columns: ProColumns<DeptType>[] = [
    {
      title: <FormattedMessage id="system.Dept.dept_name" defaultMessage="组织名称" />,
      dataIndex: 'orgName',
      width: 150,
    },
    {
      title: <FormattedMessage id="system.Dept.order_num" defaultMessage="显示顺序" />,
      dataIndex: 'orderNum',
      width: 100,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="system.Dept.status" defaultMessage="状态" />,
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusOptions,
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 120,
      render: (_, record) => [
        <Button
          type="link"
          size="small"
          key="edit"
          hidden={!access.hasPerms('system:dept:edit')}
          onClick={() => {
            getDeptList().then((res) => {
              if (res.code === 200) {
                let depts = buildTreeData(res.data, 'orgId', 'orgName', '', '', '');
                if (depts.length === 0) {
                  depts = [{ id: 0, title: '无上级', children: undefined, key: 0, value: 0 }];
                }
                setDeptTree(depts);
                setModalVisible(true);
                setCurrentRow(record);
              } else {
                message.warn(res.msg);
              }
            });
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="编辑" />
        </Button>,
        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          hidden={!access.hasPerms('system:dept:remove')}
          onClick={async () => {
            Modal.confirm({
              title: formatMessage({ id: 'common.delete', defaultMessage: '删除' }),
              content: formatMessage({
                id: 'system.Notice.delete_item_confirm',
                defaultMessage: '确定删除该项吗？',
              }),
              okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
              cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
              onOk: async () => {
                const success = await handleRemoveOne(record);
                if (success) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              },
            });
          }}
        >
          <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
        </Button>,
      ],
    },
  ];

  return (
    <WrapContent>
      <div style={{ width: '100%', float: 'right' }}>
        <YTProTable<DeptType>
          actionRef={actionRef}
          rowKey="orgId"
          key="deptList"
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              hidden={!access.hasPerms('system:dept:add')}
              onClick={async () => {
                getDeptList().then((res) => {
                  if (res.code === 200) {
                    setDeptTree(buildTreeData(res.data, 'orgId', 'orgName', '', '', ''));
                    setCurrentRow({ status: '0' });
                    setModalVisible(true);
                  } else {
                    message.warn(res.msg);
                  }
                });
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
            </Button>,
            <Button
              type="primary"
              key="remove"
              hidden={selectedRowsState?.length === 0 || !access.hasPerms('system:dept:remove')}
              onClick={async () => {
                const success = await handleRemove(selectedRowsState);
                if (success) {
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                }
              }}
            >
              <DeleteOutlined />
              <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
            </Button>,
          ]}
          request={(params) =>
            getDeptList({ ...params } as DeptListParams).then((res) => {
              res.data = {
                list: buildTreeData(res.data, 'orgId', '', '', '', ''),
                total: res.data.length,
              };
              return res;
            })
          }
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
        />
      </div>
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            key="remove"
            hidden={!access.hasPerms('system:dept:remove')}
            onClick={async () => {
              Modal.confirm({
                title: '删除',
                content: '确定删除该项吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                  const success = await handleRemove(selectedRowsState);
                  if (success) {
                    setSelectedRows([]);
                    actionRef.current?.reloadAndRest?.();
                  }
                },
              });
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
        </FooterToolbar>
      )}
      <UpdateForm
        onSubmit={async (values) => {
          let success = false;
          if (values.orgId) {
            success = await handleUpdate({ ...values } as DeptType);
          } else {
            success = await handleAdd({ ...values } as DeptType);
          }
          if (success) {
            setModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setModalVisible(false);
          setCurrentRow(undefined);
        }}
        visible={modalVisible}
        values={currentRow || {}}
        deptTree={deptTree}
        statusOptions={statusOptions}
      />
    </WrapContent>
  );
};

export default DeptTableList;
