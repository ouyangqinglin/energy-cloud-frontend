/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-10 11:19:17
 * @LastEditTime: 2023-12-01 11:03:03
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\equipment\equipment-list\deviceSn\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { Form, Modal } from 'antd';
import { useRequest, useModel } from 'umi';
import Dialog from '@/components/Dialog';
import { ProForm, ProFormText } from '@ant-design/pro-form';
import { formatMessage } from '@/utils';
import SiteConfigNewDevice from '@/components/SiteConfigNewDevice';
import { getDeviceBySn } from './service';

export type DeviceSnProps = {
  id?: string;
  model?: string;
  open: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
  isStationChild?: boolean;
  initialValues?: Record<string, any>;
};
export type EquipFormType = {
  sn?: string;
};
const DeviceSn: React.FC<DeviceSnProps> = (props) => {
  const { id, model, open, onCancel, onSuccess, isStationChild, initialValues } = props;
  const [openDeviceDetail, setOpenDeviceDetail] = useState(false);
  const [descValues, setDescValues] = useState({});
  const [form] = Form.useForm<EquipFormType>();

  const triggerSubmit = () => {
    form.submit();
  };

  const onFinish = useCallback((formData: EquipFormType) => {
    return getDeviceBySn(formData).then((res) => {
      if (res.code === 200) {
        props.onCancel(); //调用父组件的方法
        setOpenDeviceDetail(true); //打开设备详情弹窗
        setDescValues(res?.data);
      } else {
        //message.error(res.msg || '绑定设备失败');
      }
    });
  }, []);

  const onSwitchOpen = useCallback(() => {
    setOpenDeviceDetail((data) => !data);
  }, []);

  return (
    <>
      <Dialog
        model={model}
        open={open}
        title={'新增设备'}
        width="600px"
        onCancel={onCancel}
        onOk={triggerSubmit}
        okText="下一步"
        cancelText="取消"
      >
        <ProForm
          form={form}
          autoFocusFirstInput
          onFinish={onFinish}
          submitter={false}
          grid={true}
          colProps={{
            span: 24,
          }}
          initialValues={initialValues}
        >
          <ProFormText
            name="sn"
            label={'设备sn'}
            placeholder="请输入设备sn"
            rules={[
              {
                required: true,
                message: '请输入设备sn',
              },
            ]}
          />
        </ProForm>
      </Dialog>
      <SiteConfigNewDevice
        open={openDeviceDetail}
        onCancel={onSwitchOpen}
        type={'add'}
        onSuccess={onSuccess}
        descValues={descValues}
        isStationChild={isStationChild}
      />
    </>
  );
};

export default DeviceSn;
