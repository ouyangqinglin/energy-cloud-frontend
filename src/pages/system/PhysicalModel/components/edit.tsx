import React, { useEffect, useRef, useState } from 'react';
import { ProFormText } from '@ant-design/pro-form';
import { Form, Modal, Row, Col, Tabs } from 'antd';
import { useIntl } from 'umi';
import { formatMessage } from '@/utils';
import type { ProColumnType, ActionType } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import YTProTable from '@/components/YTProTable';
import { getTypeColumns, tabsItem, typeObj } from '../config';
import type {
  PhysicalModelType,
  PhysicalModelFormType,
  ThingsConfigType,
  FieldFormType,
} from '../data';
import { Button, message } from 'antd';
import TypeEdit from './typeEdit';
import { cloneDeep } from 'lodash';
import { getDetail } from '../service';

const initThingsConfig = {
  properties: [],
  events: [],
  services: [],
};

export type MenuFormProps = {
  onCancel: () => void;
  onSubmit: (values: PhysicalModelFormType) => Promise<void>;
  visible: boolean;
  values: Partial<PhysicalModelType>;
  showType: 'edit' | 'add' | 'check';
};
const PhysicalModelForm: React.FC<MenuFormProps> = (props) => {
  const { showType, visible, values } = props;
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [type, setType] = useState<string>();
  const [currentRow, setCurrentRow] = useState<Partial<FieldFormType>>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [existItem, setExistItem] = useState<any[]>([]);
  const [version, setVersion] = useState(0);

  const [thingsConfig, setThingsConfig] = useState<ThingsConfigType>(cloneDeep(initThingsConfig));
  const handleThingsConfig = (data: ThingsConfigType): ThingsConfigType => {
    const result: ThingsConfigType = cloneDeep(initThingsConfig);
    Object.keys(data).forEach((key) => {
      const item = data[key as keyof typeof data].map((i: any) => {
        i.json = JSON.stringify(i);
        return i;
      });
      result[key as keyof typeof result] = item;
    });
    return result;
  };
  const getDetailData = async (id: number) => {
    const { data, code } = await getDetail({ id });
    if (code == 200) {
      form.setFieldsValue({
        name: data.name,
        remark: data.remark,
      });
      setThingsConfig(handleThingsConfig(data.thingsConfig));
      setType('property');
      setVersion(data.version);
    }
  };
  /*
   *@Author: aoshilin
   *@Date: 2024-01-24 16:03:01
   *@parms: key
   *@Description: tab切换
   */
  const tabChange = (key: string) => {
    setType(key);
  };
  useEffect(() => {
    if (values?.id) {
      getDetailData(values?.id);
    }
  }, [values]);

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
  const handleAdd = async (fields: FieldFormType) => {
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
  const handleUpdate = async (fields: FieldFormType) => {
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
      setThingsConfig(cloneDeep(initThingsConfig));
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
  const handleFinish = async (value: PhysicalModelFormType) => {
    const formData = value;
    formData.thingsConfig = thingsConfig;
    if (showType == 'edit') {
      formData.id = values.id;
      formData.version = version;
    }
    props.onSubmit(formData);
  };
  const handleRemoveOne = (record: FieldFormType) => {
    const cloneThingsConfig = cloneDeep(thingsConfig);
    const key = typeObj[type as keyof typeof typeObj];
    const index = cloneThingsConfig[key as keyof typeof cloneThingsConfig].findIndex(
      (item) => item.id == record.id,
    );
    cloneThingsConfig[key as keyof typeof cloneThingsConfig].splice(index, 1);
    setThingsConfig(cloneThingsConfig);
    return true;
  };
  const operationColumn: ProColumnType = {
    title: formatMessage({ id: 'pages.searchTable.titleOption', defaultMessage: '操作' }),
    dataIndex: 'option',
    width: '220px',
    valueType: 'option',
    render: (_, record) => {
      const rowData = record as FieldFormType;
      return [
        <Button
          type="link"
          size="small"
          key="edit"
          hidden={showType == 'check'}
          onClick={() => {
            setModalVisible(true);
            setCurrentRow({ ...rowData, oldId: rowData.id });
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
                const success = await handleRemoveOne(rowData);
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
      ];
    },
  };
  const typeColumns = getTypeColumns(operationColumn);

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
              disabled={showType == 'check'}
              name="name"
              label={intl.formatMessage({
                id: 'physicalModel.name',
                defaultMessage: '物模型名称',
              })}
              width="xl"
              placeholder={formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="remark"
              disabled={showType == 'check'}
              label={intl.formatMessage({
                id: 'physicalModel.remark',
                defaultMessage: '备注',
              })}
              width="xl"
              placeholder={formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' })}
              rules={[
                {
                  required: false,
                  message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
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
                    setCurrentRow({});
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
            success = await handleUpdate({ ...value });
          } else {
            success = await handleAdd({ ...value });
          }
          if (success) {
            setModalVisible(false);
            setCurrentRow({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setModalVisible(false);
          setCurrentRow({});
        }}
        type={type}
        existItem={existItem}
        visible={modalVisible}
        values={currentRow}
      />
    </Modal>
  );
};

export default PhysicalModelForm;
