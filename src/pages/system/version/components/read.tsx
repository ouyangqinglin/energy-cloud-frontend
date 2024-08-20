import { useEffect, useRef } from 'react';
import { BetaSchemaForm, ModalForm } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import type { VersionInfo } from '../type';
import { platformTypes } from '@/utils/dict';
import { upgradeForce } from '@/utils/dict';
import { formatMessage } from '@/utils';
import { FormattedMessage } from 'umi';
import { getFileUrl } from '../service';
import { Button } from 'antd';
type IProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  initialValues?: VersionInfo;
};

const Read = (props: IProps) => {
  const { initialValues, ...rest } = props;
  const formRef = useRef<ProFormInstance>(null);

  useEffect(() => {
    if (props.open) {
      formRef?.current?.setFieldsValue?.(initialValues);
    }
  }, [props.open]);

  const downloadApp = (url: string) => {
    getFileUrl({ url, platform: 2 }).then((res) => {
      if (res.data) window.open(res.data);
    });
  };

  const columnsRead: ProColumns<VersionInfo, 'text'>[] = [
    {
      title: formatMessage({ id: 'system.Version.platform', defaultMessage: '平台' }),
      dataIndex: 'platform',
      valueEnum: platformTypes,
    },
    {
      title: formatMessage({ id: 'system.Version.appType', defaultMessage: 'app类型' }),
      dataIndex: 'appType',
      render: (text) => (text === 1 ? '永泰运维' : '-'),
    },
    {
      title: formatMessage({ id: 'system.Version.version', defaultMessage: '版本' }),
      dataIndex: 'version',
    },
    {
      title: formatMessage({ id: 'system.Version.systemName', defaultMessage: '系统名称' }),
      dataIndex: 'systemName',
    },
    {
      title: formatMessage({ id: 'common.updatedTime', defaultMessage: '更新时间' }),
      dataIndex: 'releaseTime',
    },
    {
      title: formatMessage({ id: 'system.Version.isCoerce', defaultMessage: '是否强制升级' }),
      dataIndex: 'isCoerce',
      valueEnum: upgradeForce,
    },
    {
      title: formatMessage({ id: 'common.description', defaultMessage: '描述' }),
      dataIndex: 'details',
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'system.Version.package', defaultMessage: '安装包' }),
      dataIndex: 'url',
      colProps: {
        span: 24,
      },
      render: (text) => (
        <Button style={{ padding: 0 }} type="link" onClick={() => downloadApp(text)}>
          {formatMessage({ id: 'common.download', defaultMessage: '下载' })}
        </Button>
      ),
    },
  ];

  return (
    <>
      <ModalForm<VersionInfo>
        title={<FormattedMessage id="common.viewDetail" defaultMessage="查看详情" />}
        formRef={formRef}
        layout={'vertical'}
        readonly={true}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          onCancel: () => {
            formRef?.current?.resetFields?.();
          },
        }}
        {...{
          rowProps: {
            gutter: [16, 16],
          },
          colProps: {
            span: 8,
          },
          grid: true,
        }}
        submitter={{
          submitButtonProps: {
            hidden: true,
          },
        }}
        {...rest}
      >
        <BetaSchemaForm<any> layoutType="Embed" columns={columnsRead} />
      </ModalForm>
    </>
  );
};

export default Read;
