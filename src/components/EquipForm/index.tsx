/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-10 11:19:17
 * @LastEditTime: 2023-06-02 08:55:00
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EquipForm\index.tsx
 */
import React, { useEffect, useState, useCallback } from 'react';
import { Form, message } from 'antd';
import { useRequest, useModel } from 'umi';
import Dialog from '@/components/Dialog';
import { PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, ProFormSelect, ProFormUploadButton } from '@ant-design/pro-form';
import { EquipFormType } from './data.d';
import { editData, getData, addData, getProductTypes, getProductModels } from './service';
import { getStations } from '@/services/station';
import { FormTypeEnum, OptionType } from '@/utils/dictionary';
import { api } from '@/services';

export type EquipFormProps = {
  id?: string;
  model?: string;
  open: boolean;
  onCancel: () => void;
  type: FormTypeEnum;
  onSuccess?: () => void;
  isStationChild?: boolean;
};

const EquipForm: React.FC<EquipFormProps> = (props) => {
  const { id, model, open, onCancel, type, onSuccess, isStationChild } = props;
  const [typeOption, setTypeOption] = useState<OptionType[]>();
  const [modelOption, setModelOption] = useState<OptionType[]>();
  const { stationId } = useModel('station', (stateData) => ({ stationId: stateData?.state.id }));
  const { loading: getLoading, run: runGet } = useRequest(getData, {
    manual: true,
  });
  const { loading: addLoading, run: runAdd } = useRequest(addData, {
    manual: true,
  });
  const { loading: editLoading, run: runEdit } = useRequest(editData, {
    manual: true,
  });
  const [form] = Form.useForm<EquipFormType>();

  const triggerSubmit = () => {
    form.submit();
  };

  const beforeUpload = useCallback((file, field) => {
    const formData = new FormData();
    formData.append('file', file);
    api.uploadFile(formData).then(({ data }) => {
      if (data.url) {
        form.setFieldValue(field, [{ url: data.url }]);
      }
    });
    return false;
  }, []);

  const onFinish = useCallback((formData: EquipFormType) => {
    const request = type == FormTypeEnum.Add ? runAdd : runEdit;
    return request({
      ...formData,
      ...(isStationChild ? { siteId: stationId } : {}),
      deviceId: id,
      photos: formData?.photosList ? formData.photosList.map((item) => item.url).join(',') : '',
    }).then((data) => {
      if (data) {
        message.success('保存成功');
        onSuccess?.();
        onCancel?.();
      }
    });
  }, []);

  const requestStations = useCallback(
    () =>
      getStations().then(({ data = {} }) => {
        return data?.map((item: any) => {
          return {
            label: item.name,
            value: item.id,
          };
        });
      }),
    [],
  );

  const requestDeviceSubsystem = useCallback(
    () =>
      api.getDeviceSubsystem().then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            label: item.name,
            value: item.id,
          };
        });
      }),
    [],
  );

  const requestProductType = useCallback((subsystemId) => {
    getProductTypes({ subsystemId }).then(({ data = {} }) => {
      setTypeOption(
        data?.map?.((item: any) => {
          return {
            label: item.name,
            value: item.id,
          };
        }),
      );
    });
  }, []);

  const requestProductModel = useCallback((productType) => {
    if (productType) {
      getProductModels({ productType }).then(({ data = {} }) => {
        setModelOption(
          data?.map?.((item: any) => {
            return {
              label: item.name,
              value: item.id,
            };
          }),
        );
      });
    }
  }, []);

  const onValuesChange = useCallback(({ productType, subsystemId }) => {
    if (subsystemId) {
      requestProductType(subsystemId);
      form.setFieldValue('productType', undefined);
      form.setFieldValue('productId', undefined);
    }
    if (productType) {
      requestProductModel(productType);
      form.setFieldValue('productId', undefined);
    }
  }, []);

  const getValueFromEvent = useCallback((e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }, []);

  useEffect(() => {
    if (open) {
      form.resetFields();
      if (type === FormTypeEnum.Edit || type === FormTypeEnum.Detail) {
        runGet(id).then((data) => {
          form.setFieldsValue({ ...data, photosList: data?.url ? [{ url: data.url }] : [] });
          requestProductType(data?.subsystemId);
          requestProductModel(data?.productType);
        });
      }
    }
  }, [open]);

  return (
    <>
      <Dialog
        model={model}
        open={open}
        title={(type === FormTypeEnum.Add ? '新增' : '编辑') + '设备'}
        width="460px"
        onCancel={onCancel}
        onOk={triggerSubmit}
        confirmLoading={getLoading || editLoading || addLoading}
      >
        <ProForm<EquipFormType>
          form={form}
          layout="horizontal"
          labelCol={{ flex: '94px' }}
          autoFocusFirstInput
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          submitter={false}
        >
          {isStationChild ? (
            <></>
          ) : (
            <ProFormSelect
              label="所属站点"
              name="siteId"
              placeholder="请选择"
              request={requestStations}
              fieldProps={{
                getPopupContainer: (triggerNode) => triggerNode.parentElement,
              }}
              disabled={type == FormTypeEnum.Edit}
            ></ProFormSelect>
          )}
          <ProFormSelect
            label="所属子系统"
            name="subsystemId"
            placeholder="请选择"
            request={requestDeviceSubsystem}
            fieldProps={{
              getPopupContainer: (triggerNode) => triggerNode.parentElement,
            }}
            rules={[{ required: true, message: '子系统必选' }]}
            disabled={type == FormTypeEnum.Edit}
          ></ProFormSelect>
          <ProFormSelect
            label="产品类型"
            name="productType"
            placeholder="请选择"
            options={typeOption}
            fieldProps={{
              getPopupContainer: (triggerNode) => triggerNode.parentElement,
            }}
            rules={[{ required: true, message: '产品类型必选' }]}
            disabled={type == FormTypeEnum.Edit}
          ></ProFormSelect>
          <ProFormSelect
            label="产品型号"
            name="productId"
            placeholder="请选择"
            options={modelOption}
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
          <ProFormText
            label="设备SN"
            name="sn"
            placeholder="请输入"
            rules={[{ required: true, message: '设备SN必填' }]}
          ></ProFormText>
          <ProFormUploadButton
            label="设备照片"
            name="photosList"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            title="上传图片"
            max={1}
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
              beforeUpload: (file) => beforeUpload(file, 'photosList'),
            }}
            icon={
              <div>
                <PlusOutlined />
              </div>
            }
          ></ProFormUploadButton>
        </ProForm>
      </Dialog>
    </>
  );
};

export default EquipForm;
