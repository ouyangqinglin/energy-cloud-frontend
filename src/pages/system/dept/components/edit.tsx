import React, { useEffect } from 'react';
import { ProFormDigit, ProFormText, ProFormRadio, ProFormTreeSelect } from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { DeptType } from '../data.d';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

export type DeptFormValueType = Record<string, unknown> & Partial<DeptType>;

export type DeptFormProps = {
  onCancel: (flag?: boolean, formVals?: DeptFormValueType) => void;
  onSubmit: (values: DeptFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<DeptType>;
  deptTree: any;
  statusOptions: any;
};

const DeptForm: React.FC<DeptFormProps> = (props) => {
  const [form] = Form.useForm();

  const { statusOptions, deptTree } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      orgId: props.values.orgId,
      parentId: props.values.parentId,
      ancestors: props.values.ancestors,
      orgName: props.values.orgName,
      orderNum: props.values.orderNum,
      leader: props.values.leader,
      phone: props.values.phone,
      email: props.values.email,
      status: props.values.status,
      delFlag: props.values.delFlag,
      createBy: props.values.createBy,
      createTime: props.values.createTime,
      updateBy: props.values.updateBy,
      updateTime: props.values.updateTime,
    });
  }, [form, props]);

  const intl = useIntl();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };
  const handleFinish = async (values: Record<string, any>) => {
    props.onSubmit(values as DeptFormValueType);
  };

  return (
    <Modal
      width={680}
      title={props?.values?.orgId ? '编辑组织' : '新增组织'}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} initialValues={props.values} layout="vertical">
        <Row gutter={16}>
          <ProFormDigit
            name="orgId"
            label={intl.formatMessage({
              id: 'system.Dept.dept_id',
              defaultMessage: '部门id',
            })}
            placeholder="请输入部门id"
            disabled
            hidden={true}
            rules={[
              {
                required: false,
                message: <FormattedMessage id="请输入部门id！" defaultMessage="请输入部门id！" />,
              },
            ]}
          />
          <Col span={12}>
            <ProFormTreeSelect
              name="parentId"
              label="上级组织"
              request={async () => {
                return deptTree;
              }}
              placeholder="请选择上级组织"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入用户昵称！" defaultMessage="请选择上级组织!" />
                  ),
                },
              ]}
            />
          </Col>
          <ProFormText
            name="ancestors"
            label={intl.formatMessage({
              id: 'system.Dept.ancestors',
              defaultMessage: '组织列表',
            })}
            placeholder="请输入组织列表"
            hidden={true}
            rules={[
              {
                required: false,
                message: (
                  <FormattedMessage id="请输入组织列表！" defaultMessage="请输入组织列表！" />
                ),
              },
            ]}
          />
          <Col span={12}>
            <ProFormText
              name="orgName"
              label="组织名称"
              placeholder="请输入组织名称"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入组织名称！" defaultMessage="请输入组织名称！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormDigit
              name="orderNum"
              label={intl.formatMessage({
                id: 'system.Dept.order_num',
                defaultMessage: '显示顺序',
              })}
              placeholder="请输入显示顺序"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入显示顺序！" defaultMessage="请输入显示顺序！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="leader"
              label={intl.formatMessage({
                id: 'system.Dept.leader',
                defaultMessage: '负责人',
              })}
              placeholder="请输入负责人"
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入负责人！" defaultMessage="请输入负责人！" />,
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="phone"
              label={intl.formatMessage({
                id: 'system.Dept.phone',
                defaultMessage: '联系电话',
              })}
              placeholder="请输入联系电话"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入联系电话！" defaultMessage="请输入联系电话！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="email"
              label={intl.formatMessage({
                id: 'system.Dept.email',
                defaultMessage: '邮箱',
              })}
              placeholder="请输入邮箱"
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入邮箱！" defaultMessage="请输入邮箱！" />,
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormRadio.Group
              valueEnum={statusOptions}
              name="status"
              label="组织状态"
              placeholder="请输入组织状态"
              rules={[
                {
                  required: false,
                  message: (
                    <FormattedMessage id="请输入组织状态！" defaultMessage="请输入组织状态！" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DeptForm;
