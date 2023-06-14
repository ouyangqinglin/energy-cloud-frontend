import { useEffect } from 'react';
import { Form } from 'antd';
import YTModalForm from '@/components/YTModalForm';
import type { FormReadProps } from './type';

const DEFAULT_PROPS = {
  layout: 'horizontal' as 'horizontal',
  labelCol: { flex: '0 0 100px' },
  wrapperCol: { flex: 'auto' },
};

export const FormRead = <FormData = any, Param = Record<string, any>>({
  request,
  columns,
  title,
  id,
  ...restProps
}: FormReadProps<FormData, Param>) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (restProps.visible) {
      form?.resetFields();
      if (id) {
        request({ id }, {}).then((data) => {
          form.setFieldsValue(data);
        });
      }
    }
  }, [restProps.visible, form, id, request]);

  return (
    <YTModalForm<FormData, Param>
      form={form}
      title={title}
      {...DEFAULT_PROPS}
      colProps={{
        span: 24,
      }}
      layoutType={'ModalForm'}
      columns={columns}
      {...restProps}
    />
  );
};
