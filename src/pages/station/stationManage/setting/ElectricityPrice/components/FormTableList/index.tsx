/* eslint-disable react/no-unknown-property */
import { message, Switch, Modal } from 'antd';
import { FormOperations } from '@/components/YTModalForm/typing';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { useToggle } from 'ahooks';
import React from 'react';
import { useState, useCallback } from 'react';
import { useModel, useRequest } from 'umi';
import YTDivider from '../Divider';
import type { FormReadBaseProps } from '../FormRead/type';
import type { FormUpdateBaseProps } from '../FormUpdate/type';
import type { FormTableListBaseProps } from './type';
import { formatMessage } from '@/utils';
import type { YTProColumns } from '@/components/YTProTable/typing';

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
    ...restProps
  } = props;

  const [state, { toggle, set }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<DataType>({} as DataType);
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id }));
  const { data: defaultPrice } = useRequest(() => {
    return requestDefaultPrice?.({ siteId });
  });

  const customConfig: YTProTableCustomProps<DataType, any> = {
    toolBarRenderOptions: {
      add: {
        onClick() {
          setInitialValues({} as DataType);
          setOperations(FormOperations.CREATE);
          set(true);
        },
        text: formatMessage({ id: 'common.newBuilt', defaultMessage: '新建' }),
      },
    },
    option: {
      onDeleteChange(_, entity) {
        onDeleteChange?.({ id: entity?.id })?.then?.(({ data }) => {
          if (data) {
            message.success(formatMessage({ id: 'common.del', defaultMessage: '删除成功' }));
            actionRef?.current?.reload?.();
          }
        });
      },
      onDetailChange(_, entity) {
        setInitialValues({ ...entity });
        setOperations(FormOperations.READ);
        set(true);
      },
      onEditChange(_, entity) {
        setInitialValues({ ...entity });
        setOperations(FormOperations.UPDATE);
        set(true);
      },
      modalDeleteText: formatMessage({
        id: 'siteManage.set.delTariffRule',
        defaultMessage: '您确认要删除该电价规则吗？删除之后无法恢复！',
      }),
    },
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
  const currentColums: YTProColumns<DataType, any>[] = [
    ...(columns as any),
    {
      title: formatMessage({ id: 'common.currentState', defaultMessage: '当前状态' }),
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record) => {
        const rowData = record as any;
        return [
          <Switch
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
                  rowData.status == 1 ? (rowData.status = 0) : (rowData.status = 1);
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
  ];

  return (
    <>
      <YTDivider />
      <YTProTable<DataType, any>
        actionRef={actionRef}
        columns={currentColums}
        {...customConfig}
        {...restProps}
        headerTitle={
          defaultPrice &&
          `${formatMessage({
            id: 'siteManage.set.defaultPrice',
            defaultMessage: '默认电价',
          })}：${defaultPrice}`
        }
        params={{ siteId, type: setType }}
      />
      {FormUpdate}
      {FormRead}
    </>
  );
};

export default FormTableList;
