import React, { useEffect, useCallback, useRef } from 'react';
import { Form, message, Row, Col } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormSelect,
} from '@ant-design/pro-form';
import { VersionInfo } from '../type';
import { getTypeList, insertVersion } from '../service';
import { platformTypes } from '@/utils/dict';
import { FormOperations } from '@/components/YTModalForm/typing';
import { formatMessage } from '@/utils';

type StationFOrmProps = {
  open: boolean;
  initialValues: VersionInfo;
  onOpenChange: (open: boolean) => void;
  type?: FormOperations;
  onSuccess?: () => void;
};

const StationForm: React.FC<StationFOrmProps> = (props) => {
  const { onSuccess, initialValues } = props;
  const formDataRef = useRef<FormData | null>(null);
  const [form] = Form.useForm<VersionInfo>();

  const requestTypeList = useCallback(() => {
    return getTypeList().then((res) => {
      return (
        res?.data?.map?.((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        }) || []
      );
    });
  }, []);

  const beforeUpload = useCallback((file) => {
    const formData = new FormData();
    formData.append('file', file);
    formDataRef.current = formData;
    return false;
  }, []);

  const onFinish = useCallback((values: VersionInfo) => {
    delete values.file;
    Object.entries(values).forEach(([key, val]) => formDataRef.current!.append(key, val));
    return insertVersion(formDataRef.current).then((res) => {
      if (res) {
        message.success(formatMessage({ id: 'common.successSaved', defaultMessage: '保存成功' }));
        onSuccess?.();
        return true;
      }
    });
  }, []);

  useEffect(() => {
    if (props.open) {
      form.setFieldsValue(initialValues);
    }
  }, [props.open]);

  return (
    <ModalForm<VersionInfo>
      visible={props.open}
      form={form}
      title={formatMessage({ id: 'common.new', defaultMessage: '新建' })}
      autoFocusFirstInput
      onFinish={onFinish}
      onVisibleChange={props.onOpenChange}
    >
      <Row gutter={20}>
        <Col span={12}>
          <ProFormSelect
            label={formatMessage({
              id: 'system.Version.platform',
              defaultMessage: '平台',
            })}
            name="platform"
            valueEnum={platformTypes}
            rules={[
              {
                required: true,
                message:
                  formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
                  formatMessage({
                    id: 'system.Version.platform',
                    defaultMessage: '平台',
                  }),
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            label={formatMessage({
              id: 'system.Version.appType',
              defaultMessage: 'app类型',
            })}
            name="appType"
            valueEnum={{ 1: { text: '永泰运维' } }}
            request={requestTypeList}
            rules={[
              {
                required: true,
                message:
                  formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
                  formatMessage({
                    id: 'system.Version.appType',
                    defaultMessage: 'app类型',
                  }),
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            label={formatMessage({
              id: 'system.Version.version',
              defaultMessage: '版本',
            })}
            name="version"
            rules={[
              {
                required: true,
                message:
                  formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                  formatMessage({
                    id: 'system.Version.version',
                    defaultMessage: '版本',
                  }),
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            label={formatMessage({
              id: 'system.Version.systemName',
              defaultMessage: '系统名称',
            })}
            name="systemName"
            rules={[
              {
                required: true,
                message:
                  formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                  formatMessage({
                    id: 'system.Version.systemName',
                    defaultMessage: '系统名称',
                  }),
              },
            ]}
          />
        </Col>
      </Row>
      <ProFormTextArea
        label={formatMessage({ id: 'common.description', defaultMessage: '描述' })}
        name="details"
      />
      <Row gutter={20}>
        <Col span={8}>
          <ProFormUploadButton
            label={formatMessage({
              id: 'system.Version.uploadApp',
              defaultMessage: '上传安装包',
            })}
            name="file"
            title={formatMessage({ id: 'system.Version.uploadApp', defaultMessage: '上传安装包' })}
            max={1}
            fieldProps={{
              name: 'file',
              beforeUpload,
            }}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};

export default StationForm;
