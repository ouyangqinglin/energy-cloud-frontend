/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-10 11:19:17
 * @LastEditTime: 2023-09-08 17:58:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EquipForm\index.tsx
 */
import React, { useEffect, useState, useCallback } from 'react';
import { Form, message } from 'antd';
import { useRequest, useModel } from 'umi';
import Dialog from '@/components/Dialog';
import { PlusOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, ProFormSelect, ProFormUploadButton } from '@ant-design/pro-form';
import type { EquipFormType } from './data.d';
import { editData, getData, addData, getProductTypes } from './service';
import { getStations } from '@/services/station';
import type { OptionType } from '@/utils/dictionary';
import { FormTypeEnum } from '@/utils/dictionary';
import { api } from '@/services';
import { getProductModelByType } from '@/services/equipment';
import { formatMessage } from '@/utils'
import { FormattedMessage, } from 'umi';

export type EquipFormProps = {
  id?: string;
  model?: string;
  open: boolean;
  onCancel: () => void;
  type: FormTypeEnum;
  onSuccess?: () => void;
  isStationChild?: boolean;
  initialValues?: Record<string, any>;
};

const EquipForm: React.FC<EquipFormProps> = (props) => {
  const { id, model, open, onCancel, type, onSuccess, isStationChild, initialValues } = props;
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
        message.success(formatMessage({ id: 'common.successSaved' ,defaultMessage: '保存成功'}));
        onSuccess?.();
        onCancel?.();
      }
    });
  }, []);

  const requestStations = useCallback(
    () =>
      getStations().then(({ data = {} }) => {
        return data?.map?.((item: any) => {
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

  const requestProductType = useCallback(
    (subsystemId) => {
      getProductTypes({ subsystemId }).then(({ data = {} }) => {
        const result: OptionType[] = [];
        data?.forEach?.((item: any) => {
          let config: Record<string, any> = {};
          try {
            config = JSON.parse(item.config);
          } catch {
            config = {};
          }
          if (config?.selectDisplay != 0 || FormTypeEnum.Edit == type) {
            result.push({
              label: item.name,
              value: item.id,
            });
          }
        });
        setTypeOption(result);
      });
    },
    [type],
  );

  const requestProductModel = useCallback((productType) => {
    if (productType) {
      getProductModelByType({ productType }).then(({ data }) => {
        setModelOption(
          data?.map?.((item: any) => {
            return {
              label: item.model,
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
        title={ type === FormTypeEnum.Add ? formatMessage({ id: 'common.add' ,defaultMessage: '新建'}) : formatMessage({ id: 'common.edit' ,defaultMessage: '编辑'}) }
        width="600px"
        onCancel={onCancel}
        onOk={triggerSubmit}
        confirmLoading={getLoading || editLoading || addLoading}
      >
        <ProForm<EquipFormType>
          form={form}
          autoFocusFirstInput
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          submitter={false}
          grid={true}
          colProps={{
            span: 12,
          }}
          initialValues={initialValues}
        >
          {isStationChild ? (
            <></>
          ) : (
            <ProFormSelect
              label={<FormattedMessage id="equipmentList.affSite" defaultMessage="所属站点" />}
              name="siteId"
              //placeholder="请选择"
              request={requestStations}
              fieldProps={{
                getPopupContainer: (triggerNode) => triggerNode.parentElement,
              }}
            />
          )}
          <ProFormSelect
            label={<FormattedMessage id='equipmentList.affSubsys' defaultMessage="所属子系统" />}
            name="subsystemId"
            //placeholder="请选择"
            request={requestDeviceSubsystem}
            fieldProps={{
              getPopupContainer: (triggerNode) => triggerNode.parentElement,
            }}
            rules={[{ required: true, message: formatMessage({ id: 'equipmentList.subRequire',defaultMessage: '子系统必选'}) }]}
            disabled={type == FormTypeEnum.Edit}
          />
          <ProFormSelect
            label={<FormattedMessage id='common.productType' defaultMessage="产品类型" />}
            name="productType"
            //placeholder="请选择"
            options={typeOption}
            fieldProps={{
              getPopupContainer: (triggerNode) => triggerNode.parentElement,
            }}
            rules={[{ required: true }]}
            disabled={type == FormTypeEnum.Edit}
          />
          <ProFormSelect
            label={<FormattedMessage id='common.model' defaultMessage="产品型号" />}
            name="productId"
            //placeholder="请选择"
            options={modelOption}
            fieldProps={{
              getPopupContainer: (triggerNode) => triggerNode.parentElement,
            }}
            rules={[{ required: true,}]}
            disabled={type == FormTypeEnum.Edit}
          />
          <ProFormText
            label={<FormattedMessage id='common.deviceName' defaultMessage="设备名称" />}
            name="name"
            //placeholder="请输入"
            rules={[{ required: true,}]}
          />
          <ProFormText
            label={<FormattedMessage id='common.equipmentSerial' defaultMessage="设备SN" />}
            name="sn"
            rules={[{ required: true}]}
          />
          <ProFormUploadButton
            label={<FormattedMessage id='equipmentList.devicePhoto' defaultMessage="设备照片" />}
            name="photosList"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            title={<FormattedMessage id='common.uploadPhoto' defaultMessage="上传图片"/>}
            max={1}
            accept="image/*"
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
            colProps={{
              span: 24,
            }}
          />
        </ProForm>
      </Dialog>
    </>
  );
};

export default EquipForm;
