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
  ProFormDependency
} from '@ant-design/pro-form';
import type { StationFormType } from '../config';
import { getDetailData, addData, editData } from '../service';
import PositionSelect from '@/components/PositionSelect';
import { FormTypeEnum, siteType } from '@/utils/dictionary';//定义的一些全局变量
import { api } from '@/services';//公用API
import TableSelect from '@/components/TableSelect';
import { getServicePage } from '@/services/service';
import Detail from '@/components/Detail';
import { getProductTypeList } from '@/services/equipment';
import { SearchParams } from '@/hooks/useSearchSelect';
import {getProductSnList } from '../../comService';

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
  const { run: runGet } = useRequest(getDetailData, {
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
  const isEditUpgradePackage = type === FormTypeEnum.Edit ? true : false;
  // const requestDeviceSubsystem = useCallback(
  //   () =>
  //     api.getDeviceSubsystem().then(({ data }) => {
  //       return data?.map?.((item: any) => {
  //         return {
  //           label: item.name,
  //           value: item.id,
  //         };
  //       });
  //     }),
  //   [],
  // );
  //获取产品类型
  const requestProductType = useCallback((searchParams: SearchParams) => {
    return getProductTypeList(searchParams).then(({ data }) => {
      return data?.map?.((item) => {
        return {
          label: item?.name || '',
          value: item?.id || '',
        };
      });
    });
  }, []);
  //获取产品型号--依赖产品类型
  const requestProductSn = useCallback((params) => {
    if(params?.productTypeId) {
      return getProductSnList({
        productTypeId:params?.productTypeId
      }).then(({ data }) => {
        return data?.map?.((item:any) => {
          return {
            label: item?.model || '',
            value: item?.id || '',
          };
        });
      });
    }else {
      return Promise.resolve([]);
    }   
  }, []);
  // const productSnColumn = {
  //     title: '产品型号',
  //     dataIndex: 'productModel',
  //     formItemProps: {
  //       name: 'productModel',
  //     },
  //     hideInTable: true,
  //     dependencies: ['productTypeId'],   
  //     request: requestProductSn,
  // };
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
        <Row gutter={20}>
          <Col span={12}>
            <ProFormText
              label="版本号"
              name="version"
              placeholder="请输入"
              disabled={isEditUpgradePackage}
              rules={[{ required: true, message: '版本号必填' }]}
            />
          </Col>
          <Col span={12}>
            <ProFormText label="软件包名" name="packageName" placeholder="请输入" disabled={isEditUpgradePackage}/>
          </Col>
          <Col span={12}>
            <ProFormSelect
              label="产品类型"
              name="productTypeName"
              disabled={isEditUpgradePackage}
              request={requestProductType}
            />
          </Col>
          <Col span={12}>
          <ProFormSelect
                label="产品型号"
                name="productModel"
                placeholder="请选择"
                disabled={isEditUpgradePackage}
                request={requestProductSn}
                dependencies={['productTypeId']}  
              /> 
          </Col>
          <Col span={12}>
            <ProFormSelect
                label="模块"
                name="moduleName"
                placeholder="请选择"
                disabled={isEditUpgradePackage}
                request={requestProductType}
              />
          </Col>
          {/* 软件包 */}
          <Col span={12}>
            <ProFormDigit label="电压等级" name="voltageClass" fieldProps={{ addonAfter: 'KV' }} />
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
