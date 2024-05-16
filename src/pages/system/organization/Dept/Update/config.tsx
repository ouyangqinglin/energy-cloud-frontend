import PositionSelect from '@/components/PositionSelect';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { effectStatus } from '@/utils/dict';
import { buildTreeData } from '@/utils/utils';
import type { FormInstance, ProColumns } from '@ant-design/pro-components';
import { getServiceList } from '../service';
import type { ServiceUpdateInfo } from '../type';
import Detail from '@/components/Detail';
import { formatMessage } from '@/utils';
import { api } from '@/services';
import { ProFormUploadButton } from '@ant-design/pro-form';
import type { UploadFile } from 'antd';

const beforeUpload = (file: any, form: FormInstance<any>, field: string | string[]) => {
  const formData = new FormData();
  formData.append('file', file);
  api.uploadFile(formData).then(({ data }) => {
    const url = data.url;
    if (url) {
      form.setFieldValue(field, url);
    }
  });
  return false;
};

export const Columns: (orgId?: number) => ProColumns<ServiceUpdateInfo, TABLESELECTVALUETYPE>[] = (
  orgId,
) => {
  return [
    {
      title: '',
      renderFormItem: () => {
        return (
          <Detail.DotLabel
            title={formatMessage({
              id: 'siteMonitor.statusInformation',
              defaultMessage: '状态信息',
            })}
            className="mb0"
          />
        );
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
      dataIndex: ['status'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
          },
        ],
      },
      valueEnum: effectStatus,
    },
    {
      title: '',
      renderFormItem: () => {
        return (
          <Detail.DotLabel
            title={formatMessage({ id: 'taskManage.basicInformation', defaultMessage: '基础信息' })}
            className="mb0"
          />
        );
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'system.organizationName', defaultMessage: '组织名称' }),
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
          },
        ],
      },
      dataIndex: ['orgName'],
    },
    {
      title: formatMessage({ id: 'system.organizationId', defaultMessage: '组织ID' }),
      valueType: 'input',
      fieldProps: {
        value: orgId,
        disabled: true,
      },
    },
    {
      title: formatMessage({ id: 'system.supOrganization', defaultMessage: '上级组织' }),
      valueType: 'treeSelect',
      fieldProps: {
        placeholder:
          formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请选择' }) +
          formatMessage({ id: 'system.supOrganization', defaultMessage: '上级组织' }),
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
          },
        ],
      },
      request: async () => {
        const res = await getServiceList();
        let depts = buildTreeData(res?.data as any[], 'orgId', 'orgName', '', '', '');
        if (depts.length === 0) {
          depts = [
            {
              id: 0,
              title: formatMessage({ id: 'system.noSuperior', defaultMessage: '无上级' }),
              children: undefined,
              key: 0,
              value: 0,
            },
          ];
        }
        return depts;
      },
      dataIndex: ['parentId'],
    },
    {
      title: formatMessage({ id: 'system.displayOrder', defaultMessage: '显示顺序' }),
      dataIndex: ['orderNum'],
      colProps: {
        span: 8,
      },
      fieldProps: {
        style: {
          width: '100%',
        },
      },
      valueType: 'digit',
    },
    {
      title: formatMessage({ id: 'system.contacts', defaultMessage: '联系人' }),
      dataIndex: ['linkman'],
    },
    {
      title: formatMessage({ id: 'common.telephone', defaultMessage: '联系电话' }),
      dataIndex: ['phone'],
    },
    {
      title: formatMessage({ id: 'system.contactLandline', defaultMessage: '联系座机' }),
      dataIndex: ['landlineNumber'],
    },
    {
      title: formatMessage({ id: 'common.remark', defaultMessage: '备注' }),
      colProps: {
        span: 24,
      },
      dataIndex: ['remark'],
      valueType: 'textarea',
    },
    {
      title: '',
      renderFormItem: () => {
        return (
          <Detail.DotLabel
            title={formatMessage({ id: 'device.cloudPlatform', defaultMessage: '云平台' })}
            className="mb0"
          />
        );
      },
      colProps: {
        span: 24,
      },
    },

    {
      title: formatMessage({ id: 'common.1001', defaultMessage: '浏览器title' }),
      colProps: {
        span: 12,
      },
      valueType: 'input',
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
          },
        ],
      },
      dataIndex: ['orgIcon', 'title'],
    },
    {
      title: formatMessage({ id: 'common.1002', defaultMessage: '多站点大屏title' }),
      colProps: {
        span: 12,
      },
      valueType: 'input',
      dataIndex: ['orgIcon', 'multiSiteLargeScreenTitle'],
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
          },
        ],
      },
    },
    {
      title: 'logo',
      dataIndex: ['orgIcon', 'logo'],
      colProps: {
        span: 12,
      },
      valueType: 'upload',
      renderFormItem: (schema, config, form) => {
        const value = form.getFieldValue(['orgIcon', 'logo']);
        return (
          <ProFormUploadButton
            max={1}
            accept="image/*"
            value={value ? ([{ url: value, uid: '1' }] as UploadFile[]) : []}
            title={formatMessage({ id: 'common.uploadPicture', defaultMessage: '上传图片' })}
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
              beforeUpload: (file) => beforeUpload(file, form, ['orgIcon', 'logo']),
              onChange: () => form.setFieldValue(['orgIcon', 'logo'], ''),
            }}
          />
        );
      },
    },
    {
      title: 'icon',
      dataIndex: ['orgIcon', 'icon'],
      colProps: {
        span: 12,
      },
      valueType: 'upload',
      renderFormItem: (schema, config, form) => {
        const value = form.getFieldValue(['orgIcon', 'icon']);
        return (
          <ProFormUploadButton
            max={1}
            accept="image/*"
            title={formatMessage({ id: 'common.uploadPicture', defaultMessage: '上传图片' })}
            fieldProps={{
              fileList: value ? ([{ url: value, uid: '2' }] as UploadFile[]) : [],
              name: 'file',
              listType: 'picture-card',
              beforeUpload: (file) => beforeUpload(file, form, ['orgIcon', 'icon']),
              onChange: () => form.setFieldValue(['orgIcon', 'icon'], ''),
            }}
          />
        );
      },
    },
    {
      title: formatMessage({ id: 'common.1003', defaultMessage: 'app首页背景图' }),
      colProps: {
        span: 12,
      },
      valueType: 'upload',
      dataIndex: ['orgIcon', 'appHome'],
      renderFormItem: (schema, config, form) => {
        const value = form.getFieldValue(['orgIcon', 'appHome']);
        return (
          <ProFormUploadButton
            max={1}
            accept="image/*"
            title={formatMessage({ id: 'common.uploadPicture', defaultMessage: '上传图片' })}
            fieldProps={{
              fileList: value ? ([{ url: value, uid: '3' }] as UploadFile[]) : [],
              name: 'file',
              listType: 'picture-card',
              beforeUpload: (file) => beforeUpload(file, form, ['orgIcon', 'appHome']),
              onChange: () => form.setFieldValue(['orgIcon', 'appHome'], ''),
            }}
          />
        );
      },
    },
    {
      title: formatMessage({ id: 'common.1004', defaultMessage: 'app个人背景图' }),
      colProps: {
        span: 12,
      },
      valueType: 'upload',
      dataIndex: ['orgIcon', 'appPerson'],
      renderFormItem: (schema, config, form) => {
        const value = form.getFieldValue(['orgIcon', 'appPerson']);
        return (
          <ProFormUploadButton
            max={1}
            accept="image/*"
            title={formatMessage({ id: 'common.uploadPicture', defaultMessage: '上传图片' })}
            fieldProps={{
              fileList: value ? ([{ url: value, uid: '4' }] as UploadFile[]) : [],
              name: 'file',
              listType: 'picture-card',
              beforeUpload: (file) => beforeUpload(file, form, ['orgIcon', 'appPerson']),
              onChange: () => form.setFieldValue(['orgIcon', 'appPerson'], ''),
            }}
          />
        );
      },
    },
    {
      title: formatMessage({ id: 'system.position', defaultMessage: '位置' }),
      colProps: {
        span: 24,
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
          },
        ],
      },
      dataIndex: ['addressInfo'],
      renderFormItem(schema, config, form, action) {
        return <PositionSelect />;
      },
    },
  ];
};
