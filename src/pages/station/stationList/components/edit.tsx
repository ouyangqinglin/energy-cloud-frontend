/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 16:39:45
 * @LastEditTime: 2023-09-15 09:14:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\components\edit.tsx
 */
import React, { useEffect, useState, useCallback } from 'react';
import { Form, message, Row, Col } from 'antd';
import { useRequest } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProFormUploadButton,
  ProFormSelect,
} from '@ant-design/pro-form';
import type { StationFormType } from '../data.d';
import { getData, addData, editData } from '../service';
import PositionSelect from '@/components/PositionSelect';
import { FormTypeEnum, siteType } from '@/utils/dictionary';
import { api } from '@/services';
import TableSelect from '@/components/TableSelect';
import { getServicePage } from '@/services/service';
import Detail from '@/components/Detail';

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
        siteId: id,
        logo: formData.logoList ? formData.logoList.map((item) => item.url).join(',') : '',
        photos: formData.photosList ? formData.photosList.map((item) => item.url).join(',') : '',
        address: formData?.addressInfo?.address,
        longitude: formData?.addressInfo?.point?.lng,
        latitude: formData?.addressInfo?.point?.lat,
        countryCode: formData?.addressInfo?.countryCode,
        provinceCode: formData?.addressInfo?.provinceCode,
        cityCode: formData?.addressInfo?.cityCode,
        adcode: formData?.addressInfo?.adcode,
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
          form.setFieldsValue({
            ...(data || {}),
            addressInfo: {
              address: data?.address,
              point: {
                lng: data?.longitude,
                lat: data?.latitude,
              },
              adcode: data?.adcode,
            },
            logoList: data?.logo ? [{ url: data.logo }] : [],
            photosList: data?.photos ? data.photos.split(',').map((url: string) => ({ url })) : [],
          });
        });
      }
    }
  }, [props.open, id, type, form]);

  return (
    <>
      <ModalForm<StationFormType>
        visible={props.open}
        form={form}
        title={type === FormTypeEnum.Edit ? '编辑' : '新建'}
        autoFocusFirstInput
        onFinish={onFinish}
        onVisibleChange={props.onOpenChange}
      >
        <Detail.DotLabel title="基础信息" />
        <Row gutter={20}>
          <Col span={8}>
            <ProFormText
              label="站点名称"
              name="name"
              placeholder="请输入"
              rules={[{ required: true, message: '站点名称必填' }]}
            />
          </Col>
          <Col span={8}>
            <ProFormText label="站点编码" name="id" placeholder="请输入" disabled />
          </Col>
          <Col span={8}>
            <ProFormSelect
              label="站点类型"
              name="energyOptions"
              placeholder="请选择"
              valueEnum={siteType}
              disabled
            />
          </Col>
          <Col span={8}>
            <Form.Item label="安装商" name="orgs">
              <TableSelect
                tableId="orgId"
                tableName="orgName"
                valueId="orgId"
                valueName="orgName"
                limit={1}
                proTableProps={{
                  columns: [
                    {
                      title: '安装商ID',
                      dataIndex: 'orgId',
                      width: 150,
                      ellipsis: true,
                      hideInSearch: true,
                    },
                    {
                      title: '安装商名称',
                      dataIndex: 'orgName',
                      width: 200,
                      ellipsis: true,
                    },
                  ],
                  request: (params: Record<string, any>) => {
                    return getServicePage(params)?.then(({ data }) => {
                      return {
                        data: data?.list,
                        total: data?.total,
                        success: true,
                      };
                    });
                  },
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <ProFormDigit label="电压等级" name="voltageClass" fieldProps={{ addonAfter: 'KV' }} />
          </Col>
          <Col span={8}>
            <ProFormDigit
              label="变压器容量"
              name="transformerCapacity"
              fieldProps={{ addonAfter: 'KVA' }}
            />
          </Col>
          <Col span={8}>
            <ProFormDigit
              label="光伏总容量"
              name="photovoltaicInstalledCapacity"
              fieldProps={{ addonAfter: 'kWp' }}
            />
          </Col>
          <Col span={8}>
            <ProFormDigit
              label="储能总容量"
              name="energyStorageCapacity"
              fieldProps={{ addonAfter: 'kWh' }}
            />
          </Col>
          <Col span={8}>
            <ProFormDigit
              label="储能额定功率"
              name="energyStoragePower"
              fieldProps={{ addonAfter: 'kW' }}
            />
          </Col>
          <Col span={8}>
            <ProFormDigit
              label="充电桩总功率"
              name="chargingStationCapacity"
              fieldProps={{ addonAfter: 'kW' }}
            />
          </Col>
        </Row>
        <Form.Item
          label="站点地址"
          name="addressInfo"
          rules={[{ required: true, message: '站点地址必填' }]}
        >
          {show && <PositionSelect />}
        </Form.Item>
        <ProFormTextArea label="备注" name="remarks" placeholder="请输入" />
        <Row gutter={20}>
          <Col span={8}>
            <ProFormUploadButton
              label="站点图标"
              name="logoList"
              title="上传图片"
              max={1}
              accept="image/*"
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
            />
          </Col>
          <Col span={16}>
            <ProFormUploadButton
              label="站点照片"
              name="photosList"
              valuePropName="fileList"
              getValueFromEvent={getValueFromEvent}
              title="上传图片"
              max={3}
              accept="image/*"
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
            />
          </Col>
        </Row>
      </ModalForm>
    </>
  );
};

export default StationForm;
