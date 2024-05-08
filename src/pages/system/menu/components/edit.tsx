import React, { useEffect, useState } from 'react';
import { ProFormDigit, ProFormText, ProFormRadio, ProFormTreeSelect } from '@ant-design/pro-form';
import { Form, Modal, Row, Col } from 'antd';
import { useIntl, FormattedMessage, getLocale } from 'umi';
import type { DataNode } from 'antd/lib/tree';
import type { MenuType } from '../data.d';
import IconSelector from '@/components/IconSelector';
import { createIcon } from '@/utils/IconUtil';
import { IntlProvider } from 'react-intl';
import { formatMessage } from '@/utils';

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2021/09/16
 *
 * */

export type MenuFormValueType = Record<string, unknown> & Partial<MenuType>;

export type MenuFormProps = {
  onCancel: (flag?: boolean, formVals?: MenuFormValueType) => void;
  onSubmit: (values: MenuFormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<MenuType>;
  visibleOptions: any;
  statusOptions: any;
  menuTree: DataNode[];
};

const MenuForm: React.FC<MenuFormProps> = (props) => {
  const [form] = Form.useForm();

  const [menuTypeId, setMenuTypeId] = useState<any>('');
  const [menuIconName, setMenuIconName] = useState<any>();

  const [previewModalVisible, setPreviewModalVisible] = useState<boolean>(false);

  const { menuTree, visibleOptions, statusOptions } = props;
  useEffect(() => {
    form.resetFields();
    setMenuTypeId(props.values.menuType ? props.values.menuType : 'C');
    setMenuIconName(props.values.icon);
    form.setFieldsValue({
      menuId: props.values.menuId,
      menuName: props.values.menuName,
      parentId: props.values.parentId,
      orderNum: props.values.orderNum,
      path: props.values.path,
      component: props.values.component,
      isFrame: props.values.isFrame,
      isCache: props.values.isCache,
      menuType: props.values.menuType,
      visible: props.values.visible,
      status: props.values.status,
      perms: props.values.perms,
      icon: props.values.icon,
      createBy: props.values.createBy,
      createTime: props.values.createTime,
      updateBy: props.values.updateBy,
      updateTime: props.values.updateTime,
      remark: props.values.remark,
    });
  }, [form, props]);

  const intl = useIntl();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };
  const handleFinish = async (values: Record<string, any>) => {
    props.onSubmit(values as MenuFormValueType);
  };

  return (
    <Modal
      width={680}
      title={intl.formatMessage({
        id: 'system.Menu.modify',
        defaultMessage: '编辑菜单',
      })}
      visible={props.visible}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Modal
        width={1200}
        visible={previewModalVisible}
        onCancel={() => {
          setPreviewModalVisible(false);
        }}
        footer={null}
      >
        <IntlProvider locale={getLocale()}>
          <IconSelector
            onSelect={(name: string) => {
              form.setFieldsValue({ icon: name });
              setMenuIconName(name);
              setPreviewModalVisible(false);
            }}
          />
        </IntlProvider>
      </Modal>

      <Form form={form} onFinish={handleFinish} initialValues={props.values} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={16} order={1}>
            <ProFormDigit
              name="menuId"
              label={intl.formatMessage({
                id: 'system.Menu.menu_id',
                defaultMessage: '菜单ID',
              })}
              width="xl"
              disabled
              hidden={true}
              rules={[
                {
                  required: false,
                },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} order={1}>
            <ProFormTreeSelect
              name="parentId"
              label={intl.formatMessage({
                id: 'system.Menu.parent_id',
                defaultMessage: '父菜单:',
              })}
              request={async () => {
                return menuTree;
              }}
              placeholder={formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' })}
              rules={[
                {
                  required: true,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormRadio.Group
              valueEnum={{
                M: formatMessage({ id: 'system.Menu.catalog', defaultMessage: '目录' }),
                C: formatMessage({ id: 'system.Menu.menu', defaultMessage: '菜单' }),
                F: formatMessage({ id: 'system.Menu.button', defaultMessage: '按钮' }),
              }}
              name="menuType"
              label={intl.formatMessage({
                id: 'system.Menu.menu_type',
                defaultMessage: '菜单类型',
              })}
              fieldProps={{
                onChange: (e) => {
                  setMenuTypeId(e.target.value);
                },
              }}
              initialValue="C"
              width="xl"
              rules={[
                {
                  required: false,
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="icon"
              allowClear={true}
              hidden={menuTypeId === 'F'}
              fieldProps={{
                addonAfter: createIcon(menuIconName),
                onClick: () => {
                  setPreviewModalVisible(true);
                },
              }}
              label={intl.formatMessage({
                id: 'system.Menu.icon',
                defaultMessage: '菜单图标:',
              })}
              rules={[
                {
                  required: false,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="menuName"
              label={intl.formatMessage({
                id: 'system.Menu.menu_name',
                defaultMessage: '菜单名称',
              })}
              width="xl"
              rules={[
                {
                  required: true,
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormDigit
              name="orderNum"
              label={intl.formatMessage({
                id: 'system.Menu.order_num',
                defaultMessage: '显示顺序',
              })}
              initialValue="0"
              width="xl"
              rules={[
                {
                  required: false,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormRadio.Group
              name="isFrame"
              valueEnum={{
                0: formatMessage({
                  id: 'common.yes',
                  defaultMessage: '是',
                }),
                1: formatMessage({
                  id: 'common.no',
                  defaultMessage: '否',
                }),
              }}
              initialValue="1"
              label={intl.formatMessage({
                id: 'system.Menu.is_frame',
                defaultMessage: '是否为外链',
              })}
              width="xl"
              hidden={menuTypeId === 'F'}
              rules={[
                {
                  required: false,
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="path"
              label={intl.formatMessage({
                id: 'system.Menu.path',
                defaultMessage: '路由地址',
              })}
              width="xl"
              hidden={menuTypeId === 'F'}
              rules={[
                {
                  required: menuTypeId !== 'F',
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="perms"
              label={intl.formatMessage({
                id: 'system.Menu.perms',
                defaultMessage: '权限标识',
              })}
              width="xl"
              hidden={menuTypeId === 'M'}
              rules={[
                {
                  required: false,
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormText
              name="component"
              label={intl.formatMessage({
                id: 'system.Menu.component',
                defaultMessage: '组件路径',
              })}
              width="xl"
              hidden={menuTypeId !== 'C'}
              rules={[
                {
                  required: false,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormText
              name="query"
              label={intl.formatMessage({
                id: 'system.Menu.query',
                defaultMessage: '路由参数',
              })}
              width="xl"
              hidden={menuTypeId !== 'C'}
              rules={[
                {
                  required: false,
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormRadio.Group
              name="isCache"
              valueEnum={{
                0: formatMessage({
                  id: 'system.Menu.cache',
                  defaultMessage: '缓存',
                }),
                1: formatMessage({
                  id: 'system.Menu.noCache',
                  defaultMessage: '不缓存',
                }),
              }}
              initialValue="0"
              label={intl.formatMessage({
                id: 'system.Menu.is_cache',
                defaultMessage: '是否缓存',
              })}
              width="xl"
              hidden={menuTypeId !== 'C'}
              rules={[
                {
                  required: false,
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12} order={1}>
            <ProFormRadio.Group
              valueEnum={visibleOptions}
              name="visible"
              label={intl.formatMessage({
                id: 'system.Menu.visible',
                defaultMessage: '可见状态',
              })}
              initialValue="0"
              width="xl"
              hidden={menuTypeId === 'F'}
              rules={[
                {
                  required: false,
                },
              ]}
            />
          </Col>
          <Col span={12} order={2}>
            <ProFormRadio.Group
              valueEnum={statusOptions}
              name="status"
              label={intl.formatMessage({
                id: 'system.Menu.status',
                defaultMessage: '菜单状态',
              })}
              initialValue="0"
              width="xl"
              hidden={menuTypeId === 'F'}
              rules={[
                {
                  required: false,
                },
              ]}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default MenuForm;
