/* eslint-disable react/no-unknown-property */
import { message, Switch, Modal, Button, Typography } from 'antd';
import { FormOperations } from '@/components/YTModalForm/typing';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { useBoolean, useToggle } from 'ahooks';
import React, { useMemo } from 'react';
import { useState, useCallback } from 'react';
import { useRequest } from 'umi';
import YTDivider from '../Divider';
import type { FormReadBaseProps } from '../FormRead/type';
import type { FormUpdateBaseProps } from '../FormUpdate/type';
import type { FormTableListBaseProps } from './type';
import { formatMessage } from '@/utils';
import type { YTProColumns } from '@/components/YTProTable/typing';
import { useAuthority } from '@/hooks';
import { merge } from 'lodash';
import { distributeElectricityPrice, updateIncomeByRuleIdAndType } from '@/services/station';

const enum TabKeys {
  MARKET = '1',
  PHOTOVOLTAIC = '2',
  ESS = '3',
  CHARGING = '4',
}
const FormTableList = <DataType extends Record<string, any>>(
  props: FormTableListBaseProps<DataType>,
) => {
  const {
    onChangeStatus,
    onDeleteChange,
    actionRef,
    columns,
    formUpdateChild,
    formReadChild,
    requestDefaultPrice,
    setType,
    priceType,
    inDevice,
    siteId,
    ...restProps
  } = props;

  const [state, { toggle, set }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<DataType>({} as DataType);
  const [hasTableData, { set: setHasTableData }] = useBoolean(false);
  const [isDistributed, { set: setIsDistributed }] = useBoolean(false);
  const { data: defaultPrice } = useRequest(() => {
    return requestDefaultPrice?.({ siteId, type: setType });
  });

  const { authorityMap } = useAuthority([
    'oss:site:mains:setStatus',
    'oss:site:internet:setStatus',
    'oss:site:charge:setStatus',
    'oss:site:discharge:setStatus',

    'oss:site:mains:add',
    'oss:site:internet:add',
    'oss:site:charge:add',
    'oss:site:discharge:add',

    'oss:site:mains:update',
    'oss:site:internet:update',
    'oss:site:charge:update',
    'oss:site:discharge:update',

    'oss:site:mains:delete',
    'oss:site:internet:delete',
    'oss:site:charge:delete',
    'oss:site:discharge:delete',

    'oss:site:mains:refresh',
    'oss:site:internet:refresh',
    'oss:site:charge:refresh',
    'oss:site:discharge:refresh',
  ]);

  const hasAuthority = useCallback(() => {
    if (priceType == TabKeys.MARKET) {
      //市电电价设置
      return {
        setStatus: authorityMap.get('oss:site:mains:setStatus'),
        add: authorityMap.get('oss:site:mains:add'),
        update: authorityMap.get('oss:site:mains:update'),
        delete: authorityMap.get('oss:site:mains:delete'),
        refresh: authorityMap.get('oss:site:mains:refresh'),
      };
    } else if (priceType == TabKeys.PHOTOVOLTAIC) {
      //馈网电价设置
      return {
        setStatus: authorityMap.get('oss:site:internet:setStatus'),
        add: authorityMap.get('oss:site:internet:add'),
        update: authorityMap.get('oss:site:internet:update'),
        delete: authorityMap.get('oss:site:internet:delete'),
        refresh: authorityMap.get('oss:site:internet:refresh'),
      };
    } else if (priceType == TabKeys.ESS) {
      //储能放电电价设置
      return {
        setStatus: authorityMap.get('oss:site:discharge:setStatus'),
        add: authorityMap.get('oss:site:discharge:add'),
        update: authorityMap.get('oss:site:discharge:update'),
        delete: authorityMap.get('oss:site:discharge:delete'),
        refresh: authorityMap.get('oss:site:discharge:refresh'),
      };
    } else if (priceType == TabKeys.CHARGING) {
      //充电桩计费设置
      return {
        setStatus: authorityMap.get('oss:site:charge:setStatus'),
        add: authorityMap.get('oss:site:charge:add'),
        update: authorityMap.get('oss:site:charge:update'),
        delete: authorityMap.get('oss:site:charge:delete'),
        refresh: authorityMap.get('oss:site:charge:refresh'),
      };
    } else {
      return {
        setStatus: true,
        add: false,
        update: false,
        delete: false,
        refresh: false,
      };
    }
  }, [authorityMap, priceType]);

  const onDistributeClick = useCallback(() => {
    Modal.confirm({
      title: formatMessage({
        id: 'siteManage.1031',
        defaultMessage: '确定要下发吗',
      }),
      okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
      cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
      onOk: () => {
        return distributeElectricityPrice({});
      },
    });
  }, []);

  const customConfig: YTProTableCustomProps<DataType, any> = {
    ...(inDevice
      ? {
          toolBarRender: () => [
            hasTableData && (
              <>
                <Button type="primary" key="distribute" onClick={onDistributeClick}>
                  {formatMessage({ id: 'siteManage.1029', defaultMessage: '下发' })}
                </Button>
                <Typography.Text type="secondary">
                  {isDistributed
                    ? formatMessage({ id: 'siteManage.1030', defaultMessage: '已下发' })
                    : formatMessage({ id: 'siteManage.1032', defaultMessage: '未下发' })}
                </Typography.Text>
              </>
            ),
          ],
        }
      : {
          toolBarRenderOptions: {
            add: {
              onClick() {
                setInitialValues({} as DataType);
                setOperations(FormOperations.CREATE);
                set(true);
              },
              show: hasAuthority().add && !inDevice,
              text: formatMessage({ id: 'common.newBuilt', defaultMessage: '新建' }),
            },
          },
        }),
    // option: {
    //   ...(hasAuthority().update && !inDevice
    //     ? {
    //         onEditChange(_, entity) {
    //           setInitialValues({ ...entity });
    //           setOperations(FormOperations.UPDATE);
    //           set(true);
    //         },
    //       }
    //     : {}),
    //   modalDeleteText: formatMessage({
    //     id: 'siteManage.set.delTariffRule',
    //     defaultMessage: '您确认要删除该电价规则吗？删除之后无法恢复！',
    //   }),
    // },
  };
  const visibleUpdated = operations !== FormOperations.READ;
  const visibleRead = !visibleUpdated;

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, [actionRef]);

  const FormUpdate =
    formUpdateChild &&
    React.createElement<FormUpdateBaseProps>(
      formUpdateChild,
      {
        operations: operations,
        visible: visibleUpdated && state,
        onVisibleChange: set,
        onSuccess: onSuccess,
        id: initialValues?.id,
        setType,
      },
      null,
    );

  const FormRead =
    formReadChild &&
    React.createElement<FormReadBaseProps>(
      formReadChild,
      {
        operations: operations,
        visible: visibleRead && state,
        onVisibleChange: set,
        id: initialValues?.id,
        setType,
      },
      null,
    );

  const tableColumns = useMemo(() => {
    const result: YTProColumns<DataType, any>[] = merge([], columns);
    if (inDevice) {
      result[result.length - 1].hideInTable = true;
      result[result.length - 2].hideInTable = true;
    }
    return result;
  }, [inDevice, columns]);

  const onDelete = (rowData: any) => {
    Modal.confirm({
      title: formatMessage({ id: 'common.delete', defaultMessage: '删除' }),
      content: formatMessage({
        id: 'siteManage.set.delTariffRule',
        defaultMessage: '您确认要删除该电价规则吗？删除之后无法恢复！',
      }),
      okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
      cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
      onOk: async () => {
        onDeleteChange?.({ id: rowData?.id })?.then?.(({ data }) => {
          if (data) {
            message.success(formatMessage({ id: 'common.del', defaultMessage: '删除成功' }));
            actionRef?.current?.reload?.();
          }
        });
      },
    });
  };
  const onDetail = (rowData: any) => {
    setInitialValues({ ...rowData });
    setOperations(FormOperations.READ);
    set(true);
  };

  const onEdit = (rowData: any) => {
    setInitialValues({ ...rowData });
    setOperations(FormOperations.UPDATE);
    set(true);
  };

  const onRefresh = (rowData: any) => {
    Modal.confirm({
      title: formatMessage({ id: 'siteManage.1033', defaultMessage: '收益刷新' }),
      content: formatMessage({
        id: 'siteManage.1034',
        defaultMessage: '是否确定刷新，确定后会对规则生效期间内的收益和整体收益进行刷新！',
      }),
      okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
      cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
      onOk: async () => {
        return updateIncomeByRuleIdAndType?.({
          id: rowData?.id,
          type: Number(priceType) - 1,
        })?.then?.(({ data }) => {
          if (data) {
            message.success(
              formatMessage({ id: 'common.refreshSuccess', defaultMessage: '刷新成功' }),
            ),
              actionRef?.current?.reload?.();
          }
        });
      },
    });
  };

  const currentColums: YTProColumns<DataType, any>[] = useMemo(() => {
    return [
      ...tableColumns,
      {
        title: formatMessage({ id: 'common.currentState', defaultMessage: '当前状态' }),
        dataIndex: 'status',
        hideInSearch: true,
        hideInTable: inDevice,
        render: (_, record) => {
          const rowData = record as any;
          return [
            <Switch
              disabled={!hasAuthority().setStatus}
              checked={rowData.status == 1} //0--未生效 1-生效
              checkedChildren={formatMessage({
                id: 'common.effect',
                defaultMessage: '生效',
              })}
              unCheckedChildren={formatMessage({
                id: 'common.ineffect',
                defaultMessage: '未生效',
              })}
              key="Checke"
              onClick={async () => {
                Modal.confirm({
                  title: formatMessage({
                    id: 'siteManage.siteList.changeStatus',
                    defaultMessage: '更改状态',
                  }),
                  content: ` ${formatMessage({
                    id: 'siteManage.siteList.changeStatus',
                    defaultMessage: '更改状态',
                  })}：${
                    rowData.status
                      ? formatMessage({
                          id: 'common.ineffect',
                          defaultMessage: '未生效',
                        })
                      : formatMessage({
                          id: 'common.effect',
                          defaultMessage: '生效',
                        })
                  }?`,
                  okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
                  cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
                  onOk: async () => {
                    const success = await onChangeStatus({ id: rowData.id, type: priceType });
                    if (success) {
                      if (actionRef?.current) {
                        actionRef?.current?.reload();
                      }
                    }
                  },
                });
              }}
            />,
          ];
        },
      },
      {
        title: formatMessage({ id: 'common.operate', defaultMessage: '操作' }),
        valueType: 'option',
        width: 250,
        render: (_, record) => {
          const rowData = record as any;
          return (
            <>
              {hasAuthority().refresh && rowData.status ? (
                <Button type="link" size="small" key="refresh" onClick={() => onRefresh(rowData)}>
                  {formatMessage({ id: 'siteManage.1033', defaultMessage: '收益刷新' })}
                </Button>
              ) : (
                <></>
              )}
              <Button type="link" size="small" key="detail" onClick={() => onDetail(rowData)}>
                {formatMessage({ id: 'common.detail', defaultMessage: '查看详情' })}
              </Button>

              {hasAuthority().delete && !inDevice ? (
                <Button type="link" size="small" key="delete" onClick={() => onDelete(rowData)}>
                  {formatMessage({ id: 'common.delete', defaultMessage: '删除' })}
                </Button>
              ) : (
                <></>
              )}
              {hasAuthority().update && !inDevice ? (
                <Button type="link" size="small" key="edit" onClick={() => onEdit(rowData)}>
                  {formatMessage({ id: 'common.edit', defaultMessage: '编辑' })}
                </Button>
              ) : (
                <></>
              )}
            </>
          );
        },
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ];
  }, [actionRef, hasAuthority, tableColumns]);

  const onDataSourceChange = useCallback((data) => {
    setHasTableData(!!data?.length);
  }, []);

  return (
    <>
      <YTDivider />
      <YTProTable<DataType, any>
        actionRef={actionRef}
        columns={currentColums}
        search={inDevice ? false : {}}
        {...customConfig}
        {...restProps}
        headerTitle={
          defaultPrice &&
          `${formatMessage({
            id: 'siteManage.set.defaultPrice',
            defaultMessage: '默认电价',
          })}：${
            setType == '1'
              ? formatMessage({
                  id: 'siteManage.1028',
                  defaultMessage: '按照市电电价进行计算',
                })
              : defaultPrice
          }`
        }
        params={{ siteId, type: setType, ...(inDevice ? { status: 1 } : {}) }}
        onDataSourceChange={onDataSourceChange}
      />
      {FormUpdate}
      {FormRead}
    </>
  );
};

export default FormTableList;
