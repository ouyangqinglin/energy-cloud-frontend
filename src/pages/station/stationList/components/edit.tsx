/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 16:39:45
 * @LastEditTime: 2023-05-04 19:00:00
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\components\edit.tsx
 */
import React from 'react';
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
import PointSelect from '@/components/PointSelect';

const StationForm: React.FC = () => {
  const [form] = Form.useForm<StationFormType>();

  return (
    <>
      <ModalForm<StationFormType>
        form={form}
        title="创建站点"
        layout="horizontal"
        labelCol={{ flex: '86px' }}
        trigger={
          <Button type="primary" key="add">
            <PlusOutlined />
            新建站点
          </Button>
        }
        autoFocusFirstInput
        onFinish={(data) =>
          addData(data).then((res) => {
            if (res) {
              message.success('新增成功');
              return true;
            } else {
              return false;
            }
          })
        }
      >
        <ProFormText
          label="站点名称"
          name="name"
          placeholder="请输入"
          rules={[{ required: true, message: '站点名称必填' }]}
        ></ProFormText>
        <Form.Item label="位置" name="addr">
          <PointSelect></PointSelect>
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
