import React, { useEffect, useRef, useState } from 'react';
import { ProFormText } from '@ant-design/pro-form';
import { Form, Modal, Row, Col, Tabs } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { formatMessage } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/lib/tree';
import type { MenuType } from '../config';
import YTProTable from '@/components/YTProTable';
import { getTypeColumns, tabsItem, typeObj } from '../config';
import type { PhysicalModelType } from '../config';
import { Button, message } from 'antd';
import TypeEdit from './typeEdit';
import { cloneDeep } from 'lodash';
import { getDetail } from '../service';

export type MenuFormValueType = Record<string, unknown> & Partial<MenuType>;
export type MenuFormProps = {
  onCancel: (flag?: boolean, formVals?: MenuFormValueType) => void;
  onSubmit: (values: MenuFormValueType) => Promise<void>;
  visible: boolean;
  values: any;
  visibleOptions: any;
  statusOptions: any;
  menuTree: DataNode[];
  showType: string;
};
export type ThingsConfig = {
  properties: any[];
  events: any[];
  services: any[];
};
const initThingsConfig = {
  properties: [],
  events: [],
  services: [],
};

const MenuForm: React.FC<MenuFormProps> = (props) => {
  const { showType, visible } = props;
  const actionRef = useRef();
  const [form] = Form.useForm();
  const [type, setType] = useState<string>('property');
  const [currentRow, setCurrentRow] = useState<PhysicalModelType>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [existItem, setExistItem] = useState<any[]>([]);
  const [thingsConfig, setThingsConfig] = useState<ThingsConfig>(initThingsConfig);
  const handleThingsConfig = (data: any) => {
    const result = {};
    Object.keys(data).forEach((key) => {
      const item = data[key].map((i) => {
        i.json = JSON.stringify(i);
        return i;
      });
      result[key] = item;
    });
    return result;
  };
  const getDetailData = async (id: any) => {
    const { data, code } = await getDetail({ id });
    if (code == 200) {
      form.setFieldsValue({
        name: data.name,
        remark: data.remark,
      });
      setThingsConfig(() => handleThingsConfig(data.thingsConfig));
    }
  };
  useEffect(() => {
    if (props.values.id) {
      getDetailData(props.values.id);
    }
  }, [props]);

  /*
   *@Author: aoshilin
   *@Date: 2024-01-24 16:03:01
   *@parms: key
   *@Description: tab切换
   */
  const tabChange = (key: string) => {
    setType(key);
  };

  /*
   *@Author: aoshilin
   *@Date: 2024-01-25 14:33:27
   *@parms:
   *@Description: 根据tabs和类型值变化修改表格数据
   */
  useEffect(() => {
    setDataSource(() => {
      if (type == 'property') return thingsConfig.properties;
      if (type == 'event') return thingsConfig.events;
      if (type == 'service') return thingsConfig.services;
      return [];
    });
  }, [type, thingsConfig]);

  useEffect(() => {
    setExistItem(() => dataSource.map((item) => item.id));
  }, [dataSource]);
  /**
   * 添加节点
   *
   * @param fields
   */
  const handleAdd = async (fields: MenuType) => {
    const hide = message.loading('正在添加');
    try {
      setThingsConfig(() => {
        const cloneThingsConfig = cloneDeep(thingsConfig);
        if (type == 'property') cloneThingsConfig.properties.push(fields);
        if (type == 'event') cloneThingsConfig.events.push(fields);
        if (type == 'service') cloneThingsConfig.services.push(fields);
        return cloneThingsConfig;
      });
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };
  /**
   * 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: MenuType) => {
    const hide = message.loading('正在编辑');
    try {
      setThingsConfig(() => {
        const cloneThingsConfig = cloneDeep(thingsConfig);
        if (type == 'property') {
          const index = cloneThingsConfig.properties.findIndex((item) => item.id == fields.oldId);
          index >= 0 && cloneThingsConfig.properties.splice(index, 1, fields);
        }
        if (type == 'event') {
          const index = cloneThingsConfig.events.findIndex((item) => item.id == fields.oldId);
          index >= 0 && cloneThingsConfig.events.splice(index, 1, fields);
        }
        if (type == 'service') {
          const index = cloneThingsConfig.services.findIndex((item) => item.id == fields.oldId);
          index >= 0 && cloneThingsConfig.services.splice(index, 1, fields);
        }
        return cloneThingsConfig;
      });
      hide();
      message.success('编辑成功');
      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
      return false;
    }
  };

  useEffect(() => {
    if (visible) {
      form.resetFields();
      setThingsConfig(initThingsConfig);
    }
  }, [form, visible]);

  const intl = useIntl();

  const handleCancel = () => {
    props.onCancel();
  };
  const handleOk = () => {
    if (showType === 'check') {
      handleCancel();
      return;
    }
    form.submit();
  };
  const handleFinish = async (value: Record<string, any>) => {
    const formData = value;
    formData.thingsConfig = thingsConfig;
    if (showType == 'edit') formData.id = props.values.id;
    props.onSubmit(formData as MenuFormValueType);
  };
  const handleRemoveOne = (record: object) => {
    const cloneThingsConfig = cloneDeep(thingsConfig);
    const key = typeObj[type];
    const index = cloneThingsConfig[key].findIndex((item) => item.id == record.id);
    cloneThingsConfig[key].splice(index, 1);
    setThingsConfig(cloneThingsConfig);
    return true;
  };
  const actionColumn: ProColumns<PhysicalModelType> = {
    title: formatMessage({ id: 'pages.searchTable.titleOption', defaultMessage: '操作' }),
    dataIndex: 'option',
    width: '220px',
    valueType: 'option',
    render: (_, record) => [
      <Button
        type="link"
        size="small"
        key="edit"
        hidden={showType == 'check'}
        onClick={() => {
          setModalVisible(true);
          setCurrentRow(() => {
            return { ...record, oldId: record.id };
          });
        }}
      >
        {formatMessage({ id: 'pages.searchTable.edit', defaultMessage: '编辑' })}
      </Button>,
      <Button
        type="link"
        size="small"
        danger
        hidden={showType == 'check'}
        key="batchRemove"
        onClick={async () => {
          Modal.confirm({
            title: '删除',
            content: '确定删除该项吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
              const success = await handleRemoveOne(record);
              if (success) {
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            },
          });
        }}
      >
        {formatMessage({ id: 'pages.searchTable.delete', defaultMessage: '删除' })}
      </Button>,
    ],
  };
  const typeColumns = getTypeColumns(actionColumn);

  return (
    <Modal
      width={1000}
      title={intl.formatMessage({
        id: 'physicalModel',
        defaultMessage: `${
          showType == 'add' ? '新增' : showType == 'edit' ? '编辑' : '查看'
        }物模型`,
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="name"
              label={intl.formatMessage({
                id: 'physicalModel.name',
                defaultMessage: '物模型名称',
              })}
              width="xl"
              placeholder="请输入物模型名称"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="请输入物模型名称！" defaultMessage="请输入物模型名称！" />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="remark"
              label={intl.formatMessage({
                id: 'physicalModel.remark',
                defaultMessage: '备注',
              })}
              width="xl"
              placeholder="请输入备注"
              rules={[
                {
                  required: false,
                  message: <FormattedMessage id="请输入备注！" defaultMessage="请输入备注！" />,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Tabs defaultActiveKey="1" items={tabsItem} onChange={tabChange} />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <YTProTable
              actionRef={actionRef}
              search={false}
              columns={typeColumns}
              dataSource={dataSource}
              toolBarRender={() => [
                <Button
                  type="primary"
                  key="add"
                  hidden={showType == 'check'}
                  onClick={async () => {
                    setCurrentRow(undefined);
                    setModalVisible(true);
                  }}
                >
                  <PlusOutlined />{' '}
                  {formatMessage({ id: 'pages.searchTable.new', defaultMessage: '新建' })}
                </Button>,
              ]}
            />
          </Col>
        </Row>
      </Form>
      <TypeEdit
        onSubmit={async (value) => {
          let success = false;
          if (value.oldId) {
            success = await handleUpdate({ ...value } as MenuType);
          } else {
            success = await handleAdd({ ...value } as MenuType);
          }
          if (success) {
            setModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setModalVisible(false);
          setCurrentRow(undefined);
        }}
        type={type}
        existItem={existItem}
        visible={modalVisible}
        values={currentRow || {}}
      />
    </Modal>
  );
};

export default MenuForm;
