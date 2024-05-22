import PositionSelect from '@/components/PositionSelect';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { effectStatus } from '@/utils/dict';
import type { FormInstance, ProColumns } from '@ant-design/pro-components';
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

export const Columns: (
  orgId?: number,
  treeData?: any[],
) => ProColumns<ServiceUpdateInfo, TABLESELECTVALUETYPE>[] = (orgId, treeData) => {
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
      fieldProps: () => {
        return {
          placeholder:
            formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请选择' }) +
            formatMessage({ id: 'system.supOrganization', defaultMessage: '上级组织' }),
          treeData: treeData,
        };
      },
      request: async () => {},
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
          },
        ],
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
      title: formatMessage({ id: 'system.1001', defaultMessage: '浏览器title' }),
      colProps: {
        span: 12,
      },

      valueType: 'input',
      fieldProps: {
        maxLength: 14,
        placeholder: `${formatMessage({
          id: 'common.pleaseEnter',
          defaultMessage: '请输入',
        })}（${formatMessage({ id: 'system.1007', defaultMessage: '最多14个字符' })}）`,
      },
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
      title: formatMessage({ id: 'system.1002', defaultMessage: '多站点大屏title' }),
      colProps: {
        span: 12,
      },
      fieldProps: {
        maxLength: 14,
        placeholder: `${formatMessage({
          id: 'common.pleaseEnter',
          defaultMessage: '请输入',
        })}（${formatMessage({ id: 'system.1007', defaultMessage: '最多14个字符' })}）`,
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
          <>
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
            <div style={{ marginTop: '-20px' }}>
              {' '}
              {formatMessage({ id: 'system.1005', defaultMessage: '建议尺寸' })}：320*80px
            </div>
          </>
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
          <>
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
            <div style={{ marginTop: '-20px' }}>
              {' '}
              {formatMessage({ id: 'system.1005', defaultMessage: '建议尺寸' })}：64*64px
            </div>
          </>
        );
      },
    },
    {
      title: '',
      renderFormItem: () => {
        return (
          <Detail.DotLabel
            title={formatMessage({ id: 'system.1006', defaultMessage: 'App' })}
            className="mb0"
          />
        );
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'system.1003', defaultMessage: 'App首页背景图' }),
      colProps: {
        span: 12,
      },
      valueType: 'upload',
      dataIndex: ['orgIcon', 'appHome'],
      renderFormItem: (schema, config, form) => {
        const value = form.getFieldValue(['orgIcon', 'appHome']);
        return (
          <>
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
            <div style={{ marginTop: '-20px' }}>
              {' '}
              {formatMessage({ id: 'system.1005', defaultMessage: '建议尺寸' })}：375*224px
            </div>
          </>
        );
      },
    },
    {
      title: formatMessage({ id: 'system.1004', defaultMessage: 'App个人背景图' }),
      colProps: {
        span: 12,
      },
      valueType: 'upload',
      dataIndex: ['orgIcon', 'appPerson'],
      renderFormItem: (schema, config, form) => {
        const value = form.getFieldValue(['orgIcon', 'appPerson']);
        return (
          <>
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
            <div style={{ marginTop: '-20px' }}>
              {' '}
              {formatMessage({ id: 'system.1005', defaultMessage: '建议尺寸' })}：375*224px
            </div>
          </>
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
          {
            validator: (rule, value) => {
              return new Promise((resolve, reject) => {
                if (!value.address || !value.point.lng || !value.point.lat) {
                  reject(
                    formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
                  );
                } else {
                  resolve(0);
                }
              });
            },
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
