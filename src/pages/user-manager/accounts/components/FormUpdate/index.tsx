import { useEffect, useCallback } from 'react';
import { Form, message } from 'antd';
import YTModalForm from '@/components/YTModalForm';
import { FormOperations } from '@/components/YTModalForm/typing';
import type { FormUpdateBaseProps, FormUpdateProps } from './type';
import { formatMessage } from '@/utils';

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
          message.success(formatMessage({ id: 'common.successSaved', defaultMessage: '保存成功' }));
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
      width={680}
      form={form}
      title={title}
      grid={true}
      colProps={{
        span: 12,
      }}
      {...DEFAULT_PROPS}
      layoutType={'ModalForm'}
      columns={columns}
      operations={operations}
      onFinish={onFinish}
      {...resetProps}
    />
  );
};
