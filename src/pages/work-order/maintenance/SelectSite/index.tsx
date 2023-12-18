import type { TableModalProps } from '@/components/TableSelect/TableSelect/TableModal';
import TableModal from '@/components/TableSelect/TableSelect/TableModal';
import { getSiteByOrg } from '@/pages/system/UserManage/Account.tsx/service';
import type { ProColumns } from '@ant-design/pro-components';
import type { AnyKindOfDictionary } from 'lodash';
import type { FC } from 'react';
import { getSiteList } from '../service';
import { formatMessage } from '@/utils';

const tableSelectColumns: ProColumns[] = [
  {
    title: formatMessage({ id: 'siteManage.siteList.siteCode', defaultMessage: '站点编码' }),
    dataIndex: 'id',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: formatMessage({ id: 'siteManage.siteList.siteName', defaultMessage: '站点名称' }),
    dataIndex: 'name',
    width: 200,
    ellipsis: true,
  },
];

const SelectSiteModal: FC<TableModalProps<AnyKindOfDictionary, any, any>> = (props) => {
  return (
    <TableModal<AnyKindOfDictionary, AnyKindOfDictionary, any>
      proTableProps={{
        columns: tableSelectColumns,
        request: getSiteList,
      }}
      multiple={false}
      width={'900px'}
      valueId={'id'}
      valueName={'name'}
      tableId={'id'}
      tableName={'name'}
      value={[]}
      {...props}
    />
  );
};

export default SelectSiteModal;
