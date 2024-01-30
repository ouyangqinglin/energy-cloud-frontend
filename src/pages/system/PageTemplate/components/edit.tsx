import React, { useEffect, useRef, useState } from 'react';
import { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { PageTemplateType, ModeTreeDataNode } from '../data';
import { platformEnum, defaultData } from '../config';
import { getproduct, getproductDetail } from '../service';
import ConfigTree from './tree';
import { cloneDeep } from 'lodash';

export type MenuFormProps = {
  onCancel: () => void;
  onSubmit: (values: PageTemplateType) => Promise<void>;
  visible: boolean;
  values: Partial<PageTemplateType>;
  showType: string;
};

const handleConfigData = (data, parentId, parentType) => {
  return data.map((item) => {
    item.key = parentId + parentType + item.id + item.type;
    if (item.children && item.children.length > 0) {
      item.children = handleConfigData(item.children, item.id, item.type);
    }
    return item;
  });
};

const MenuForm: React.FC<MenuFormProps> = (props) => {
  const { showType, visible, values } = props;
  const [form] = Form.useForm();
  const treeRef = useRef(null);
  const intl = useIntl();
  const { data: productIdsEnum, run } = useRequest(getproduct, { manual: true });
  const { data: configData, run: getConfigData } = useRequest(getproductDetail, { manual: true });
  const [config, setConfig] = useState<ModeTreeDataNode[]>([]);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (showType == 'add') {
        setConfig(() => defaultData);
      } else {
        getConfigData({ id: values.id });
      }
    }
  }, [visible, showType]);
  useEffect(() => {
    run({ platform: configData?.platform, productConfigId: configData?.id });
    form.setFieldsValue({
      name: configData?.name,
      productIds: configData?.productIds,
      platform: configData?.platform,
    });
    const currentConfig = cloneDeep(configData?.config) || [];
    setConfig(() => handleConfigData(currentConfig, '', ''));
  }, [configData]);
  const handleCancel = () => {
    props.onCancel();
  };
  const handleOk = () => {
    if (showType === 'check') {
      handleCancel();
      return;
    }
    form.submit();
  };
  const handleFinish = async (value: Record<string, any>) => {
    const formData = value;
    formData.config = treeRef.current.getTreeData();
    formData.id = values.id;
    console.log('formData>>', formData);
    props.onSubmit(formData as PageTemplateType);
  };
  const onPlatformChange = (value: string) => {
    form.setFieldsValue({
      productIds: [],
    });
    run({ platform: value, productConfigId: values?.id });
  };
  return (
    <Modal
      width={1000}
      title={intl.formatMessage({
        id: 'physicalModel',
        defaultMessage: `${showType == 'add' ? '新增' : showType == 'edit' ? '编辑' : '查看'}`,
      })}
      visible={visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ProFormSelect
              options={platformEnum}
              width="xl"
              onChange={onPlatformChange}
              name="platform"
              label={intl.formatMessage({
                id: 'pageTemplate.platform',
                defaultMessage: '引用端',
              })}
              placeholder="请选择引用端"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="请选择引用端！" defaultMessage="请选择引用端！" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="name"
              label={intl.formatMessage({
                id: 'pageTemplate.name',
                defaultMessage: '页面名称',
              })}
              width="xl"
              placeholder="请输入页面名称"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入页面名称！" defaultMessage="请输入页面名称！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormSelect
              name="productIds"
              options={productIdsEnum}
              mode="multiple"
              fieldProps={{ fieldNames: { label: 'name', value: 'id' } }}
              label={intl.formatMessage({
                id: 'physicalModel.productModels',
                defaultMessage: '关联产品',
              })}
              width="xl"
              placeholder="请选择关联产品"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请选择关联产品！" defaultMessage="请选择关联产品！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} order={1}>
            <ConfigTree ref={treeRef} config={config} />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default MenuForm;
