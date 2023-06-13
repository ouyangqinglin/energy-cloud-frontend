/* eslint-disable react/no-unknown-property */
import { FormOperations } from '@/components/YTModalForm/typing';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { useToggle } from 'ahooks';
import React from 'react';
import { useState } from 'react';
import YTDivider from '../Divider';
import type { FormReadBaseProps } from '../FormRead/type';
import type { FormUpdateBaseProps } from '../FormUpdate/type';
import type { FormTableListBaseProps } from './type';

const FormTableList = <DataType extends Record<string, any>>(
  props: FormTableListBaseProps<DataType>,
) => {
  const { actionRef, onDeleteChange, columns, formUpdateChild, formReadChild, ...restProps } =
    props;

  const [state, { toggle, set }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<DataType>({} as DataType);

  const customConfig: YTProTableCustomProps<DataType, any> = {
    toolbar: {
      onChange() {
        setInitialValues({} as DataType);
        setOperations(FormOperations.CREATE);
        set(true);
      },
      buttonText: '新建规则',
    },
    option: {
      onDeleteChange,
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
      modalDeleteText: '您确认要删除该电价规则吗？删除之后无法恢复！',
    },
  };
  const visibleUpdated = operations !== FormOperations.READ;
  const visibleRead = !visibleUpdated;

  const FormUpdate =
    formUpdateChild &&
    React.createElement<FormUpdateBaseProps>(
      formUpdateChild,
      {
        operations: operations,
        visible: visibleUpdated && state,
        onVisibleChange: set,
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
      },
      null,
    );

  return (
    <>
      <YTDivider />
      <YTProTable<DataType, any>
        actionRef={actionRef}
        columns={columns}
        {...customConfig}
        {...restProps}
      />
      {FormUpdate}
      {FormRead}
    </>
  );
};

export default FormTableList;
