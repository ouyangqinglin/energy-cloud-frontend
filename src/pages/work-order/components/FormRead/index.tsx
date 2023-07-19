import { useEffect } from 'react';
import { Form } from 'antd';
import YTModalForm from '@/components/YTModalForm';
import type { FormReadProps } from './type';

const DEFAULT_PROPS = {
  layout: 'vertical' as 'vertical',
  labelCol: { flex: 'auto' },
  wrapperCol: { flex: 'auto' },
};

export const FormRead = <FormData = any, Param = Record<string, any>>(
  props: FormReadProps<FormData, Param>,
) => {
  const { operations, titleRead, columns, request, id, keyForId, ...resetProps } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.visible) {
      form?.resetFields();
      if (id) {
        request({ [keyForId]: id }, {}).then(({ data }) => {
          form?.setFieldsValue(data);
        });
      }
    }
  }, [props.visible, form, id, request]);

  return (
    <YTModalForm<FormData, Param>
      form={form}
      title={titleRead}
      {...DEFAULT_PROPS}
      layoutType={'ModalForm'}
      columns={columns}
      operations={operations}
      {...resetProps}
    />
  );
};
