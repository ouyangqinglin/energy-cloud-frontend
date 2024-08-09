import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import YTProTable from '@/components/YTProTable';
import { FormOperations } from '@/components/YTModalForm/typing';
import { getUpgradeTaskList, getVersionList, getModuleList, deleteTaskList } from './service';
import type { UpgradeListType } from './type';
import { taskStatus, taskDetailColumns } from './config';
import type { DeviceDataType } from '@/services/equipment';
import { getProductTypeTree } from '@/services/equipment';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import type { ActionType } from '@ant-design/pro-components';
import { useToggle } from 'ahooks';
import { Update } from './Update';
import { Modal, message, Button } from 'antd';
import type { RemoteUpgradeDataRes } from '../log/type';
import { TaskDetail } from './ReadDetail/config';
import { getTaskDetail } from './service';
import DetailDialog from '@/components/DetailDialog';
import Detail from '@/components/Detail';
import { formatMessage } from '@/utils';
import { FormattedMessage } from 'umi';
import { useAuthority } from '@/hooks';
import type { ListDataType } from '@/utils/dictionary';

const UpgradeTask: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [initialValues, setInitialValues] = useState<UpgradeListType>({} as UpgradeListType);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [updateModal, { set: setUpdateModal }] = useToggle<boolean>(false);
  const { authorityMap } = useAuthority(['upgradManage:task:add']);
  const [productTypeList, setProductTypeList] = useState<ListDataType[]>([]);

  const requestProductTypeTree = () => {
    return getProductTypeTree().then(({ data }) => {
      setProductTypeList(data || []);
    });
  };

  useEffect(() => {
    requestProductTypeTree();
  }, []);

  const onAddClick = useCallback(() => {
    setOperations(FormOperations.CREATE);
    // @ts-ignore
    setInitialValues({ type: '2' });
    setUpdateModal(true); //打开弹窗
  }, []);

  const customListConfig: YTProTableCustomProps<UpgradeListType, any> = {
    toolBarRenderOptions: {
      add: {
        onClick: onAddClick,
        show: authorityMap.get('upgradManage:task:add'),
      },
    },
  };

  const customConfig: YTProTableCustomProps<UpgradeListType, any> = {
    toolBarRenderOptions: {
      add: {
        show: false,
      },
    },
  };

  const requestList = useCallback((params) => {
    const { productTypeInfo, ...rest } = params;
    const [productTypeId, productId] = productTypeInfo || [];
    const filters = productId ? { productId } : { productTypeId };
    return getUpgradeTaskList({ ...rest, ...filters });
  }, []);

  const productTypeColumn: ProColumns = {
    title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
    dataIndex: 'productTypeName',
    formItemProps: {
      name: 'productTypeInfo',
    },
    hideInTable: true,
    valueType: 'cascader',
    fieldProps: (form) => {
      return {
        fieldNames: {
          label: 'name',
          value: 'id',
        },
        options: productTypeList,
        changeOnSelect: true,
        onChange: () => {
          form.setFieldValue('moduleMark', null);
          form.setFieldValue('id', null);
        },
      };
    },
  };

  //获取模块下拉框数据--依赖产品型号id
  const requestModule = useCallback(({ productTypeInfo }) => {
    if (productTypeInfo[1]) {
      return getModuleList({
        productId: productTypeInfo[1],
      }).then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            label: item?.moduleName || '',
            value: item?.moduleMark || '',
          };
        });
      });
    } else {
      return Promise.resolve([]);
    }
  }, []);

  const moduleColumn = {
    title: formatMessage({ id: 'common.module', defaultMessage: '模块' }),
    dataIndex: 'moduleName',
    formItemProps: {
      name: 'moduleMark',
    },
    hideInTable: true,
    dependencies: ['productTypeInfo'],
    request: requestModule,
  };

  //获取升级版本号--依赖产品型号id
  const requestVersion = useCallback(({ productTypeInfo }) => {
    if (productTypeInfo[1]) {
      return getVersionList({ productId: productTypeInfo[1], current: 1, pageSize: 2000 }).then(
        ({ data }) => {
          return data?.list.map?.((item: { version: any; id: any }) => {
            return {
              label: item?.version || '',
              value: item?.id || '',
            };
          });
        },
      );
    } else {
      return Promise.resolve([]);
    }
  }, []);

  const versionList = {
    title: formatMessage({ id: 'upgradeManage.upgraVersion', defaultMessage: '升级版本' }),
    dataIndex: 'version',
    formItemProps: {
      name: 'id',
    },
    hideInTable: true,
    dependencies: ['productTypeInfo'],
    request: requestVersion,
  };

  //升级时间
  const upgradTime = {
    title: formatMessage({ id: 'upgradeManage.upgradeTime', defaultMessage: '升级时间' }),
    dataIndex: 'upgradeTime',
    valueType: 'dateRange',
    width: 150,
    render: (_: any, record: any) => record.upgradeTime,
    search: {
      transform: (value: any) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  };

  //删除升级任务
  const onCleanClick = useCallback((record: any) => {
    Modal.confirm({
      title: (
        <strong>
          <FormattedMessage id="upgradeManage.clearConfirm" defaultMessage="清除确认" />
        </strong>
      ),
      content: formatMessage({
        id: 'upgradeManage.clearConfirmTips',
        defaultMessage: '您确认要删除该升级任务吗？删除之后无法恢复',
      }),
      okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
      cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
      onOk: () => {
        return deleteTaskList({ id: record.id })?.then?.(({ code, data }) => {
          if (code == '200' || data) {
            message.success(formatMessage({ id: 'common.del', defaultMessage: '删除成功' }));
            actionRef?.current?.reload?.();
          }
        });
      },
    });
  }, []);

  //编辑升级任务
  const onEditEvents = useCallback((record: any) => {
    //掉接口获取数据吗
    setInitialValues({ ...record });
    setOperations(FormOperations.UPDATE);
    setUpdateModal(true);
  }, []);

  const [open, setOpen] = useState(false); //打开查看详情弹窗
  const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const [viewDetailData, setViewDetailData] = useState();
  const [detailParams, setDetailParams] = useState();

  //查看详情
  const onViewEvents = useCallback((record) => {
    switchOpen();
    setViewDetailData(record);
    setDetailParams(record);
  }, []);

  //查看详情列表--根据列表id获取
  const requestDetailList = useCallback((params) => {
    return getTaskDetail(params).then(({ data }) => {
      const listdata = {
        data: {
          list: data?.upgradeRecordList,
          total: data?.upgradeRecordList.length,
        },
      };
      return listdata;
    });
  }, []);

  // @ts-ignore
  const columnsNew = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      productTypeColumn,
      moduleColumn,
      versionList,
      {
        title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
        dataIndex: 'index',
        valueType: 'index',
        width: 80,
      },
      {
        title: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }),
        dataIndex: 'productModel',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.version', defaultMessage: '版本号' }),
        dataIndex: 'version',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.softwarePackage', defaultMessage: '软件包名' }),
        dataIndex: 'packageName',
        width: 120,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'common.module', defaultMessage: '模块' }),
        dataIndex: 'moduleName',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
        dataIndex: 'productTypeName',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.createTime', defaultMessage: '创建时间' }),
        dataIndex: 'createTime',
        valueType: 'dateTime',
        hideInSearch: true,
        width: 150,
      },
      upgradTime,
      {
        title: formatMessage({ id: 'common.lastPer', defaultMessage: '最后更新人' }),
        dataIndex: 'updater',
        hideInSearch: true,
        width: 100,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'upgradeManage.statusTask', defaultMessage: '任务状态' }),
        dataIndex: 'status',
        width: 100,
        ellipsis: true,
        hideInSearch: true,
        valueEnum: taskStatus,
      },
      //自定义操作栏
      {
        title: formatMessage({ id: 'common.operate', defaultMessage: '操作' }),
        valueType: 'option',
        width: 100,
        fixed: 'right',
        render: (_, record, action) => {
          return record.status == 1 ? (
            <Button type="link" size="small" key="detail" onClick={() => onViewEvents(record)}>
              <FormattedMessage id="common.detail" defaultMessage="查看详情" />
            </Button>
          ) : (
            <div>
              <Button type="link" size="small" key="edit" onClick={() => onEditEvents(record)}>
                <FormattedMessage id="common.edit" defaultMessage="编辑" />
              </Button>
              <Button type="link" size="small" key="del" onClick={() => onCleanClick(record)}>
                <FormattedMessage id="common.delete" defaultMessage="删除" />
              </Button>
            </div>
          );
        },
      },
    ];
  }, [productTypeColumn]);

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, [actionRef]);

  //查看详情--设备列表
  const viewDetailTable = (
    <>
      <Detail.DotLabel
        title={<FormattedMessage id="upgradeManage.upgradeRes" defaultMessage="升级结果" />}
      />
      <YTProTable<RemoteUpgradeDataRes, RemoteUpgradeDataRes>
        // @ts-ignore
        columns={taskDetailColumns}
        // @ts-ignore
        request={requestDetailList}
        //request={requestList}
        rowKey="id"
        {...customConfig}
        params={detailParams}
        search={false} //隐藏搜索重置按钮
        options={{
          setting: false, //隐藏设置按钮
          density: false,
          fullScreen: false,
          reload: false,
        }}
      />
    </>
  );
  return (
    <>
      <YTProTable<RemoteUpgradeDataRes, RemoteUpgradeDataRes>
        // @ts-ignore
        columns={columnsNew}
        actionRef={actionRef}
        // @ts-ignore
        request={requestList}
        rowKey="id"
        {...customListConfig}
      />
      <Update
        {...{
          operations: operations,
          visible: updateModal,
          onVisibleChange: setUpdateModal,
          id: initialValues?.id,
          initialValues: initialValues,
          onSuccess: onSuccess,
        }}
      />
      {/* 查看详情弹窗 */}
      <DetailDialog
        width="50%"
        title={<FormattedMessage id="common.viewDetail" defaultMessage="查看详情" />}
        open={open}
        onCancel={switchOpen}
        detailProps={{
          data: viewDetailData,
          items: TaskDetail,
          column: 4,
          labelStyle: { width: '90px' },
        }}
        prepend={
          <Detail.DotLabel
            title={<FormattedMessage id="upgradeManage.taskDetail" defaultMessage="任务详情" />}
          />
        }
        append={viewDetailTable}
      />
    </>
  );
};

export default UpgradeTask;
