import { useEffect, useCallback } from 'react';
import { Form, message } from 'antd';
import YTModalForm from '@/components/YTModalForm';
import { FormOperations } from '@/components/YTModalForm/typing';
import type { FormUpdateBaseProps, FormUpdateProps } from './type';

const DEFAULT_PROPS = {
  layout: 'vertical' as 'vertical',
  labelCol: { flex: 'auto' },
  wrapperCol: { flex: 'auto' },
};

export const FormUpdate = <FormData = any, Param = Record<string, any>>(
  props: FormUpdateProps<FormData, Param>,
) => {
  const {
    operations,
    titleCreate,
    titleUpdate,
    onFinishUpdate,
    onFinishCreate,
    columns,
    request,
    id,
    onSuccess,
    ...resetProps
  } = props;
  const isCreate = operations === FormOperations.CREATE;
  const title = isCreate ? titleCreate : titleUpdate;
  const [form] = Form.useForm();

  const onFinish = useCallback(
    (formData) => {
      const run = isCreate ? onFinishCreate : onFinishUpdate;
      return run({ ...formData, ...{ userId: id } }, {}).then(({ data }) => {
        if (data) {
          message.success('保存成功');
          onSuccess?.();
          return true;
        }
      });
    },
    [id, isCreate, onFinishCreate, onFinishUpdate, onSuccess],
  );

  useEffect(() => {
    if (props.visible) {
      form?.resetFields();
      if (id) {
        request({ userId: id }, {}).then(({ data }) => {
          form?.setFieldsValue(data);
        });
      }
    }
  }, [props.visible, form, id, request]);

  return (
    <YTModalForm<FormData>
      form={form}
      title={title}
      {...DEFAULT_PROPS}
      layoutType={'ModalForm'}
      columns={columns}
      operations={operations}
      onFinish={onFinish}
      {...resetProps}
    />
  );
};
