import React, { useState, useMemo, useImperativeHandle, forwardRef } from 'react';
import { Tree, Input } from 'antd';
import type { TreeProps } from 'antd';
import { Modal, Row, Form, Col } from 'antd';
import { typeOption, getUniqueNumber } from '../config';
import type { ModeTreeDataNode } from '../data';
import { useIntl, useRequest, FormattedMessage } from 'umi';
import { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { getPage, getTypePage } from '../service';
import {
  DownOutlined,
  EditOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { cloneDeep, debounce } from 'lodash';
const { Search } = Input;

type ConfigTreeProps = {
  config?: ModeTreeDataNode[];
};

const getName = (name: any): string => {
  return name?.props?.children[2] || name?.props?.children || name || '';
};

function removeItemFromTree(itemId: string, tree: ModeTreeDataNode[]) {
  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    if (item.key === itemId) {
      tree.splice(i, 1); // 从数组中移除项
      return true; // 返回true表示成功删除
    }
    if (item.children && item.children.length > 0) {
      const childRemoved = removeItemFromTree(itemId, item.children); // 递归处理子项
      if (childRemoved) {
        return true; // 如果子项删除成功，则停止递归并返回true
      }
    }
  }
  return false; // 如果没有找到指定项，则返回false
}

const handleConfig = (data: any[], parentId: string) => {
  return data.map((item, index) => {
    item.name = getName(item.name);
    item.sortOrder = index;
    item.parentId = parentId;
    item.disabled = item.enable;
    delete item.enable;
    if (!parentId) item.type = 'page';
    if (item.children && item.children.length > 0) {
      item.children = handleConfig(item.children, item.id);
    }
    return item;
  });
};

const getParentKey = (key: string, tree: ModeTreeDataNode[]): string => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};
let treeNode: ModeTreeDataNode;

