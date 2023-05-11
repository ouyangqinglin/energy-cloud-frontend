/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-10 11:19:17
 * @LastEditTime: 2023-05-10 13:38:31
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EquipForm\index.tsx
 */
import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Form, message } from 'antd';
import ScreenDialog from '@/components/ScreenDialog';
import { PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, ProFormSelect, ProFormUploadButton } from '@ant-design/pro-form';
import { EquipFormType } from './data.d';
import { editCommunity, getStations, getProductTypes, getProductModels } from './service';
import { FormTypeEnum } from '@/utils/dictionary';

export type EquipFormProps = {
  id: string;
  model?: string;
  open: boolean;
  onCancel: () => void;
  data: EquipFormType;
  type: FormTypeEnum;
};

const EquipForm: React.FC<EquipFormProps> = (props) => {
  const { id, model, open, onCancel, data, type } = props;

  const [form] = Form.useForm<EquipFormType>();
  const Component = model === 'screen' ? ScreenDialog : Modal;

  const triggerSubmit = () => {
    form.submit();
  };

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue({ ...data, imgs: [{ url: data?.img || '' }] });
    }
  }, [open]);

  const requestStations = useCallback(
    () =>
      getStations().then((res) => {
        return res?.rows?.map((item: any) => {
          return {
            label: item.name,
            value: item.id,
          };
        });
      }),
    [],
  );

  const requestProductType = useCallback(
    () =>
      getProductTypes().then((res) => {
        return res?.data || [];
      }),
    [],
  );

  const requestProductModel = useCallback(
    () =>
      getProductModels().then((res) => {
        return res?.data || [];
      }),
    [],
  );

  const getValueFromEvent = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <Component
        open={open}
        title={(type === FormTypeEnum.Add ? '新增' : '编辑') + '设备'}
        width="460px"
        onCancel={onCancel}
        onOk={triggerSubmit}
      >
        <ProForm<EquipFormType>
          form={form}
          layout="horizontal"
          labelCol={{ flex: '84px' }}
          autoFocusFirstInput
          onFinish={(formData) =>
            editCommunity({ ...formData, id }).then((res) => {
              if (res) {
                message.success('保存成功');
                onCancel();
              }
            })
          }
          submitter={false}
        >
          <ProFormSelect
            label="所属站点"
            name="stationId"
            placeholder="请选择"
            request={requestStations}
            fieldProps={{
              getPopupContainer: (triggerNode) => triggerNode.parentElement,
            }}
            disabled={type == FormTypeEnum.Edit}
          ></ProFormSelect>
          <ProFormSelect
            label="产品类型"
            name="type"
            placeholder="请选择"
            request={requestProductType}
            fieldProps={{
              getPopupContainer: (triggerNode) => triggerNode.parentElement,
            }}
            rules={[{ required: true, message: '产品类型必选' }]}
            disabled={type == FormTypeEnum.Edit}
          ></ProFormSelect>
          <ProFormSelect
            label="产品型号"
            name="model"
            placeholder="请选择"
            request={requestProductModel}
            fieldProps={{
              getPopupContainer: (triggerNode) => triggerNode.parentElement,
            }}
            rules={[{ required: true, message: '产品型号必选' }]}
            disabled={type == FormTypeEnum.Edit}
          ></ProFormSelect>
          <ProFormText
            label="设备名称"
            name="name"
            placeholder="请输入"
            rules={[{ required: true, message: '设备名称必填' }]}
          ></ProFormText>
          <ProFormText label="设备SN" name="sn" placeholder="请输入"></ProFormText>
          <ProFormUploadButton
            label="设备照片"
            name="imgs"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            max={1}
            icon={
              <div>
                <PlusOutlined />
              </div>
            }
            title="上传图片"
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
            }}
          ></ProFormUploadButton>
        </ProForm>
      </Component>
    </>
  );
};

export default EquipForm;
