/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-10 09:53:55
 * @LastEditTime: 2023-05-29 19:47:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\ElectricMeter\community.tsx
 */
import React, { useEffect, useState } from 'react';
import { Modal, Form, message } from 'antd';
import { useRequest } from 'umi';
import Dialog from '@/components/Dialog';
import { ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { CommunityType } from './data.d';
import { editCommunity, getCommunity, getGateway } from './service';
import { OptionType } from '@/utils/dictionary';

export type CommunityProps = {
  id: string;
  model?: string;
  open: boolean;
  onCancel: () => void;
};

const Community: React.FC<CommunityProps> = (props) => {
  const { id, model, open, onCancel } = props;

  const [gatewayOptions, setGatewayOptions] = useState<OptionType[]>();
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

  useEffect(() => {
    // getGateway().then((res) => {
    //   setGatewayOptions(res.data || []);
    // });
  }, []);

  return (
    <>
      <Dialog
        model={model}
        open={open}
        title="设置通信参数"
        width="458px"
        onCancel={onCancel}
        onOk={triggerSubmit}
      >
        <ProForm<CommunityType>
          form={form}
          layout="horizontal"
          labelCol={{ flex: '84px' }}
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
            label="通讯短码"
            name="code"
            placeholder="请输入"
            rules={[{ required: true, message: '通讯短码必填' }]}
          ></ProFormText>
          <ProFormSelect
            label="绑定网关"
            name="gateway"
            placeholder="请选择"
            rules={[{ required: true, message: '网关必选' }]}
            options={gatewayOptions}
            fieldProps={{
              getPopupContainer: (triggerNode) => triggerNode.parentElement,
            }}
          ></ProFormSelect>
        </ProForm>
      </Dialog>
    </>
  );
};

export default Community;
