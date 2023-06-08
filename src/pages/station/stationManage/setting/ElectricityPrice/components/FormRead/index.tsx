import YTModalForm from '@/components/YTModalForm';
import type { FormReadModalProps } from './type';

const DEFAULT_PROPS = {
  layout: 'horizontal' as 'horizontal',
  labelCol: { flex: '0 0 100px' },
  wrapperCol: { flex: 'auto' },
};

export const FormRead = <FormData = any, Param = Record<string, any>>({
  request,
  columns,
  title,
  ...restProps
}: FormReadModalProps<FormData, Param>) => {
  return (
    <YTModalForm<FormData, Param>
      title={title}
      {...DEFAULT_PROPS}
      colProps={{
        span: 24,
      }}
      layoutType={'ModalForm'}
      columns={columns}
      request={request}
      {...restProps}
    />
  );
};
