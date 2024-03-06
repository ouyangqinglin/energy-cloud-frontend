import { Modal, Form } from 'antd';
import { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import type { ConfigDataType } from '../data';
import { formatMessage } from '@/utils';
import { useEffect } from 'react';

export type DetailProps = {
  onCancel: () => void;
  visible: boolean;
  onSubmit: (values: ConfigDataType) => Promise<void>;
};
const AddForm: React.FC<DetailProps> = (props) => {
  const { visible, onCancel, onSubmit } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
  const handleCancel = () => {
    onCancel();
  };
  const handleFinish = async (value: Record<string, any>) => {
    onSubmit(value);
  };
  return (
    <Modal
      width={800}
      title={formatMessage({ id: 'pages.searchTable.new', defaultMessage: '新建' })}
      visible={visible}
      destroyOnClose
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <ProFormSelect
          options={[]}
          width="xl"
          name="model"
          label={formatMessage({
            id: 'device.model',
            defaultMessage: '型号',
          })}
          placeholder={formatMessage({
            id: 'common.pleaseSelect',
            defaultMessage: '请选择',
          })}
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'common.pleaseSelect',
                defaultMessage: '请选择',
              }),
            },
          ]}
        />
        <ProFormText
          name="ConfigName"
          label={formatMessage({
            id: 'device.ConfigName',
            defaultMessage: '名称',
          })}
          width="xl"
          placeholder={formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
            },
          ]}
        />
        <ProFormText
          name="serialNumber"
          label={formatMessage({
            id: 'device.serialNumber',
            defaultMessage: '序列号',
          })}
          width="xl"
          placeholder={formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
            },
          ]}
        />
      </Form>
    </Modal>
  );
};
export default AddForm;
