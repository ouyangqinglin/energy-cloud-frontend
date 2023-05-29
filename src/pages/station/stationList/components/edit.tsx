/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 16:39:45
 * @LastEditTime: 2023-05-29 11:04:00
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\components\edit.tsx
 */
import React, { useEffect, useState, useCallback } from 'react';
import { Button, Form, message, Row, Col } from 'antd';
import { useRequest } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import type { ModalFormProps } from '@ant-design/pro-form';
import { StationFormType } from '../data.d';
import { getData, addData, editData } from '../service';
import PositionSelect from '@/components/PositionSelect';
import { FormTypeEnum } from '@/utils/dictionary';
import type { UploadProps } from 'antd/es/upload/interface';
import { api } from '@/services';

type StationFOrmProps = {
  id?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  type: FormTypeEnum;
  onSuccess?: () => void;
};

const StationForm: React.FC<StationFOrmProps> = (props) => {
  const { type, id, onSuccess } = props;

  const [form] = Form.useForm<StationFormType>();
  const [show, setShow] = useState(false);
  const { run: runGet } = useRequest(getData, {
    manual: true,
  });
  const { run: runAdd } = useRequest(addData, {
    manual: true,
  });
  const { run: runEdit } = useRequest(editData, {
    manual: true,
  });

  const getValueFromEvent = useCallback((e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }, []);

  const beforeUpload = useCallback((file, field) => {
    const formData = new FormData();
    formData.append('file', file);
    const fieldList = field + 'List';
    let photosList: string[];
    if (field === 'photos') {
      photosList = form.getFieldValue(fieldList) || [];
    }
    api.uploadFile(formData).then(({ data }) => {
      if (data.url) {
        if (field === 'photos') {
          form.setFieldValue(fieldList, [...photosList, { url: data.url }]);
        } else {
          form.setFieldValue(fieldList, [{ url: data.url }]);
        }
      }
    });
    return false;
  }, []);

  const onFinish = useCallback(
    (formData: StationFormType) => {
      const request = type == FormTypeEnum.Add ? runAdd : runEdit;
      return request({
        ...formData,
        id,
        logo: formData.logoList ? formData.logoList.map((item) => item.url).join(',') : '',
        photos: formData.photosList ? formData.photosList.map((item) => item.url).join(',') : '',
        address: formData?.addressInfo?.address,
        longitude: formData?.addressInfo?.point?.lng,
        latitude: formData?.addressInfo?.point?.lat,
        countryCode: formData?.addressInfo?.countryCode,
        provinceCode: formData?.addressInfo?.provinceCode,
        cityCode: formData?.addressInfo?.cityCode,
      }).then((data) => {
        if (data) {
          message.success('保存成功');
          onSuccess?.();
          return true;
        }
      });
    },
    [type, id],
  );

  useEffect(() => {
    if (props.open) {
      form.resetFields();
      setShow(true);
      if ((type === FormTypeEnum.Edit || type === FormTypeEnum.Detail) && id) {
        runGet(id).then((data) => {
          form.setFieldsValue({ ...(data || {}), logo: [{ url: data?.url || '' }] });
        });
      }
    }
  }, [props.open]);

  return (
    <>
      <ModalForm<StationFormType>
        visible={props.open}
        form={form}
        title="创建站点"
        autoFocusFirstInput
        onFinish={onFinish}
        onVisibleChange={props.onOpenChange}
      >
        <ProFormText
          label="站点名称"
          name="name"
          placeholder="请输入"
          rules={[{ required: true, message: '站点名称必填' }]}
        ></ProFormText>
        <Row gutter={20}>
          <Col span={8}>
            <ProFormDigit label="电压等级" name="voltageClass" addonAfter="KV" />
          </Col>
          <Col span={8}>
            <ProFormDigit label="变压器容量" name="transformerCapacity" addonAfter="KVA" />
          </Col>
          <Col span={8}>
            <ProFormDigit label="储能总容量" name="energyStorageCapacityStorage" addonAfter="kWh" />
          </Col>
          <Col span={8}>
            <ProFormDigit
              label="光伏装机量"
              name="photovoltaicInstalledCapacity"
              addonAfter="kWp"
            />
          </Col>
          <Col span={8}>
            <ProFormDigit label="充电桩装机量" name="chargingStationCapacity" addonAfter="KW" />
          </Col>
          <Col span={8}>
            <ProFormDigit label="储能额定功率" name="energyStoragePower" addonAfter="KW" />
          </Col>
        </Row>
        <Form.Item
          label="位置"
          name="addressInfo"
          rules={[{ required: true, message: '位置必填' }]}
        >
          {show && <PositionSelect></PositionSelect>}
        </Form.Item>
        <ProFormTextArea label="备注" name="remark" placeholder="请输入"></ProFormTextArea>
        <Row gutter={20}>
          <Col span={8}>
            <ProFormUploadButton
              label="站点图标"
              name="logoList"
              title="上传图片"
              max={1}
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
                beforeUpload: (file) => beforeUpload(file, 'logo'),
              }}
              icon={
                <div>
                  <PlusOutlined />
                </div>
              }
            ></ProFormUploadButton>
          </Col>
          <Col span={16}>
            <ProFormUploadButton
              label="站点照片"
              name="photosList"
              valuePropName="fileList"
              getValueFromEvent={getValueFromEvent}
              title="上传图片"
              max={3}
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
                beforeUpload: (file) => beforeUpload(file, 'photos'),
              }}
              icon={
                <div>
                  <PlusOutlined />
                </div>
              }
            ></ProFormUploadButton>
          </Col>
        </Row>
      </ModalForm>
    </>
  );
};

export default StationForm;
