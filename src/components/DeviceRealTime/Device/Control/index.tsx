/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-10 10:38:13
 * @LastEditTime: 2023-08-11 13:55:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Device\Control\index.tsx
 */
import React, { useCallback, useMemo, useRef, useState, createRef, RefObject } from 'react';
import { useRequest } from 'umi';
import { Button, Col, Form, Input, Row, Select, SelectProps, Tabs, TabsProps, message } from 'antd';
import Detail from '@/components/Detail';
import { DeviceModelDataType, DeviceServiceModelType } from '@/types/device';
import { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import SchemaForm from '@/components/SchemaForm';
import { DeviceModelTypeEnum } from '@/utils/dictionary';
import styles from './index.less';
import { editSetting } from '@/services/equipment';
import { isEmpty } from 'lodash';

export type ControlProps = {
  deviceId: string;
  groupData?: DeviceModelDataType;
};

type FormInfo = {
  [key: string]: RefObject<ProFormInstance>;
};

const Control: React.FC<ControlProps> = (props) => {
  const { deviceId, groupData } = props;

  const formsRef = useRef<FormInfo>({});
  const schamaFormsRef = useRef<FormInfo>({});
  const [disableBtns, setDisableBtns] = useState<Record<string, boolean>>({});
  const { loading, run } = useRequest(editSetting, {
    manual: true,
  });

  const onSwtichFormChange = useCallback(
    (formData, name?: string) => {
      const keys = Object.keys(formData);
      if (keys && keys.length) {
        run({ deviceId, serviceId: keys[0] }).then((data) => {
          if (data) {
            message.success('操作成功');
            schamaFormsRef.current?.[name || '']?.current?.setFieldValue(keys[0], false);
          }
        });
      }
    },
    [deviceId],
  );

  const onFormChange = useCallback((key?: string) => {
    setDisableBtns((prevData) => ({ ...prevData, [key || '']: false }));
  }, []);

  const onPushClick = useCallback((key?: string) => {
    const form = formsRef.current?.[key || ''];
    const result = form.current?.getFieldsValue?.();
    if (!isEmpty(result)) {
      run({ deviceId, serviceId: key, input: result }).then((data) => {
        if (data) {
          message.success('操作成功');
          setDisableBtns((prevData) => ({ ...prevData, [key || '']: true }));
        }
      });
    }
  }, []);

  const onRef = useCallback((value, ref) => {
    schamaFormsRef.current = { ...schamaFormsRef.current, [value]: ref };
  }, []);

  const getColumns = useCallback((data: DeviceServiceModelType[], index?: number[]) => {
    // 循环生成表单
    const formItems: React.ReactNode[] = [];
    const tabItems: TabsProps['items'] = [];
    data?.forEach?.((item) => {
      if (
        item?.dataType?.type === DeviceModelTypeEnum.Struct ||
        item?.dataType?.type === DeviceModelTypeEnum.Array
      ) {
        const result = getColumns(item?.dataType?.specs || [], [0]);
        tabItems.push({
          key: item?.id || '',
          label: item?.name,
          children: (
            <>
              <Form.List name={item?.id || ''}>
                {() => [
                  <>
                    <Row gutter={24}>{result.formItems}</Row>
                    {result.tabs}
                  </>,
                ]}
              </Form.List>
            </>
          ),
        });
      } else {
        let field: React.ReactNode;
        let options: SelectProps['options'] = [];
        switch (item?.dataType?.type) {
          case DeviceModelTypeEnum.Boolean:
          case DeviceModelTypeEnum.Enum:
            try {
              const keys: string[] = Object.keys(item?.dataType?.specs || {});
              options =
                keys?.map?.((key) => {
                  return {
                    label: item?.dataType?.specs?.[key],
                    value: key,
                  };
                }) || [];
            } catch {
              options = [];
            }
            field = <Select options={options} />;
            break;
          default:
            field = <Input placeholder="请输入" />;
            break;
        }
        formItems.push(
          <Col span={8}>
            <Form.Item
              name={[...(index || []), item?.id || '']}
              label={item?.name}
              style={{ maxWidth: '350px' }}
              labelAlign="left"
              labelCol={{ flex: '130px' }}
            >
              {field}
            </Form.Item>
          </Col>,
        );
      }
    });
    return {
      formItems,
      tabs: tabItems.length ? (
        <Tabs
          items={tabItems}
          className={!formItems.length && tabItems.length == 1 && styles.hideTab}
        />
      ) : (
        <></>
      ),
    };
  }, []);

  const groups = useMemo(() => {
    return groupData?.services?.map?.((item) => {
      const switchColumns: ProFormColumnsType[] = [];
      const tabItems: TabsProps['items'] = [];
      item?.services?.forEach?.((form) => {
        if (form?.outputData && form?.outputData?.length) {
          const result = getColumns(form?.outputData);
          const formRef = createRef<ProFormInstance>();
          formsRef.current = { ...formsRef.current, [form?.id || '']: formRef };
          tabItems.push({
            key: form?.id || '',
            label: form?.name,
            children: (
              <>
                <Button
                  className={styles.btn}
                  type="primary"
                  loading={loading}
                  disabled={
                    disableBtns?.[form?.id || ''] === undefined ||
                    disableBtns?.[form?.id || ''] === true
                  }
                  onClick={() => onPushClick(form?.id)}
                >
                  下发参数
                </Button>
                <Form
                  ref={formRef}
                  layout="horizontal"
                  onValuesChange={() => onFormChange(form?.id)}
                >
                  <Row gutter={24}>{result.formItems}</Row>
                  {result.tabs}
                </Form>
              </>
            ),
          });
        } else {
          switchColumns.push({
            title: form?.name,
            dataIndex: form?.id,
            valueType: 'switch',
            fieldProps: {
              loading,
            },
          });
        }
      });
      return (
        <>
          <div className="mb8">
            <Detail.Label title={item.groupName} />
            <SchemaForm
              columns={switchColumns}
              layout="horizontal"
              layoutType="Form"
              labelAlign="left"
              labelCol={{ flex: '130px' }}
              submitter={false}
              onValuesChange={(data) => onSwtichFormChange(data, item.groupName)}
              autoFocusFirstInput={false}
              grid={true}
              colProps={{
                span: 8,
              }}
              onRef={(ref) => onRef(item.groupName, ref)}
            />
            <Tabs
              className={styles.formTab}
              items={tabItems}
              tabBarExtraContent={<div style={{ width: '100px' }}></div>}
            />
          </div>
        </>
      );
    });
  }, [groupData, loading, onSwtichFormChange, disableBtns]);

  return <>{groups}</>;
};

export default Control;