const ConfigTree = forwardRef((props: ConfigTreeProps, ref) => {
  const intl = useIntl();
  const { config } = props;
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, setTreeData] = useState<ModeTreeDataNode[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [modelTyep, setModelTyep] = useState<string>('add');
  const { data: physicalModelOption, run } = useRequest(getPage);
  const { data: fieldOptions, run: runField } = useRequest(getTypePage, { manual: true });

  const dataList: { key: React.Key; name: string }[] = [];
  const generateList = (data: ModeTreeDataNode[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key, name } = node;
      dataList.push({ key, name: name as string });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(treeData);

  useMemo(() => {
    if (config) {
      generateList(config);
      setTreeData(() => config);
    }
  }, [config]);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const treeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (getName(item.name).indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self): item => !!(item && self.indexOf(item) === i));
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(true);
  };
  /*
   *@Author: aoshilin
   *@Date: 2024-01-26 16:44:46
   *@parms:
   *@Description: 拖动tree更新数据
   */
  const onDrop: TreeProps['onDrop'] = (info: any) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const loop = (
      data: ModeTreeDataNode[],
      key: React.Key,
      callback: (node: ModeTreeDataNode, i: number, data: ModeTreeDataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...treeData];

    let dragObj: ModeTreeDataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: ModeTreeDataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setTreeData(() => data);
  };
  const editTree = (nodeData: ModeTreeDataNode) => {
    setModelTyep('edit');
    const cloneNodeData = cloneDeep(nodeData);
    cloneNodeData.name = getName(nodeData.name);
    cloneNodeData.disabled = cloneNodeData.enable;
    delete cloneNodeData.enable;
    delete cloneNodeData.children;
    const fieldConfig = JSON.stringify(cloneNodeData);
    form.setFieldsValue({ fieldConfig });
    treeNode = nodeData;
    setVisible(true);
  };
  const deleteTree = (nodeData: ModeTreeDataNode) => {
    Modal.confirm({
      title: '删除',
      content: '确定删除该项吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        removeItemFromTree(nodeData.key, treeData);
        setTreeData(() => [...treeData]);
      },
    });
  };
  const addTree = (nodeData: ModeTreeDataNode) => {
    setModelTyep('add');
    treeNode = nodeData;
    setVisible(true);
  };
  const handleOk = () => {
    const fieldConfig = JSON.parse(form.getFieldValue('fieldConfig'));
    if (fieldConfig.hasOwnProperty('disabled')) {
      fieldConfig.enable = fieldConfig.disabled;
      delete fieldConfig.disabled;
    }
    if (modelTyep == 'add') {
      //新增
      if (!treeNode.children) {
        treeNode.children = [];
      }
      // eslint-disable-next-line react-hooks/rules-of-hooks
      fieldConfig.key = getUniqueNumber();
      treeNode.children.push(fieldConfig);
    } else {
      //编辑
      Object.keys(treeNode).forEach((key) => {
        delete treeNode[key];
      });
      Object.keys(fieldConfig).forEach((key) => {
        treeNode[key] = fieldConfig[key];
      });
    }
    form.resetFields();
    setTreeData(() => [...treeData]);
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const setfieldConfig = () => {
    const { type, name, id } = form.getFieldsValue();
    form.setFieldValue('fieldConfig', JSON.stringify({ type, name, id }));
  };
  const handleNameChange = () => {
    setfieldConfig();
  };

  const handlephysicalModelChange = (thingModelId: any) => {
    form.setFieldsValue({
      id: '',
    });
    const type = form.getFieldValue('type');
    if (type) {
      runField({ thingModelId, type });
    }
  };
  const handleFieldChange = (id: string) => {
    const selectedOption = fieldOptions.find((option: ModeTreeDataNode) => option.id === id);
    form.setFieldsValue({ name: selectedOption.name });
    setfieldConfig();
  };
  const handTypeChange = (type: any) => {
    form.setFieldsValue({
      id: '',
    });
    const thingModelId = form.getFieldValue('thingModelId');
    runField({ type, thingModelId });
    setfieldConfig();
  };

  const physicalModeSearch = debounce((value: any) => {
    run({ name: value });
  }, 700);
  const fieldSearch = debounce((name: any) => {
    const { type, thingModelId } = form.getFieldsValue();
    runField({ name, type, thingModelId });
  }, 700);

  const getTreeData = () => {
    return handleConfig(cloneDeep(treeData), '');
  };
  useImperativeHandle(ref, () => ({
    getTreeData,
  }));

  return (
    <>
      <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={treeSearch} />
      <Tree
        showLine
        switcherIcon={<DownOutlined />}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        draggable
        selectable={false}
        onDrop={onDrop}
        fieldNames={{ title: 'name' }}
        titleRender={(nodeData: ModeTreeDataNode) => (
          <>
            {nodeData?.modelName ? `${nodeData.name}(${nodeData?.modelName})` : nodeData.name}
            <EditOutlined style={{ marginLeft: '20px' }} onClick={() => editTree(nodeData)} />
            <PlusCircleOutlined style={{ marginLeft: '10px' }} onClick={() => addTree(nodeData)} />
            {nodeData.id !== 'runningData' ? (
              <MinusCircleOutlined
                style={{ marginLeft: '10px' }}
                onClick={() => deleteTree(nodeData)}
              />
            ) : (
              ''
            )}
          </>
        )}
      />
      <Modal
        width={1000}
        title={modelTyep == 'add' ? '新增' : '编辑'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={8} order={1}>
              <ProFormSelect
                width="xl"
                name="thingModelId"
                fieldProps={{
                  showSearch: true,
                  onSearch: physicalModeSearch,
                  fieldNames: { label: 'name', value: 'id' },
                  options: physicalModelOption?.list || [],
                }}
                onChange={handlephysicalModelChange}
                label={intl.formatMessage({
                  id: 'physicalModel.name',
                  defaultMessage: '关联物模型',
                })}
                placeholder="请选择关联物模型"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="请选择关联物模型！"
                        defaultMessage="请选择关联物模型！"
                      />
                    ),
                  },
                ]}
              />
            </Col>
            <Col span={8} order={1}>
              <ProFormSelect
                options={typeOption}
                width="xl"
                name="type"
                label={intl.formatMessage({
                  id: 'pageTemplate.type',
                  defaultMessage: '分类',
                })}
                onChange={handTypeChange}
                placeholder="请选择分类"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="请选择分类！" defaultMessage="请选择分类！" />,
                  },
                ]}
              />
            </Col>
            <Col span={8} order={1}>
              <ProFormSelect
                fieldProps={{
                  showSearch: true,
                  onSearch: fieldSearch,
                  fieldNames: { label: 'name', value: 'id' },
                  options: fieldOptions || [],
                }}
                width="xl"
                name="id"
                label={intl.formatMessage({
                  id: 'pageTemplate.field',
                  defaultMessage: '字段',
                })}
                onChange={handleFieldChange}
                placeholder="请选择字段"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="请选择字段！" defaultMessage="请选择字段！" />,
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24} order={1}>
              <ProFormText
                name="name"
                label={intl.formatMessage({
                  id: 'physicalModel.fieldName',
                  defaultMessage: '字段名称',
                })}
                onChange={handleNameChange}
                width="xl"
                placeholder="请输入字段名称"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="请输入字段名称！" defaultMessage="请输入字段名称！" />
                    ),
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24} order={1}>
              <ProFormTextArea
                name="fieldConfig"
                label={intl.formatMessage({
                  id: 'pageTemplate.fieldConfig',
                  defaultMessage: '配置',
                })}
                width="xl"
                placeholder="请输入配置"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="请输入配置！" defaultMessage="请输入配置！" />,
                  },
                ]}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
});

export default ConfigTree;
