/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-09 17:03:09
 * @LastEditTime: 2023-05-15 10:59:51
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EnergyDialog\community.tsx
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

  const { loading: getLoading, run: runGet } = useRequest(getCommunity, {
    manual: true,
  });
  const { loading: editLoading, run: runEdit } = useRequest(editCommunity, {
    manual: true,
  });

  const [form] = Form.useForm<CommunityType>();

  const triggerSubmit = () => {
    form.submit();
  };

  useEffect(() => {
    if (open) {
      runGet(id).then((data) => {
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
        confirmLoading={getLoading || editLoading}
        onCancel={onCancel}
        onOk={triggerSubmit}
      >
        <ProForm<CommunityType>
          form={form}
          layout="horizontal"
          labelCol={{ flex: '128px' }}
          autoFocusFirstInput
          onFinish={(data) =>
            runEdit({ ...data, deviceId: id }).then((res) => {
              if (res.code == 200) {
                message.success('保存成功');
                onCancel();
              }
            })
          }
          submitter={false}
        >
          <ProFormText
            label="EMS  mqtt用户名"
            name="userName"
            placeholder="请输入"
            rules={[{ required: true, message: '用户名必填' }]}
          ></ProFormText>
          <ProFormText.Password
            label="EMS mqtt密码"
            name="password"
            placeholder="请输入"
            rules={[{ required: true, message: '密码必填' }]}
          ></ProFormText.Password>
        </ProForm>
      </Dialog>
    </>
  );
};

export default Community;
