import { formatMessage } from '@/utils';

export const columns: any[] = [
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 50,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.ruleName', defaultMessage: '规则名称' }),
    dataIndex: 'name',
    ellipsis: true,
    hideInSearch: true,
  },
];
