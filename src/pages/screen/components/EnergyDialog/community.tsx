/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-09 17:03:09
 * @LastEditTime: 2023-05-10 09:36:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EnergyDialog\community.tsx
 */
import React, { useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import { useRequest } from 'umi';
import ScreenDialog from '@/components/ScreenDialog';
import { ProForm, ProFormText } from '@ant-design/pro-form';
import { CommunityType } from './data.d';
import { editCommunity, getCommunity } from './service';

export type CommunityProps = {
  id: string;
  model?: string;
  open: boolean;
  onCancel: () => void;
};

const Community: React.FC<CommunityProps> = (props) => {
  const { id, model, open, onCancel } = props;

  const [form] = Form.useForm<CommunityType>();
  const Component = model === 'screen' ? ScreenDialog : Modal;

  const { loading, run } = useRequest(getCommunity, {
    manual: true,
  });

  const triggerSubmit = () => {
    form.submit();
  };

  useEffect(() => {
    if (open) {
      run(id).then((data) => {
        if (data) {
          form.setFieldsValue(data);
        } else {
          form.resetFields();
        }
      });
    }
  }, [open]);

  return (
    <>
      <Component
        open={open}
        title="设置通信信息"
        width="23.95vw"
        onCancel={onCancel}
        onOk={triggerSubmit}
      >
        <ProForm<CommunityType>
          form={form}
          layout="horizontal"
          labelCol={{ flex: '128px' }}
          autoFocusFirstInput
          onFinish={(data) =>
            editCommunity({ ...data, id }).then((res) => {
              if (res) {
                message.success('保存成功');
                onCancel();
              }
            })
          }
          submitter={false}
        >
          <ProFormText
            label="EMS  mqtt用户名"
            name="account"
            placeholder="请输入"
            rules={[{ required: true, message: '用户名必填' }]}
          ></ProFormText>
          <ProFormText.Password
            label="EMS mqtt密码"
            name="secret"
            placeholder="请输入"
            rules={[{ required: true, message: '密码必填' }]}
          ></ProFormText.Password>
        </ProForm>
      </Component>
    </>
  );
};

export default Community;
