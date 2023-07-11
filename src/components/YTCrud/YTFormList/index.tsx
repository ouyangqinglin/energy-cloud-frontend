import { useCallback, useRef, useState } from 'react';
import YTProTable from '@/components/YTProTable';
import type {
  YTProColumns,
  YTProTableCustomProps,
  YTProTableProps,
} from '@/components/YTProTable/typing';
import { YTFormUpdate } from '../YTFormUpdate';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import { message } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import type { FormUpdateProps } from '../YTFormUpdate';

export type FormListProps<
  FormListItemType,
  FormListParamsType,
  FormUpdateType,
  FormUpdateParamsType,
> = {
  formListField: {
    requestList: YTProTableCustomProps<FormListItemType, FormListItemType>['request'];
    requestDelete: (entity: FormListItemType) => any;
    buttonText: string;
    modalDeleteText: string;
    rowKey?: string;
    columns: YTProColumns<FormListItemType, FormListParamsType>[];
    YTProTableProps?: YTProTableProps<FormListItemType, FormListParamsType>;
  };
  formUpdateField: FormUpdateProps<FormUpdateType, FormUpdateParamsType>;
};

export const YTFormList = <
  FormListItemType extends Record<string, any> = any,
  FormListParamsType extends Record<string, any> = any,
  UD extends Record<string, any> = any,
  UP extends Record<string, any> = any,
>(
  props: FormListProps<FormListItemType, FormListParamsType, UD, UP>,
) => {
  const {
    formListField: {
      requestList,
      requestDelete,
      buttonText,
      modalDeleteText,
      rowKey = 'id',
      columns,
      YTProTableProps,
    },
    formUpdateField,
  } = props;
  const [state, { set }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  // const [initialValues, setInitialValues] = useState<FormListItemType>({} as FormListItemType);
  const actionRef = useRef<ActionType>(null);

  const customConfig: YTProTableCustomProps<FormListItemType, any> = {
    toolBarRenderOptions: {
      add: {
        onClick() {
          // setInitialValues({} as FormListItemType);
          setOperations(FormOperations.CREATE);
          set(true);
        },
        text: buttonText,
      },
    },
    option: {
      onDeleteChange(_, entity) {
        requestDelete(entity)?.then?.(({ code, data }) => {
          if (code === 200 || data) {
            message.success('删除成功');
            actionRef?.current?.reload?.();
          }
        });
      },
      onEditChange(_, entity) {
        // setInitialValues({ ...entity });
        setOperations(FormOperations.UPDATE);
        set(true);
      },
      modalDeleteText: `您确认要删除该${modalDeleteText}吗？删除之后无法恢复！`,
    },
  };
  const visibleUpdated = operations !== FormOperations.READ;

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, [actionRef]);

  return (
    <>
      <YTProTable<FormListItemType, FormListParamsType>
        columns={columns}
        actionRef={actionRef}
        request={requestList}
        rowKey={rowKey}
        {...customConfig}
        {...YTProTableProps}
      />
      <YTFormUpdate
        {...{
          operations: operations,
          visible: visibleUpdated && state,
          onVisibleChange: set,
          onSuccess: onSuccess,
          ...formUpdateField,
        }}
      />
    </>
  );
};
