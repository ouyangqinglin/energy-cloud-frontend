/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-10 10:38:13
 * @LastEditTime: 2023-12-25 14:45:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Device\Control\index.tsx
 */
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  createRef,
  RefObject,
  useEffect,
} from 'react';
import { useRequest } from 'umi';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  SelectProps,
  Tabs,
  TabsProps,
  TimePicker,
  message,
} from 'antd';
import Detail from '@/components/Detail';
import { DeviceModelDataType, DeviceModelType, DeviceServiceModelType } from '@/types/device';
import { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import SchemaForm from '@/components/SchemaForm';
import { DeviceModelTypeEnum, formatMessage } from '@/utils';
import styles from './index.less';
import { DeviceDataType, editSetting } from '@/services/equipment';
import { isEmpty, merge } from 'lodash';
import moment from 'moment';
import { OnlineStatusEnum } from '@/utils/dictionary';

export type ControlProps = {
  deviceId?: string;
  deviceData?: DeviceDataType;
  groupData?: DeviceModelDataType;
  realTimeData?: Record<string, any>;
};

type FormInfo = {
  [key: string]: RefObject<ProFormInstance>;
};

const TimeRangeFormat = 'HH:mm';

const Control: React.FC<ControlProps> = (props) => {
  const { deviceId, deviceData, groupData, realTimeData } = props;

  const formsRef = useRef<FormInfo>({});
  const schamaFormsRef = useRef<FormInfo>({});
  const serviceModelMapRef = useRef<Record<string, DeviceModelType | undefined>>({});
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
            message.success(
              formatMessage({ id: 'common.operateSuccess', defaultMessage: '操作成功' }),
            );
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
    for (const formDataKey in result) {
      if (serviceModelMapRef?.current?.[formDataKey]?.type == 'timeRange') {
        if (result[formDataKey] && result[formDataKey][0] && result[formDataKey][1]) {
          result[formDataKey] =
            moment(result[formDataKey][0]).format(TimeRangeFormat) +
            '-' +
            moment(result[formDataKey][1]).format(TimeRangeFormat);
        }
      }
    }
    if (!isEmpty(result)) {
      run({ deviceId, serviceId: key, input: result }).then((data) => {
        if (data) {
          message.success(
            formatMessage({ id: 'common.operateSuccess', defaultMessage: '操作成功' }),
          );
          setDisableBtns((prevData) => ({ ...prevData, [key || '']: true }));
        }
      });
    }
  }, []);

  const onRef = useCallback((value, ref) => {
    schamaFormsRef.current = { ...schamaFormsRef.current, [value]: ref };
  }, []);

  useEffect(() => {
    try {
      const disabledIndex = Object.values(disableBtns).findIndex((item) => item === false);
      if (disabledIndex == -1) {
        for (const key in formsRef?.current) {
          const result = merge({}, realTimeData);
          for (const modelKey in result) {
            if (serviceModelMapRef?.current?.[modelKey]?.type == 'timeRange' && result[modelKey]) {
              const valueArr = result[modelKey].split('-');
              result[modelKey] = [
                moment('2023-01-01 ' + valueArr[0]),
                moment('2023-01-01 ' + valueArr[1]),
              ];
            }
          }
          formsRef?.current?.[key]?.current?.setFieldsValue(result);
        }
      }
    } catch {}
  }, [realTimeData, disableBtns]);

  const getColumns = useCallback((data: DeviceServiceModelType[], index?: number[]) => {
    // 循环生成表单
    const formItems: React.ReactNode[] = [];
    const tabItems: TabsProps['items'] = [];
    data?.forEach?.((item) => {
      serviceModelMapRef.current[item.id || ''] = item?.dataType;
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
                    label: item?.dataType?.specs?.[key as any],
                    value: key,
                  };
                }) || [];
            } catch {
              options = [];
            }
            field = <Select options={options} />;
            break;
          case DeviceModelTypeEnum.TimeRange:
            field = (
              <TimePicker.RangePicker
                className="w-full"
                format={TimeRangeFormat}
                placeholder={[
                  formatMessage({ id: 'common.start', defaultMessage: '开始' }),
                  formatMessage({ id: 'common.end', defaultMessage: '结束' }),
                ]}
                getPopupContainer={(triggerNode) => triggerNode.parentElement || document.body}
              />
            );
            break;
          default:
            field = (
              <Input
                placeholder={formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' })}
              />
            );
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
                    deviceData?.networkStatus === OnlineStatusEnum.Offline ||
                    disableBtns?.[form?.id || ''] === undefined ||
                    disableBtns?.[form?.id || ''] === true
                  }
                  onClick={() => onPushClick(form?.id)}
                >
                  {formatMessage({ id: 'siteMonitor.issueParameters', defaultMessage: '下发参数' })}
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
              onValuesChange={(data: any) => onSwtichFormChange(data, item.groupName)}
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
  }, [groupData, deviceData, loading, onSwtichFormChange, disableBtns]);

  return <>{groups}</>;
};

export default Control;
