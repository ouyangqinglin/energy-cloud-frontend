/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-10 09:50:05
 * @LastEditTime: 2023-05-10 09:50:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Gateway\community.tsx
 */
import React, { useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import { useRequest } from 'umi';
import Dialog from '@/components/Dialog';
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

  const { loading, run } = useRequest(getCommunity, {
    manual: true,
  });

  const triggerSubmit = () => {
    form.submit();
  };

  useEffect(() => {
    if (open) {
      run(id).then((data) => {
        form.resetFields();
        if (data) {
          form.setFieldsValue(data);
        }
      });
    }
  }, [open]);

  return (
    <>
      <Dialog
        model={model}
        open={open}
        title="设置通信信息"
        width="458px"
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
            label="网关  mqtt用户名"
            name="account"
            placeholder="请输入"
            rules={[{ required: true, message: '用户名必填' }]}
          ></ProFormText>
          <ProFormText.Password
            label="网关 mqtt密码"
            name="secret"
            placeholder="请输入"
            rules={[{ required: true, message: '密码必填' }]}
          ></ProFormText.Password>
        </ProForm>
      </Dialog>
    </>
  );
};

export default Community;
