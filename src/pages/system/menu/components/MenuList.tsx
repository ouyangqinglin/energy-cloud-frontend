import { PlusOutlined, DeleteOutlined, CaretDownFilled, CaretRightFilled } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useAccess } from 'umi';
import { FooterToolbar } from '@ant-design/pro-layout';
import WrapContent from '@/components/WrapContent';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { MenuType, MenuListParams } from '../data';
import { getMenuList, removeMenu, addMenu, updateMenu } from '../service';
import UpdateForm from './edit';
import { getDict } from '../../dict/service';
import { buildTreeData } from '@/utils/utils';
import type { DataNode } from 'antd/lib/tree';
import { createIcon } from '@/utils/IconUtil';
import YTProTable from '@/components/YTProTable';
import { formatMessage } from '@/utils';
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
const handleAdd = async (fields: MenuType) => {
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

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: MenuType) => {
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

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: MenuType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const resp = await removeMenu(selectedRows.map((row) => row.menuId).join(','));
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

const handleRemoveOne = async (selectedRow: MenuType) => {
  const hide = message.loading('正在删除');
  if (!selectedRow) return true;
  try {
    const params = [selectedRow.menuId];
    const resp = await removeMenu(params.join(','));
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

type Menuprops = {
  menuType?: string;
};

const MenuTableList = (props: Menuprops) => {
  const { menuType } = props;

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<MenuType>();
  const [selectedRowsState, setSelectedRows] = useState<MenuType[]>([]);

  const [menuTree, setMenuTree] = useState<DataNode[]>([]);
  const [visibleOptions, setVisibleOptions] = useState<any>([]);
  const [statusOptions, setStatusOptions] = useState<any>([]);
  const access = useAccess();

  /** 国际化配置 */
  const intl = useIntl();

  useEffect(() => {
    getDict('sys_show_hide').then((res) => {
      if (res.code === 200) {
        const opts = {};
        res.data.forEach((item: any) => {
          opts[item.dictValue] = item.dictLabel;
        });
        setVisibleOptions(opts);
      }
    });
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

  const columns: ProColumns<MenuType>[] = [
    {
      title: <FormattedMessage id="system.Menu.menu_name" defaultMessage="菜单名称" />,
      dataIndex: 'menuName',
      width: 200,
      ellipsis: true,
      render: (_, record) => {
        return (
          <>
            <span title={record.menuName}>{record.menuName}</span>
          </>
        );
      },
    },
    {
      title: <FormattedMessage id="system.Menu.icon" defaultMessage="菜单图标" />,
      dataIndex: 'icon',
      valueType: 'text',
      hideInSearch: true,
      width: 120,
      render: (text) => createIcon(text),
    },
    {
      title: <FormattedMessage id="system.Menu.order_num" defaultMessage="显示顺序" />,
      dataIndex: 'orderNum',
      valueType: 'text',
      hideInSearch: true,
      width: 120,
    },
    {
      title: <FormattedMessage id="system.Menu.perms" defaultMessage="权限标识" />,
      dataIndex: 'perms',
      valueType: 'text',
      width: 150,
    },
    {
      title: <FormattedMessage id="system.Menu.path" defaultMessage="路由地址" />,
      dataIndex: 'path',
      valueType: 'text',
      hideInSearch: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="system.Menu.component" defaultMessage="组件路径" />,
      dataIndex: 'component',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="system.Menu.menu_type" defaultMessage="菜单类型" />,
      dataIndex: 'menuType',
      valueType: 'select',
      valueEnum: {
        M: '目录',
        C: '菜单',
        F: '按钮',
      },
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="system.Menu.status" defaultMessage="菜单状态" />,
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: statusOptions,
      width: 120,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record) => [
        <Button
          type="link"
          size="small"
          key="edit"
          hidden={!access.hasPerms('system:menu:edit')}
          onClick={() => {
            setModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.edit" defaultMessage="编辑" />
        </Button>,
        <Button
          type="link"
          size="small"
          danger
          key="batchRemove"
          hidden={!access.hasPerms('system:menu:remove')}
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
        <YTProTable<MenuType>
          actionRef={actionRef}
          rowKey="menuId"
          key="menuList"
          resizable
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              hidden={!access.hasPerms('system:menu:add')}
              onClick={async () => {
                setCurrentRow(undefined);
                setModalVisible(true);
              }}
            >
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
            </Button>,
            <Button
              type="primary"
              key="remove"
              hidden={selectedRowsState?.length === 0 || !access.hasPerms('system:menu:remove')}
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
            getMenuList({ category: menuType, ...params } as MenuListParams).then((res) => {
              const menu = { id: 0, label: '主类目', children: [] as DataNode[], value: 0 };
              const memuData = buildTreeData(res.data, 'menuId', 'menuName', '', '', '');
              menu.children = memuData;
              const treeData: any = [];
              treeData.push(menu);
              setMenuTree(treeData);
              res.data.list = memuData;
              res.data.total = memuData.length;
              return res;
            })
          }
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
          expandable={{
            expandIcon: ({ expanded, expandable, record, onExpand }) => {
              return (
                <>
                  {expandable ? (
                    <>
                      {expanded ? (
                        <CaretDownFilled
                          className="mr8 cursor table-expand-icon"
                          onClick={(e) => onExpand(record, e)}
                        />
                      ) : (
                        <CaretRightFilled
                          className="mr8 cursor table-expand-icon"
                          onClick={(e) => onExpand(record, e)}
                        />
                      )}
                    </>
                  ) : (
                    <span className="mr8 table-expand-icon"></span>
                  )}
                </>
              );
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
            hidden={!access.hasPerms('system:menu:remove')}
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
          if (values.menuId) {
            success = await handleUpdate({ ...values, category: menuType } as MenuType);
          } else {
            success = await handleAdd({ ...values, category: menuType } as MenuType);
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
        visibleOptions={visibleOptions}
        statusOptions={statusOptions}
        menuTree={menuTree}
        menuType={menuType}
      />
    </WrapContent>
  );
};

export default MenuTableList;
