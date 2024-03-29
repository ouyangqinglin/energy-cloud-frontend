/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 16:39:45
 * @LastEditTime: 2024-02-29 10:19:56
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
import { mapTypeOptions, siteType, timeZoneOptions } from '@/utils/dict';
import { FormTypeEnum } from '@/components/SchemaForm';
import { api } from '@/services';
import TableSelect from '@/components/TableSelect';
import { getServicePage } from '@/services/service';
import Detail from '@/components/Detail';
import { arrayToMap, formatMessage } from '@/utils';
import { ProFormDependency } from '@ant-design/pro-components';

type StationFOrmProps = {
  id?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  type: FormTypeEnum;
  onSuccess?: () => void;
  requestSave?: (data: StationFormType) => Promise<any>;
  initValues?: StationFormType;
};

const timeZoneMap = arrayToMap(timeZoneOptions, 'value', 'position');

const StationForm: React.FC<StationFOrmProps> = (props) => {
  const { type, id, onSuccess, requestSave, initValues } = props;

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
      const request = requestSave || (type == FormTypeEnum.Add ? runAdd : runEdit);
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
    [type, id, onSuccess, requestSave],
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
      } else if (initValues) {
        form.setFieldsValue(initValues);
      }
    }
  }, [props.open, id, type, form, initValues]);

  return (
    <>
      <ModalForm<StationFormType>
        visible={props.open}
        form={form}
        title={
          type === FormTypeEnum.Edit
            ? formatMessage({ id: 'common.edit', defaultMessage: '编辑' })
            : formatMessage({ id: 'common.new', defaultMessage: '新建' })
        }
        autoFocusFirstInput
        onFinish={onFinish}
        onVisibleChange={props.onOpenChange}
      >
        <Detail.DotLabel
          title={formatMessage({ id: 'common.baseInfo', defaultMessage: '基础信息' })}
        />
        <Row gutter={20}>
          <Col span={8}>
            <ProFormText
              label={formatMessage({
                id: 'siteManage.siteList.siteName',
                defaultMessage: '站点名称',
              })}
              name="name"
              rules={[
                {
                  required: true,
                  message:
                    formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                    formatMessage({
                      id: 'siteManage.siteList.siteName',
                      defaultMessage: '站点名称',
                    }),
                },
              ]}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              label={formatMessage({
                id: 'siteManage.siteList.siteCode',
                defaultMessage: '站点编码',
              })}
              name="id"
              disabled
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              label={formatMessage({
                id: 'siteManage.siteList.siteType',
                defaultMessage: '站点类型',
              })}
              name="energyOptions"
              valueEnum={siteType}
              disabled
            />
          </Col>
          <Col span={8}>
            <Form.Item
              label={formatMessage({
                id: 'siteManage.siteList.installer',
                defaultMessage: '安装商',
              })}
              name="orgs"
              rules={[
                {
                  required: true,
                  message:
                    formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                    formatMessage({
                      id: 'siteManage.siteList.installer',
                      defaultMessage: '安装商',
                    }),
                },
              ]}
            >
              <TableSelect
                tableId="orgId"
                tableName="orgName"
                valueId="orgId"
                valueName="orgName"
                limit={1}
                proTableProps={{
                  columns: [
                    {
                      title:
                        formatMessage({
                          id: 'siteManage.siteList.installer',
                          defaultMessage: '安装商',
                        }) + 'ID',
                      dataIndex: 'orgId',
                      width: 150,
                      ellipsis: true,
                      hideInSearch: true,
                    },
                    {
                      title: formatMessage({
                        id: 'siteManage.siteList.installerName',
                        defaultMessage: '安装商名称',
                      }),
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
            <ProFormDigit
              label={formatMessage({
                id: 'siteManage.siteList.voltageLevel',
                defaultMessage: '电压等级',
              })}
              name="voltageClass"
              fieldProps={{ addonAfter: 'KV' }}
            />
          </Col>
          <Col span={8}>
            <ProFormDigit
              label={formatMessage({
                id: 'siteManage.siteList.transformerCapacity',
                defaultMessage: '变压器容量',
              })}
              name="transformerCapacity"
              fieldProps={{ addonAfter: 'KVA' }}
            />
          </Col>
          <Col span={8}>
            <ProFormDigit
              label={formatMessage({
                id: 'siteManage.siteList.totalPhotovoltaicCapacity',
                defaultMessage: '光伏总容量',
              })}
              name="photovoltaicInstalledCapacity"
              fieldProps={{ addonAfter: 'kWp' }}
            />
          </Col>
          <Col span={8}>
            <ProFormDigit
              label={formatMessage({
                id: 'siteManage.siteList.totalEnergyStorageCapacity',
                defaultMessage: '储能总容量',
              })}
              name="energyStorageCapacity"
              fieldProps={{ addonAfter: 'kWh' }}
            />
          </Col>
          <Col span={8}>
            <ProFormDigit
              label={formatMessage({
                id: 'siteManage.siteList.energyStoragePower',
                defaultMessage: '储能额定功率',
              })}
              name="energyStoragePower"
              fieldProps={{ addonAfter: 'kW' }}
            />
          </Col>
          <Col span={8}>
            <ProFormDigit
              label={formatMessage({
                id: 'siteManage.siteList.chargingStationCapacity',
                defaultMessage: '充电桩总功率',
              })}
              name="chargingStationCapacity"
              fieldProps={{ addonAfter: 'kW' }}
            />
          </Col>
          {/* <Col span={8}>
            <ProFormSelect
              label={formatMessage({
                id: 'siteManage.timeZone',
                defaultMessage: '时区',
              })}
              name="timeZone"
              options={timeZoneOptions}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
                },
              ]}
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              label={formatMessage({
                id: 'siteManage.map',
                defaultMessage: '地图',
              })}
              name="map"
              options={mapTypeOptions}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
                },
              ]}
            />
          </Col> */}
        </Row>
        <ProFormDependency name={['timeZone', 'map']}>
          {({ timeZone, map }) => {
            return (
              <Form.Item
                label={formatMessage({
                  id: 'siteManage.siteList.siteAddress',
                  defaultMessage: '站点地址',
                })}
                name="addressInfo"
                rules={[
                  {
                    required: true,
                    message:
                      formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                      formatMessage({
                        id: 'siteManage.siteList.siteAddress',
                        defaultMessage: '站点地址',
                      }),
                  },
                ]}
              >
                {show && <PositionSelect initCenter={timeZoneMap[timeZone]} type={map} />}
              </Form.Item>
            );
          }}
        </ProFormDependency>
        <ProFormTextArea
          label={formatMessage({ id: 'common.remark', defaultMessage: '备注' })}
          name="remarks"
        />
        <Row gutter={20}>
          <Col span={8}>
            <ProFormUploadButton
              label={formatMessage({
                id: 'siteManage.siteList.siteLogo',
                defaultMessage: '站点图标',
              })}
              name="logoList"
              title={formatMessage({ id: 'common.uploadPicture', defaultMessage: '上传图片' })}
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
              label={formatMessage({
                id: 'siteManage.siteList.sitePhotos',
                defaultMessage: '站点照片',
              })}
              name="photosList"
              valuePropName="fileList"
              getValueFromEvent={getValueFromEvent}
              title={formatMessage({ id: 'common.uploadPicture', defaultMessage: '上传图片' })}
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
