import type { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';
import { BetaSchemaForm, ProFormInstance } from '@ant-design/pro-form';
import { defaults, get, omit, unset } from 'lodash';
import type { SchemaModalFormChildProps } from './typing';
import { FormOperations } from './typing';
import { normalizeRequestOption } from '../YTProTable/helper';
import type { YTProColumns } from '../YTProTable/typing';
import { useEffect, useRef } from 'react';

const DEFAULT_PROPS = {
  title: '新增',
  width: 950,
  rowProps: {
    gutter: [16, 16],
  },
  colProps: {
    span: 8,
  },
  layout: 'horizontal',
  labelCol: { flex: '0 0 90px' },
  wrapperCol: { flex: '1 1 auto' },
  labelAlign: 'left',
  grid: true,
} as FormSchema<Record<string, any>>;

const isRead = (operations: FormOperations) => operations === FormOperations.READ;
const isCreate = (operations: FormOperations) => operations === FormOperations.CREATE;

const SchemaModalFormChild = <T, ValueType = 'text'>(
  props: SchemaModalFormChildProps<T, ValueType>,
) => {
  let mergeProps = { ...props };
  defaults(mergeProps, DEFAULT_PROPS);

  const { operations } = mergeProps;

  // 只读
  const readonly = isRead(operations) ? true : false;
  if (readonly) {
    mergeProps.columns = mergeProps.columns.map((c) => {
      const columnWithoutRules = { ...c };
      const rules = get(columnWithoutRules, 'formItemProps.rules');
      if (rules) {
        unset(columnWithoutRules, 'formItemProps.rules');
      }
      return columnWithoutRules;
    });
  }

  // 新增
  if (isCreate(operations)) {
    mergeProps = omit(mergeProps, ['request']);
  }

  const { columns, visible, onVisibleChange, initialValues, ...restProps } = mergeProps;
  // TODO: 支持选项式的请求
  const customColumns = normalizeRequestOption<T, ValueType>(columns as YTProColumns<T, ValueType>);

  // 重置表单
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    formRef?.current?.setFieldsValue?.(initialValues);
  }, [formRef, initialValues]);

  return (
    <BetaSchemaForm<T, ValueType>
      key={operations}
      visible={visible}
      formRef={formRef}
      onVisibleChange={onVisibleChange}
      readonly={readonly}
      columns={customColumns}
      initialValues={initialValues}
      {...restProps}
    />
  );
};
export default SchemaModalFormChild;
