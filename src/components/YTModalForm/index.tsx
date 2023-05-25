import type { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';
import { defaults } from 'lodash';
import type { YTModalFormProps } from './typing';
import SchemaModalFormChild from './SchemaFormChild';
import ModalFormChild from './ModalFormChild';
import type { ModalFormProps } from '@ant-design/pro-form';

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
} as FormSchema & ModalFormProps;

const YTModalForm = <T, ValueType = 'text'>(props: YTModalFormProps<T, ValueType>) => {
  const mergeProps = { ...props };
  defaults(mergeProps, DEFAULT_PROPS);
  const isSchemaForm = mergeProps.layoutType === 'ModalForm';

  return isSchemaForm ? (
    <SchemaModalFormChild<T, ValueType> {...mergeProps} />
  ) : (
    <ModalFormChild<T> {...mergeProps} />
  );
};
export default YTModalForm;
