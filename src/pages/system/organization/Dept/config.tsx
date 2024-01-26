import { effectStatus } from '@/utils/dict';
import { ProColumns } from '@ant-design/pro-components';
import { ServiceInfo } from './type';
import { formatMessage } from '@/utils';
import { Tooltip } from 'antd';

export const columns: ProColumns<ServiceInfo>[] = [
  {
    title: formatMessage({ id: 'system.organizationName', defaultMessage: '组织名称' }),
    dataIndex: 'orgName',
    width: 220,
    ellipsis: true,
    render: (_, record) => {
      return (
        <>
          <Tooltip title={record.orgName}>
            <span>{record.orgName} </span>
          </Tooltip>
        </>
      );
    },
  },
  {
    title: formatMessage({ id: 'system.organizationId', defaultMessage: '组织ID' }),
    dataIndex: 'orgId',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: effectStatus,
    width: 100,
  },
  {
    title: formatMessage({ id: 'common.remark', defaultMessage: '备注' }),
    dataIndex: 'remark',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'common.createTime', defaultMessage: '创建时间' }),
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 150,
  },
  {
    title: formatMessage({ id: 'common.createPerson', defaultMessage: '创建人' }),
    dataIndex: 'createByName',
    hideInSearch: true,
    width: 100,
    ellipsis: true,
  },
];
