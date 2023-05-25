/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 16:39:45
 * @LastEditTime: 2023-05-24 15:06:20
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
import TableSelect from '@/components/TableSelect';
import type { ProColumns } from '@ant-design/pro-table';
import { getAgent } from '@/services/agent';

type StationFOrmProps = {
  values?: StationFormType;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type AgentType = {
  id: string;
  name: string;
};

const StationForm: React.FC<StationFOrmProps> = (props) => {
  const [form] = Form.useForm<StationFormType>();
  const [show, setShow] = useState(false);

  const [agent, setAgent] = useState([]);

  const requestTable = (params: Record<string, any>) => {
    return getAgent(params).then(({ data }) => {
      return {
        data: data?.list,
        total: data?.total,
        success: true,
      };
    });
  };

  const columns: ProColumns<AgentType>[] = [
    {
      title: '代理商ID',
      dataIndex: 'id',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '代理商名称',
      dataIndex: 'name',
      width: 200,
      ellipsis: true,
    },
  ];

  useEffect(() => {
    if (props.open) {
      form.resetFields();
      form.setFieldValue('agent', agent);
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
        <Form.Item label="代理商" name="agent">
          <TableSelect proTableProps={{ columns, request: requestTable }} />
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
