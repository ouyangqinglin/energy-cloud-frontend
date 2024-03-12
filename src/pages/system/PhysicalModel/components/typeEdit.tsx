import React, { useEffect, useState, useRef } from 'react';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Form, Modal, Row, Col, message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { FieldFormType, FieldType } from '../data';
import YTProTable from '@/components/YTProTable';
import type { ActionType } from '@ant-design/pro-components';
import { fieldColumns } from '../config';
import { getTypePage } from '../service';

export type TypeEditProps = {
  onCancel: () => void;
  onSubmit: (values: FieldFormType) => Promise<void>;
  visible: boolean;
  values: Partial<FieldFormType>;
  type: string;
  existItem: string[];
};

const TypeEdit: React.FC<TypeEditProps> = (props) => {
  const { type, existItem, values } = props;
  const [form] = Form.useForm();
  const oldId = values?.id;
  const isEdit = Boolean(oldId);
  const [dataSource, setDataSource] = useState<FieldType[]>([]);
  const actionRef = useRef<ActionType>();

  const handleSearch = async (params: Partial<FieldType>) => {
    const { data, code } = await getTypePage({ ...params, type });
    if (code == '200') setDataSource(data);
  };
  useEffect(() => {
    form.resetFields();
  }, [form, props]);

  const intl = useIntl();
  const handleOk = () => {
    const id = form.getFieldValue('id');
    if (!isEdit && existItem.includes(id)) {
      message.success('key重复！');
      return;
    }
    form.submit();
    setDataSource(() => []);
  };
  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
    setDataSource(() => []);
  };
  const handleFinish = async (value: FieldFormType) => {
    const formData = value;
    if (isEdit) formData.oldId = oldId;
    props.onSubmit(formData);
  };
  const handleInputChange = () => {
    const { name, id, json } = form.getFieldsValue();
    if (json) {
      form.setFieldsValue({
        json: JSON.stringify({ ...JSON.parse(json), name, id }),
      });
    } else {
      form.setFieldsValue({
        json: JSON.stringify({ name, id }),
      });
    }
  };

  return (
    <Modal
      width={1000}
      title={intl.formatMessage({
        id: 'physicalModel.fieldEdit',
        defaultMessage: `${isEdit ? '编辑' : '新增'}字段`,
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} initialValues={values} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="name"
              label={intl.formatMessage({
                id: 'physicalModel.fieldName',
                defaultMessage: '字段名称',
              })}
              width="xl"
              onChange={handleInputChange}
              placeholder="请输入字段名称"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入字段名称！" defaultMessage="请输入字段名称！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="id"
              label={intl.formatMessage({
                id: 'physicalModel.fieldKey',
                defaultMessage: '字段key',
              })}
              onChange={handleInputChange}
              width="xl"
              placeholder="请输入字段key"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入字段key！" defaultMessage="请输入字段key！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ProFormTextArea
              name="json"
              label={intl.formatMessage({
                id: 'physicalModel.fieldConfig',
                defaultMessage: '配置',
              })}
              width="xl"
              placeholder="请输入配置"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入配置！" defaultMessage="请输入配置！" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <YTProTable
              columns={fieldColumns}
              onSubmit={handleSearch}
              rowKey={(record) => `${record.sourceName}-${record.name}-${record.id}-${record.type}`}
              actionRef={actionRef}
              dataSource={dataSource}
              pagination={false}
              toolBarRender={() => []}
              rowSelection={{
                type: 'radio', // 设置选择类型为单选
                onChange: (_, selectedRows: any) => {
                  form.setFieldsValue({
                    json: JSON.stringify(selectedRows[0]?.json || ''),
                    id: selectedRows[0]?.id || '',
                    name: selectedRows[0]?.name || '',
                  });
                },
              }}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default TypeEdit;
