import React, { useCallback, useMemo, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import YTProTable from '@/components/YTProTable';
import { getLogList, getProductSnList, getVersionList, getModuleList } from './service';
import { RemoteUpgradeDataRes } from './type';
import { useSiteColumn, useSearchSelect } from '@/hooks';
import { SearchParams } from '@/hooks/useSearchSelect';
import { DeviceDataType, getProductTypeList } from '@/services/equipment';
import { formatMessage } from '@/utils';
import { FormattedMessage } from 'umi';
import { Modal } from 'antd';

const Log: React.FC = () => {
  const [upgradeStatus, setUpgradeStatus] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [failReason, setFailReason] = useState();
  //打开升级失败的弹窗
  const statusClick = useCallback((record: DeviceDataType) => {
    setIsModalOpen(true);
    const reason = record?.statusDesc || '';
    setFailReason(reason);
  }, []);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const requestList = useCallback((params) => {
    return getLogList({ ...params });
  }, []);

  //获取产品类型
  const requestProductType = useCallback((searchParams: SearchParams) => {
    return getProductTypeList(searchParams).then(({ data }) => {
      return data?.map?.((item) => {
        return {
          label: item?.name || '',
          value: item?.id || '',
        };
      });
    });
  }, []);

  const productTypeColumn = {
    title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
    dataIndex: 'productTypeName',
    formItemProps: {
      name: 'productTypeId',
    },
    fieldProps: {
      onChange: (productTypeId: any) => {},
    },
    hideInTable: true,

    request: requestProductType,
  };
  //获取产品型号--依赖产品类型
  const requestProductSn = useCallback((params) => {
    if (params?.productTypeId) {
      return getProductSnList({
        productTypeId: params?.productTypeId,
      }).then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            label: item?.model || '',
            value: item?.id || '',
          };
        });
      });
    } else {
      return Promise.resolve([]);
    }
  }, []);
  const productSnColumn = {
    title: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }),
    dataIndex: 'productModel',
    formItemProps: {
      name: 'productModel',
    },
    hideInTable: true,
    dependencies: ['productTypeId'],
    fieldProps: (form) => {
      return {
        onChange: () => {
          form?.setFieldValue?.('moduleMark', ''); //清空模块的数据
          form?.setFieldValue?.('id', ''); //清空版本号数据
        },
      };
    },
    request: requestProductSn,
  };
  //获取站点信息
  const [siteColumn] = useSiteColumn<DeviceDataType>({
    hideInTable: true,
  });
  //获取模块下拉框数据--依赖产品型号id
  const requestModule = useCallback((params) => {
    if (params?.productModel) {
      return getModuleList({
        productId: params?.productModel,
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
      name: 'moduleMark', //模块id
    },
    hideInTable: true,
    dependencies: ['productModel'],
    request: requestModule,
  };
  //获取升级版本号--依赖产品型号id
  const requestVersion = useCallback((params) => {
    if (params?.productModel) {
      return getVersionList({ productId: params?.productModel, current: 1, pageSize: 2000 }).then(
        ({ data }) => {
          return data?.list?.map?.((item) => {
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
    dependencies: ['productModel'],
    request: requestVersion,
  };

  // const [versionList] = useSearchSelect<DeviceDataType>({
  //   proColumns: {
  //     title: '升级版本',
  //     dataIndex: 'version',
  //     formItemProps: {
  //       name: 'id',
  //     },
  //     hideInTable: true,
  //     dependencies: ['productModel'],
  //   },
  //   request: requestVersion,
  // });

  const columnsNew = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      siteColumn,
      productTypeColumn,
      productSnColumn,
      moduleColumn,
      versionList,
      {
        title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
        dataIndex: 'index',
        valueType: 'index',
        width: 80,
      },
      {
        title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
        dataIndex: 'deviceName',
        width: 120,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
        dataIndex: 'deviceSn',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }),
        dataIndex: 'productModel',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.module', defaultMessage: '模块' }),
        dataIndex: 'moduleName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
        dataIndex: 'typeName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.siteName', defaultMessage: '站点名称' }),
        dataIndex: 'siteName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },

      {
        title: formatMessage({ id: 'common.softwarePackage', defaultMessage: '软件包名' }),
        dataIndex: 'packageName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.original', defaultMessage: '原始版本' }),
        dataIndex: 'oldVersion',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'upgradeManage.upgraVersion', defaultMessage: '升级版本' }),
        dataIndex: 'newVersion',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.currentVersion', defaultMessage: '当前版本' }),
        dataIndex: 'nowVersion',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },

      {
        title: formatMessage({ id: 'upgradeManage.issuingTime', defaultMessage: '下发时间' }),
        dataIndex: 'createTime',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },

      {
        title: formatMessage({ id: 'upgradeManage.upgradeTime', defaultMessage: '升级时间' }),
        dataIndex: 'upgradeTime',
        valueType: 'dateRange',
        width: 150,
        render: (_, record: any) => record.upgradeTime,
        search: {
          transform: (value: any) => {
            return {
              startTime: value[0],
              endTime: value[1],
            };
          },
        },
      },

      {
        title: formatMessage({ id: 'upgradeManage.1000', defaultMessage: '升级进度' }),
        dataIndex: 'progress',
        width: 100,
        ellipsis: true,
        hideInSearch: true,
      },

      {
        title: formatMessage({
          id: 'upgradeManage.upgradeTakeTime',
          defaultMessage: '升级耗时(s)',
        }),
        dataIndex: 'upgradeTimeconsumption',
        width: 100,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'upgradeManage.upgradeStatus', defaultMessage: '升级状态' }),
        dataIndex: 'status',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, record) => {
          if (record.status && [2, 3].includes(record.status)) {
            setUpgradeStatus(record.status);
            return (
              <a onClick={() => statusClick(record)}>
                {record.status == 3 ? (
                  <FormattedMessage id="common.upgradeTimeout" defaultMessage="升级超时" />
                ) : (
                  <FormattedMessage id="upgradeManage.upgradeFailed" defaultMessage="升级失败" />
                )}
              </a>
            );
          } else if (record.status == 1) {
            return (
              <span>
                <FormattedMessage id="upgradeManage.upgradeSuc" defaultMessage="升级成功" />
              </span>
            );
          } else if (record.status == 0) {
            return (
              <span>
                <FormattedMessage id="upgradeManage.upgrading" defaultMessage="升级中" />
              </span>
            );
          } else {
            return (
              <span>
                <FormattedMessage id="common.unknown" defaultMessage="未知" />
              </span>
            );
          }
        },
      },
      {
        title: formatMessage({ id: 'upgradeManage.upgradePer', defaultMessage: '升级人' }),
        dataIndex: 'upgraderName',
        hideInSearch: true,
        width: 100,
        ellipsis: true,
      },
    ];
  }, [siteColumn, productTypeColumn]);
  return (
    <>
      <YTProTable<RemoteUpgradeDataRes, RemoteUpgradeDataRes>
        columns={columnsNew}
        toolBarRenderOptions={{
          add: {
            show: false,
          },
        }}
        request={requestList}
      />
      <Modal
        title={
          upgradeStatus == 3 ? (
            <FormattedMessage id="upgradeManage.upgradeTimeout" defaultMessage="升级超时" />
          ) : (
            <FormattedMessage id="common.upgradeFailed" defaultMessage="升级失败" />
          )
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          {upgradeStatus == 3 ? (
            <FormattedMessage id="upgradeManage.timeoutReason" defaultMessage="超时原因:" />
          ) : (
            <FormattedMessage id="upgradeManage.failReason" defaultMessage="失败原因:" />
          )}
          {failReason}
        </p>
      </Modal>
    </>
  );
};

export default Log;
