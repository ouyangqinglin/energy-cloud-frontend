import React, { useEffect } from 'react';
import {
  ProFormDigit,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormRadio,
} from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { NoticeType } from '../data.d';
import { formatMessage } from '@/utils';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

export type NoticeFormValueType = Record<string, unknown> & Partial<NoticeType>;

export type NoticeFormProps = {
  onCancel: (flag?: boolean, formVals?: NoticeFormValueType) => void;
  onSubmit: (values: NoticeFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<NoticeType>;
  noticeTypeOptions: any;
  statusOptions: any;
};

const NoticeForm: React.FC<NoticeFormProps> = (props) => {
  const [form] = Form.useForm();

  const { noticeTypeOptions, statusOptions } = props;

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      noticeId: props.values.noticeId,
      noticeTitle: props.values.noticeTitle,
      noticeType: props.values.noticeType,
      noticeContent: props.values.noticeContent,
      status: props.values.status,
      createBy: props.values.createBy,
      createTime: props.values.createTime,
      updateBy: props.values.updateBy,
      updateTime: props.values.updateTime,
      remark: props.values.remark,
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
  const handleFinish = (values: Record<string, any>) => {
    props.onSubmit(values as NoticeFormValueType);
  };

  return (
    <Modal
      width={552}
      title={intl.formatMessage({
        id: 'system.Notice.modify',
        defaultMessage: '编辑通知公告',
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <Form form={form} onFinish={handleFinish} initialValues={props.values} layout="vertical">
        <ProFormDigit
          name="noticeId"
          label={intl.formatMessage({
            id: 'system.Notice.notice_id',
            defaultMessage: '公告ID',
          })}
          placeholder={`${formatMessage({
            id: 'common.pleaseEnter',
            defaultMessage: '请输入',
          })}${intl.formatMessage({
            id: 'system.Notice.notice_id',
            defaultMessage: '公告ID',
          })}`}
          disabled
          hidden={!props.values.noticeId}
          rules={[
            {
              required: false,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                formatMessage({ id: 'system.Notice.notice_id', defaultMessage: '公告ID' }),
            },
          ]}
        />
        <ProFormText
          name="noticeTitle"
          label={intl.formatMessage({
            id: 'system.Notice.notice_title',
            defaultMessage: '公告标题',
          })}
          placeholder={`${formatMessage({
            id: 'common.pleaseEnter',
            defaultMessage: '请输入',
          })}${intl.formatMessage({
            id: 'system.Notice.notice_title',
            defaultMessage: '公告标题',
          })}`}
          rules={[
            {
              required: true,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                formatMessage({ id: 'system.Notice.notice_title', defaultMessage: '公告标题' }),
            },
          ]}
        />
        <ProFormSelect
          valueEnum={noticeTypeOptions}
          name="noticeType"
          label={intl.formatMessage({
            id: 'system.Notice.notice_type',
            defaultMessage: '公告类型',
          })}
          placeholder={`${formatMessage({
            id: 'common.pleaseEnter',
            defaultMessage: '请输入',
          })}${intl.formatMessage({
            id: 'system.Notice.notice_type',
            defaultMessage: '公告类型',
          })}`}
          rules={[
            {
              required: true,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                formatMessage({ id: 'system.Notice.notice_type', defaultMessage: '公告类型' }),
            },
          ]}
        />
        <ProFormTextArea
          name="noticeContent"
          label={intl.formatMessage({
            id: 'system.Notice.notice_content',
            defaultMessage: '公告内容',
          })}
          placeholder={`${formatMessage({
            id: 'common.pleaseEnter',
            defaultMessage: '请输入',
          })}${intl.formatMessage({
            id: 'system.Notice.notice_content',
            defaultMessage: '公告内容',
          })}`}
          rules={[
            {
              required: false,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                formatMessage({ id: 'system.Notice.notice_content', defaultMessage: '公告内容' }),
            },
          ]}
        />
        <ProFormRadio.Group
          valueEnum={statusOptions}
          name="status"
          label={intl.formatMessage({
            id: 'system.Notice.status',
            defaultMessage: '公告状态',
          })}
          labelCol={{ span: 24 }}
          placeholder={`${formatMessage({
            id: 'common.pleaseEnter',
            defaultMessage: '请输入',
          })}${intl.formatMessage({
            id: 'system.Notice.status',
            defaultMessage: '公告状态',
          })}`}
          rules={[
            {
              required: false,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                formatMessage({ id: 'system.Notice.status', defaultMessage: '公告状态' }),
            },
          ]}
        />
        <ProFormText
          name="remark"
          label={intl.formatMessage({
            id: 'system.Notice.remark',
            defaultMessage: '备注',
          })}
          placeholder={`${formatMessage({
            id: 'common.pleaseEnter',
            defaultMessage: '请输入',
          })}${intl.formatMessage({
            id: 'system.Notice.remark',
            defaultMessage: '备注',
          })}`}
          rules={[
            {
              required: false,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                formatMessage({ id: 'system.Notice.remark', defaultMessage: '备注' }),
            },
          ]}
        />
      </Form>
    </Modal>
  );
};

export default NoticeForm;
