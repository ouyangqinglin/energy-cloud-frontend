/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 16:39:45
 * @LastEditTime: 2023-05-05 17:53:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\components\edit.tsx
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, message, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { StationFormType } from '../data.d';
import { addData } from '../service';
import PositionSelect from '@/components/PositionSelect';

type StationFOrmProps = {
  values?: StationFormType;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const StationForm: React.FC<StationFOrmProps> = (props) => {
  const [form] = Form.useForm<StationFormType>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.open) {
      form.resetFields();
      if (props.values) {
        form.setFieldsValue(props.values);
      }
      setShow(true);
    }
  }, [props.open]);

  return (
    <>
      <ModalForm<StationFormType>
        visible={props.open}
        form={form}
        title="创建站点"
        layout="horizontal"
        labelCol={{ flex: '86px' }}
        autoFocusFirstInput
        onFinish={(data) =>
          addData({ ...data, id: props.values?.id }).then((res) => {
            if (res) {
              message.success('新增成功');
              return true;
            } else {
              return false;
            }
          })
        }
        onVisibleChange={props.onOpenChange}
      >
        <ProFormText
          label="站点名称"
          name="name"
          placeholder="请输入"
          rules={[{ required: true, message: '站点名称必填' }]}
        ></ProFormText>
        <Form.Item label="位置" name="addr" rules={[{ required: true, message: '位置必填' }]}>
          {show && <PositionSelect></PositionSelect>}
        </Form.Item>
        <Row gutter={20}>
          <Col span={12}>
            <ProFormUploadButton
              label="站点图标"
              name="icon"
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
          </Col>
          <Col span={12}>
            <ProFormUploadButton
              label="站点照片"
              name="img"
              max={1}
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
              }}
              icon={
                <div>
                  <PlusOutlined />
                </div>
              }
              title="上传图片"
            ></ProFormUploadButton>
          </Col>
        </Row>
        <ProFormTextArea label="备注" name="remark" placeholder="请输入"></ProFormTextArea>
      </ModalForm>
    </>
  );
};

export default StationForm;
