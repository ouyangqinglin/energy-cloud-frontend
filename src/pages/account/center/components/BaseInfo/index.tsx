import React from 'react';
import { Form, message, Row } from 'antd';
import ProForm, { ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';
import { updateUserProfile } from '@/pages/system/user/service';
import { formatMessage } from '@/utils';

export type BaseInfoProps = {
  values: Partial<API.CurrentUser> | undefined;
  run: () => void;
};

const BaseInfo: React.FC<BaseInfoProps> = (props) => {
  const [form] = Form.useForm();
  const intl = useIntl();

  const handleFinish = async (values: Record<string, any>) => {
    const data = { ...props.values, ...values } as API.CurrentUser;
    const resp = await updateUserProfile(data);
    if (resp.code === 200) {
      message.success('修改成功');
      props.run();
    } else {
      message.warn(resp.msg);
    }
  };

  return (
    <>
      <ProForm form={form} onFinish={handleFinish} initialValues={props.values}>
        <Row>
          <ProFormText
            name="nickName"
            label={intl.formatMessage({
              id: 'system.User.nick_name',
              defaultMessage: '用户昵称',
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
        </Row>
        <Row>
          <ProFormText
            name="phone"
            label={intl.formatMessage({
              id: 'system.User.phonenumber',
              defaultMessage: '手机号码',
            })}
            width="xl"
            placeholder={formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' })}
            rules={[
              {
                required: false,
                message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
              },
            ]}
          />
        </Row>
        <Row>
          <ProFormText
            name="email"
            label={intl.formatMessage({
              id: 'system.User.email',
              defaultMessage: '邮箱',
            })}
            width="xl"
            placeholder={formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' })}
            rules={[
              {
                type: 'email',
                message: '无效的邮箱地址!',
              },
              {
                required: false,
                message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
              },
            ]}
          />
        </Row>
        <Row>
          <ProFormRadio.Group
            options={[
              {
                label: formatMessage({ id: 'system.User.man', defaultMessage: '男' }),
                value: '0',
              },
              {
                label: formatMessage({ id: 'system.User.woman', defaultMessage: '女' }),
                value: '1',
              },
            ]}
            name="sex"
            label={intl.formatMessage({
              id: 'system.User.sex',
              defaultMessage: 'sex',
            })}
            width="xl"
            rules={[
              {
                required: false,
                message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
              },
            ]}
          />
        </Row>
      </ProForm>
    </>
  );
};

export default BaseInfo;
