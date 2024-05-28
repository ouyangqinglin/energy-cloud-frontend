import PositionSelect from '@/components/PositionSelect';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { TABLESELECT } from '@/components/TableSelect';
import { effectStatus } from '@/utils/dict';
import { getServiceProviderList } from '../service';
import type { ServiceUpdateInfo } from '../type';
import Detail from '@/components/Detail';
import type { FormInstance, ProColumns } from '@ant-design/pro-components';
import { ProFormUploadButton } from '@ant-design/pro-form';
import { formatMessage } from '@/utils';
import type { UploadFile } from 'antd';
import { api } from '@/services';
import app_code from '@/assets/image/app_code.png';
import account_code from '@/assets/image/account_code.png';
import styles from './index.less';
import app_home from '@/assets/image/app_home.png';
import app_me from '@/assets/image/app_me.png';

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
      title: formatMessage({ id: 'system.installer', defaultMessage: '安装商' }),
      valueType: TABLESELECT,
      dataIndex: 'orgEfIds',
      formItemProps: {
        rules: [
          {
            required: true,
            message:
              formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
              formatMessage({ id: 'system.installer', defaultMessage: '安装商' }),
          },
        ],
      },
      colProps: {
        span: 24,
      },
      name: 'orgEfs',
      fieldProps: (form) => ({
        tableId: 'orgId',
        tableName: 'orgName',
        valueId: 'orgId',
        valueName: 'orgName',
        multiple: false,
        inputStyle: {
          width: '33.33%',
        },
        proTableProps: {
          columns: [
            {
              title: formatMessage({ id: 'system.installer', defaultMessage: '安装商' }) + 'ID',
              dataIndex: 'orgId',
              width: 150,
              ellipsis: true,
              hideInSearch: true,
            },
            {
              title: formatMessage({ id: 'system.installerName', defaultMessage: '安装商名称' }),
              dataIndex: 'orgName',
              width: 200,
              ellipsis: true,
            },
          ],
          request: (params: Record<string, any>) => {
            return getServiceProviderList(params)?.then(({ data }) => {
              return {
                data: data?.list,
                total: data?.total,
                success: true,
              };
            });
          },
        },
      }),
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
      fieldProps: {
        value: orgId,
        disabled: true,
      },
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
      title: formatMessage({ id: 'system.1009', defaultMessage: '扫码下载App' }),
      colProps: {
        span: 12,
      },
      valueType: 'radio',
      fieldProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
          },
        ],
      },
      dataIndex: ['orgIcon', 'appDownloadStatus'],
    },
    {
      title: formatMessage({ id: 'system.1011', defaultMessage: '扫码关注公众号' }),
      colProps: {
        span: 12,
      },
      valueType: 'radio',
      fieldProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'system.requiredField', defaultMessage: '此项为必填项' }),
          },
        ],
      },
      dataIndex: ['orgIcon', 'officialAccountsStatus'],
    },

    {
      title: formatMessage({ id: 'system.1010', defaultMessage: 'app下载二维码' }),
      colProps: {
        span: 12,
      },
      dataIndex: ['orgIcon', 'appDownloadQr'],
      valueType: 'upload',
      renderFormItem: (schema, config, form) => {
        const value = form.getFieldValue(['orgIcon', 'appDownloadQr']) || app_code;
        return (
          <>
            <ProFormUploadButton
              max={1}
              accept="image/*"
              title={formatMessage({ id: 'common.uploadPicture', defaultMessage: '上传图片' })}
              fieldProps={{
                fileList: value ? ([{ url: value, uid: '1' }] as UploadFile[]) : [],
                name: 'file',
                showUploadList: { showRemoveIcon: false },
                listType: 'picture-card',
                beforeUpload: (file) => beforeUpload(file, form, ['orgIcon', 'appDownloadQr']),
                onChange: () => form.setFieldValue(['orgIcon', 'appDownloadQr'], ''),
              }}
            />
            <div className={styles.tips}>
              {formatMessage({ id: 'system.1005', defaultMessage: '建议尺寸' })}：160*160px
            </div>
          </>
        );
      },
    },
    {
      title: formatMessage({ id: 'system.1012', defaultMessage: '公众号二维码' }),
      colProps: {
        span: 12,
      },
      dataIndex: ['orgIcon', 'officialAccountsQr'],
      valueType: 'upload',
      renderFormItem: (schema, config, form) => {
        const value = form.getFieldValue(['orgIcon', 'officialAccountsQr']) || account_code;
        return (
          <>
            <ProFormUploadButton
              max={1}
              accept="image/*"
              title={formatMessage({ id: 'common.uploadPicture', defaultMessage: '上传图片' })}
              fieldProps={{
                fileList: value ? ([{ url: value, uid: '1' }] as UploadFile[]) : [],
                name: 'file',
                showUploadList: { showRemoveIcon: false },
                listType: 'picture-card',
                beforeUpload: (file) => beforeUpload(file, form, ['orgIcon', 'officialAccountsQr']),
                onChange: () => form.setFieldValue(['orgIcon', 'officialAccountsQr'], ''),
              }}
            />
            <div className={styles.tips}>
              {formatMessage({ id: 'system.1005', defaultMessage: '建议尺寸' })}：160*160px
            </div>
          </>
        );
      },
    },
    {
      title: formatMessage({ id: 'system.1013', defaultMessage: 'app二维码说明' }),
      colProps: {
        span: 12,
      },
      dataIndex: ['orgIcon', 'appDownloadDesc'],
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
      title: formatMessage({ id: 'system.1014', defaultMessage: '公众号二维码说明' }),
      colProps: {
        span: 12,
      },
      dataIndex: ['orgIcon', 'officialAccountsDesc'],
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
              title={formatMessage({ id: 'common.uploadPicture', defaultMessage: '上传图片' })}
              fieldProps={{
                name: 'file',
                showUploadList: { showRemoveIcon: false },
                fileList: value ? ([{ url: value, uid: '1' }] as UploadFile[]) : [],
                listType: 'picture-card',
                beforeUpload: (file) => beforeUpload(file, form, ['orgIcon', 'logo']),
                onChange: () => form.setFieldValue(['orgIcon', 'logo'], ''),
              }}
            />
            <div className={styles.tips}>
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
                fileList: value ? ([{ url: value, uid: '1' }] as UploadFile[]) : [],
                name: 'file',
                listType: 'picture-card',
                beforeUpload: (file) => beforeUpload(file, form, ['orgIcon', 'icon']),
                onChange: () => form.setFieldValue(['orgIcon', 'icon'], ''),
              }}
            />
            <div className={styles.tips}>
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
        const value = form.getFieldValue(['orgIcon', 'appHome']) || app_home;
        return (
          <>
            <ProFormUploadButton
              max={1}
              accept="image/*"
              title={formatMessage({ id: 'common.uploadPicture', defaultMessage: '上传图片' })}
              fieldProps={{
                fileList: value ? ([{ url: value, uid: '1' }] as UploadFile[]) : [],
                name: 'file',
                showUploadList: { showRemoveIcon: false },
                listType: 'picture-card',
                beforeUpload: (file) => beforeUpload(file, form, ['orgIcon', 'appHome']),
                onChange: () => form.setFieldValue(['orgIcon', 'appHome'], ''),
              }}
            />
            <div className={styles.tips}>
              {formatMessage({ id: 'system.1005', defaultMessage: '建议尺寸' })}：1125*672px
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
        const value = form.getFieldValue(['orgIcon', 'appPerson']) || app_me;
        return (
          <>
            <ProFormUploadButton
              max={1}
              accept="image/*"
              title={formatMessage({ id: 'common.uploadPicture', defaultMessage: '上传图片' })}
              fieldProps={{
                fileList: value ? ([{ url: value, uid: '1' }] as UploadFile[]) : [],
                showUploadList: { showRemoveIcon: false },
                name: 'file',
                listType: 'picture-card',
                beforeUpload: (file) => beforeUpload(file, form, ['orgIcon', 'appPerson']),
                onChange: () => form.setFieldValue(['orgIcon', 'appPerson'], ''),
              }}
            />
            <div className={styles.tips}>
              {formatMessage({ id: 'system.1005', defaultMessage: '建议尺寸' })}：1125*672px
            </div>
          </>
        );
      },
    },
    {
      title: formatMessage({ id: 'system.position1', defaultMessage: '位置' }),
      colProps: {
        span: 24,
      },
      dataIndex: ['addressInfo'],
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
      renderFormItem(schema, config, form, action) {
        return <PositionSelect />;
      },
    },
  ];
};
