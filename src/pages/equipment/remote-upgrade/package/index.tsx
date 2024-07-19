import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import { useModel, useIntl, FormattedMessage } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { packageStatus } from './config';
import type { StationType } from './config';
import { getPackageList, removePackageData } from './service';
import UpdatePackageForm from './components/editDialog';
import { useAuthority } from '@/hooks';
import { useToggle } from 'ahooks';
import { getProductTypeTree } from '@/services/equipment';
import { FormOperations } from '@/components/YTModalForm/typing';
import type { PackageListType } from './type';
import { formatMessage, getLocale } from '@/utils';
import { YTDATERANGE } from '@/components/YTDateRange';
import type { YTDATERANGEVALUETYPE } from '@/components/YTDateRange';
import { ProConfigProvider } from '@ant-design/pro-components';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';

const Package: React.FC = () => {
  const [initialValues, setInitialValues] = useState<PackageListType>({} as PackageListType); //初始值为空对象
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [updateModal, { set: setUpdateModal }] = useToggle<boolean>(false);
  const intl = useIntl();
  const [productTypeList, setProductTypeList] = useState([]);
  const actionRef = useRef<ActionType>();
  const { siteType } = useModel('site', (model: any) => ({ siteType: model?.state?.siteType }));
  //控制权限相关变量
  const { authorityMap } = useAuthority([
    'upgradManage:package:add',
    'upgradManage:package:edit',
    'upgradManage:package:delete',
  ]);
  const requestList = useCallback((params) => {
    if (params.productTypeInfo) {
      params.productTypeId = params.productTypeInfo[0];
      params.productModel = params.productTypeInfo[1];
      delete params.productTypeInfo;
    }
    return getPackageList({ ...params });
  }, []);

  const requestProductTypeTree = () => {
    return getProductTypeTree().then(({ data }) => {
      setProductTypeList(data || []);
    });
  };

  useEffect(() => {
    requestProductTypeTree();
  }, []);

  const productTypeColumn = {
    title: intl.formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
    dataIndex: 'productTypeName',
    formItemProps: {
      name: 'productTypeInfo',
    },
    hideInTable: true,
    valueType: 'cascader',
    fieldProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      options: productTypeList,
      changeOnSelect: true,
    },
  };
  //添加升级包
  const onAddClick = useCallback(() => {
    setOperations(FormOperations.CREATE);
    setInitialValues({} as PackageListType);
    //setInitialValues({type:'2'});
    setUpdateModal(true); //打开弹窗
  }, []);
  //编辑升级包
  const onEditClick = useCallback((record: StationType) => {
    setInitialValues({ ...record });
    setOperations(FormOperations.UPDATE);
    setUpdateModal(true);
  }, []);

  const onSuccess = () => {
    actionRef?.current?.reload?.();
  };

  useEffect(() => {
    actionRef?.current?.reload?.();
  }, [siteType]);

  const toolBar = () => {
    return authorityMap.get('upgradManage:package:add') ? (
      [
        <Button type="primary" key="add" onClick={onAddClick}>
          <PlusOutlined />
          <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
        </Button>,
      ]
    ) : (
      <></>
    );
  };

  const rowBar = (_: any, record: StationType) => (
    <>
      {authorityMap.get('upgradManage:package:edit') && (
        <Button type="link" size="small" key="in" onClick={() => onEditClick(record)}>
          <FormattedMessage id="common.edit" defaultMessage="编辑" />
        </Button>
      )}
      {authorityMap.get('upgradManage:package:delete') && (
        <Button
          type="link"
          size="small"
          key="delete"
          onClick={() => {
            Modal.confirm({
              title: intl.formatMessage({ id: 'common.delete', defaultMessage: '删除' }),
              content: intl.formatMessage({
                id: 'upgradeManage.deleteTips',
                defaultMessage: '你确定要删除该升级包吗？删除之后无法恢复！',
              }),
              okText: intl.formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
              cancelText: intl.formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
              onOk: () => {
                removePackageData({ id: record.id }).then(() => {
                  message.success('删除成功');
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                });
              },
            });
          }}
        >
          <FormattedMessage id="common.delete" defaultMessage="删除" />
        </Button>
      )}
    </>
  );
  const columns: ProColumns<PackageListType, YTDATERANGEVALUETYPE>[] = [
    productTypeColumn,
    {
      title: intl.formatMessage({ id: 'common.index', defaultMessage: '序号' }),
      dataIndex: 'index',
      valueType: 'index',
      width: 80,
    },
    {
      title: intl.formatMessage({ id: 'common.model', defaultMessage: '产品型号' }),
      dataIndex: 'productModel',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
      // render: (_, record) => {
      //   return <a onClick={() => onSiteClick(record)}>{record.name}</a>;
      // },
    },
    {
      title: intl.formatMessage({ id: 'common.version', defaultMessage: '版本号' }),
      dataIndex: 'version',
      hideInSearch: true,
      width: 120,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'common.softwarePackage', defaultMessage: '软件包名' }),
      dataIndex: 'packageName',
      width: 100,
      ellipsis: true,
      hideInSearch: false,
    },
    {
      title: intl.formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
      dataIndex: 'productTypeName',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'common.description', defaultMessage: '描述' }),
      dataIndex: 'description',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'common.uploadDate', defaultMessage: '上传时间' }),
      dataIndex: 'uploadTime',
      valueType: YTDATERANGE,
      fieldProps: {
        dateFormat: getLocale().dateFormat,
        format: 'YYYY-MM-DD',
      },
      render: (_, record) => <span>{record.uploadTime}</span>,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
      width: 150,
    },
    {
      title: intl.formatMessage({ id: 'common.uploader', defaultMessage: '上传人' }),
      dataIndex: 'uploaderName',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: intl.formatMessage({ id: 'common.status', defaultMessage: '状态' }),
      dataIndex: 'status',
      hideInSearch: true,
      width: 100,
      valueEnum: packageStatus,
    },
    {
      title: intl.formatMessage({ id: 'common.operate', defaultMessage: '操作' }),
      valueType: 'option',
      width: 180,
      fixed: 'right',
      render: rowBar,
      hideInTable:
        !authorityMap.get('upgradManage:package:edit') &&
        !authorityMap.get('upgradManage:package:delete'),
    },
  ];

  return (
    <>
      <ProConfigProvider
        valueTypeMap={{
          ...YTDateRangeValueTypeMap,
        }}
      >
        <YTProTable<PackageListType, PackageListType>
          actionRef={actionRef}
          columns={columns}
          toolBarRender={authorityMap.get('upgradManage:package:add') ? toolBar : () => [<></>]}
          request={requestList}
        />
      </ProConfigProvider>

      <UpdatePackageForm
        {...{
          operations: operations,
          visible: updateModal,
          onVisibleChange: setUpdateModal,
          id: initialValues?.id,
          initialValues: initialValues,
          onSuccess: onSuccess,
        }}
      />
    </>
  );
};

export default Package;
