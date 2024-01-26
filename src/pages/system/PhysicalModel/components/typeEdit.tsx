import React, { useEffect, useState } from 'react';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Form, Modal, Row, Col, message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { DataNode } from 'antd/lib/tree';
import type { MenuType } from '../config';
import YTProTable from '@/components/YTProTable';
import { fieldColumns } from '../config';
import { getTypePage } from '../service';

export type MenuFormValueType = Record<string, unknown> & Partial<MenuType>;
export type MenuFormProps = {
  onCancel: (flag?: boolean, formVals?: MenuFormValueType) => void;
  onSubmit: (values: MenuFormValueType) => Promise<void>;
  visible: boolean;
  values: any;
  visibleOptions: any;
  statusOptions: any;
  menuTree: DataNode[];
  type: string;
  existItem: any[];
};

const TypeEdit: React.FC<MenuFormProps> = (props) => {
  const { type, existItem } = props;
  const [form] = Form.useForm();
  const oldId = props.values?.id;
  const isEdit = Boolean(oldId);
  const [dataSource, setDataSource] = useState<any>([]);

  const handleSearch = async (params: object) => {
    const { data, code } = await getTypePage({ ...params, type });
    if (code == '200') {
      setDataSource([]);
      setDataSource(() =>
        data.map((item: any) => {
          item.json = JSON.stringify(item.json);
          return item;
        }),
      );
    }
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
  const handleFinish = async (value: Record<string, any>) => {
    const formData = value as MenuFormValueType;
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
      <Form form={form} onFinish={handleFinish} initialValues={props.values} layout="vertical">
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
              dataSource={dataSource}
              pagination={false}
              toolBarRender={() => []}
              rowSelection={{
                type: 'radio', // 设置选择类型为单选
                onChange: (_, selectedRows: any) => {
                  form.setFieldsValue({
                    json: selectedRows[0]?.json || '',
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
