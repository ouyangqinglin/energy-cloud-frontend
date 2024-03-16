import React, { useState, useMemo, useImperativeHandle, forwardRef } from 'react';
import { Tree, Input } from 'antd';
import type { TreeProps } from 'antd';
import { Modal, Row, Form, Col } from 'antd';
import { typeOption, getUniqueNumber, modeType } from '../config';
import type { ModeTreeDataNode } from '../data';
import { useIntl, useRequest } from 'umi';
import { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { getPage, getTypePage, getProductConfigType } from '../service';
import {
  DownOutlined,
  EditOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { cloneDeep, debounce } from 'lodash';
import { formatMessage } from '@/utils';
const { Search } = Input;

type ConfigTreeProps = {
  config?: ModeTreeDataNode[];
  showType: string;
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
  const { config, showType } = props;
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<(string | null)[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, setTreeData] = useState<ModeTreeDataNode[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [modelTyep, setModelTyep] = useState<string>('add');
  const { data: physicalModelOption, run } = useRequest(getPage);
  const { data: fieldOptions, run: runField } = useRequest(getTypePage, { manual: true });
  const { data: configTypeOptions } = useRequest(getProductConfigType);

  const dataList: { key: string; name: string }[] = [];
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

  const onExpand = (newExpandedKeys: string[]) => {
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
      .filter((item, i, self) => !!(item && self.indexOf(item) === i));
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
    form.validateFields().then(() => {
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
        Object.assign(treeNode, fieldConfig);
        Object.keys(treeNode).forEach((key) => {
          //编辑删除一些字段做的处理
          const hasKey = fieldConfig.hasOwnProperty(key);
          if (!hasKey && key !== 'children') delete treeNode[key as keyof typeof treeNode];
        });
      }
      form.resetFields();
      setTreeData(() => [...treeData]);
      setVisible(false);
    });
  };
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const setfieldConfig = () => {
    const { type, name, id, fieldConfig } = form.getFieldsValue();
    let newJson = {};
    try {
      newJson = { ...JSON.parse(fieldConfig), type, name, id };
    } catch {
      newJson = { type, name, id };
    }
    form.setFieldValue('fieldConfig', JSON.stringify(newJson));
  };
  const handleChange = () => {
    setfieldConfig();
  };
  const handleConfigChange = () => {
    try {
      const { type, name, id } = JSON.parse(form.getFieldValue('fieldConfig'));
      form.setFieldsValue({ type, name, id });
    } catch {}
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

  const configvalidator = (_rule: any, value: string) => {
    try {
      const { id, name, type } = JSON.parse(value);
      if (!id) return Promise.reject('id is required!');
      if (!name) return Promise.reject('name is required!');
      if (!type) return Promise.reject('type is required!');
      return Promise.resolve();
    } catch (err) {
      return Promise.reject('json format error!');
    }
  };

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
        draggable={showType !== 'check'}
        selectable={false}
        onDrop={onDrop}
        fieldNames={{ title: 'name' }}
        titleRender={(nodeData: ModeTreeDataNode) => (
          <>
            {nodeData?.modelName ? `${nodeData.name}(${nodeData?.modelName})` : nodeData.name}
            {showType !== 'check' ? (
              <>
                <EditOutlined style={{ marginLeft: '20px' }} onClick={() => editTree(nodeData)} />
                <PlusCircleOutlined
                  style={{ marginLeft: '10px' }}
                  onClick={() => addTree(nodeData)}
                />
                {nodeData.id !== 'runningData' ? (
                  <MinusCircleOutlined
                    style={{ marginLeft: '10px' }}
                    onClick={() => deleteTree(nodeData)}
                  />
                ) : (
                  ''
                )}
              </>
            ) : (
              ''
            )}
          </>
        )}
      />
      <Modal
        width={1000}
        title={
          modelTyep == 'add'
            ? formatMessage({ id: 'common.add', defaultMessage: '新增' })
            : formatMessage({ id: 'common.edit', defaultMessage: '编辑' })
        }
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
                label={formatMessage({
                  id: 'physicalModel.name',
                  defaultMessage: '物模型名称',
                })}
                placeholder={formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' })}
              />
            </Col>
            <Col span={8} order={1}>
              <ProFormSelect
                options={typeOption}
                width="xl"
                name="type"
                label={intl.formatMessage({
                  id: 'pageTemplate.classification',
                  defaultMessage: '分类',
                })}
                onChange={handTypeChange}
                placeholder={formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' })}
              />
            </Col>
            <Col span={8} order={1}>
              <ProFormSelect
                fieldProps={{
                  showSearch: true,
                  onSearch: fieldSearch,
                  fieldNames: { label: 'name', value: 'id' },
                  options: fieldOptions || [],
                  optionItemRender(item) {
                    return `${item.label}（${modeType[item.type as keyof typeof modeType]?.text}）`;
                  },
                }}
                width="xl"
                name="id"
                label={formatMessage({
                  id: 'physicalModel.field',
                  defaultMessage: '字段',
                })}
                onChange={handleFieldChange}
                placeholder={formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' })}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8} order={1}>
              <ProFormText
                name="name"
                label={intl.formatMessage({
                  id: 'physicalModel.fieldName',
                  defaultMessage: '字段名称',
                })}
                onChange={handleChange}
                width="xl"
                placeholder={formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' })}
              />
            </Col>
            <Col span={8} order={1}>
              <ProFormText
                name="id"
                label="id"
                onChange={handleChange}
                width="xl"
                placeholder={formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' })}
              />
            </Col>
            <Col span={8} order={1}>
              <ProFormSelect
                fieldProps={{
                  showSearch: true,
                  onSearch: fieldSearch,
                  fieldNames: { label: 'description', value: 'productConfigType' },
                  options: configTypeOptions || [],
                }}
                width="xl"
                name="type"
                label={formatMessage({
                  id: 'physicalModel.type',
                  defaultMessage: '类型',
                })}
                onChange={handleChange}
                placeholder={formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' })}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24} order={1}>
              <ProFormTextArea
                name="fieldConfig"
                label={intl.formatMessage({
                  id: 'physicalModel.fieldConfig',
                  defaultMessage: '配置',
                })}
                onChange={handleConfigChange}
                width="xl"
                placeholder={formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' })}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }),
                  },
                  {
                    validator: configvalidator,
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
