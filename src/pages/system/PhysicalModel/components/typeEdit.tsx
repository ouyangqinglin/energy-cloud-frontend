import React, { useEffect, useRef } from 'react';
import { ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import { Form, Modal, Row, Col, message, Button } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { FieldFormType, FieldType } from '../data';
import YTProTable from '@/components/YTProTable';
import type { ActionType } from '@ant-design/pro-components';
import { fieldColumns, alarmLevelOptions, eventsDefaultJson } from '../config';
import { getTypePage } from '../service';
import { formatMessage } from '@/utils';

export type TypeEditProps = {
  onCancel: () => void;
  onSubmit: (values: FieldFormType) => Promise<void>;
  visible: boolean;
  values: Partial<FieldFormType>;
  modelType: string;
  existItem: string[];
};

const TypeEdit: React.FC<TypeEditProps> = (props) => {
  const { modelType = 'property', existItem, values } = props;
  const [form] = Form.useForm();
  const oldId = values?.id;
  const isEdit = Boolean(oldId);
  const actionRef = useRef<ActionType>();

  const handleSearch = async (params: Partial<FieldType>) => {
    return getTypePage({ ...params, type: modelType }).then((res) => {
      return {
        data: {
          list: res.data,
          total: res.data.length,
        },
      };
    });
  };
  const clearJson = () => {
    form.resetFields();
  };
  const resetJson = () => {
    if (isEdit) {
      form.setFieldsValue(values);
    } else {
      clearJson();
      if (modelType == 'event') {
        form.setFieldValue('json', JSON.stringify(eventsDefaultJson));
      }
    }
  };
  useEffect(() => {
    resetJson();
  }, [form, props]);

  const intl = useIntl();
  const handleOk = () => {
    const id = form.getFieldValue('id');
    if (!isEdit && existItem.includes(id)) {
      message.success('key重复！');
      return;
    }
    form.submit();
  };
  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };
  const handleFinish = async (value: FieldFormType) => {
    const formData = value;
    if (isEdit) formData.oldId = oldId;
    props.onSubmit(formData);
  };
  const handleInputChange = () => {
    const { name, id, json, type } = form.getFieldsValue();
    if (json) {
      try {
        form.setFieldsValue({
          json: JSON.stringify({ ...JSON.parse(json), name, id, type }),
        });
      } catch {}
    } else {
      form.setFieldsValue({
        json: JSON.stringify({ name, id, type }),
      });
    }
  };
  const handleJsonChange = () => {
    try {
      const json = JSON.parse(form.getFieldValue('json'));
      form.setFieldsValue({
        name: json.name,
        id: json.id,
      });
    } catch {}
  };

  const customValidator = (_rule: any, value: string) => {
    try {
      JSON.parse(value);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject('json格式错误!');
    }
  };

  return (
    <Modal
      maskClosable={false}
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
      <Form form={form} onFinish={handleFinish} layout="vertical">
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
          {modelType == 'event' ? (
            <Col span={12} order={2}>
              <ProFormSelect
                options={alarmLevelOptions}
                onChange={handleInputChange}
                width="xl"
                name="type"
                label={formatMessage({
                  id: 'physicalModel.alarmLevel',
                  defaultMessage: '告警等级',
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
            </Col>
          ) : (
            ''
          )}
        </Row>
        <Row gutter={[16, 16]} align="middle">
          <Col span={14}>
            <ProFormTextArea
              name="json"
              label={intl.formatMessage({
                id: 'physicalModel.fieldConfig',
                defaultMessage: '配置',
              })}
              onChange={handleJsonChange}
              width="xl"
              placeholder="请输入配置"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请输入配置！" defaultMessage="请输入配置！" />,
                },
                { validator: customValidator },
              ]}
            />
          </Col>
          <Col offset={1} span={6}>
            <Button className="mr16" key="add" onClick={resetJson}>
              {formatMessage({ id: 'common.reset', defaultMessage: '重置' })}
            </Button>
            <Button type="primary" key="add" onClick={clearJson}>
              {formatMessage({ id: 'common.clear', defaultMessage: '清空' })}
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <YTProTable
              columns={fieldColumns}
              rowKey={(record) => `${record.sourceName}-${record.name}-${record.id}-${record.type}`}
              actionRef={actionRef}
              request={handleSearch}
              pagination={false}
              toolBarRender={() => []}
              rowSelection={{
                type: 'radio', // 设置选择类型为单选
                onChange: (_, selectedRows: any) => {
                  if (selectedRows.length) {
                    form.setFieldsValue({
                      json: JSON.stringify(selectedRows[0]?.json || ''),
                      id: selectedRows[0]?.id || '',
                      name: selectedRows[0]?.name || '',
                    });
                  } else {
                    resetJson();
                  }
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
