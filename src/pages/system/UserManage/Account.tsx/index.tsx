/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-07 16:41:03
 * @LastEditTime: 2024-03-13 15:34:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\UserManage\Account.tsx\index.tsx
 */

import React, { useMemo, memo } from 'react';
import { formatMessage } from '@/utils';
import { Tabs, TabsProps } from 'antd';
import { useAuthority } from '@/hooks';
import AccountTree from './AccountTree';
import { OrgTypeEnum } from '@/components/OrgTree/type';

const Account: React.FC = () => {
  const { authorityMap } = useAuthority([
    'system:user:account:system',
    'system:user:account:install',
    'system:user:account:owner',
    'system:user:account:operator',
  ]);

  const items = useMemo<TabsProps['items']>(() => {
    const result: TabsProps['items'] = [];
    if (authorityMap.get('system:user:account:system')) {
      result.push({
        key: 'system',
        label: formatMessage({ id: 'user.system', defaultMessage: '系统管理员' }),
        children: <AccountTree type={OrgTypeEnum.System} />,
      });
    }
    if (authorityMap.get('system:user:account:install')) {
      result.push({
        key: 'install',
        label: formatMessage({ id: 'user.install', defaultMessage: '安装商' }),
        children: <AccountTree type={OrgTypeEnum.Install} />,
      });
    }
    if (authorityMap.get('system:user:account:owner')) {
      result.push({
        key: 'owner',
        label: formatMessage({ id: 'user.owner', defaultMessage: '业主' }),
        children: <AccountTree type={OrgTypeEnum.Owner} />,
      });
    }
    // if (authorityMap.get('system:user:account:operator')) {
    //   result.push({
    //     key: 'operator',
    //     label: formatMessage({ id: 'user.operator', defaultMessage: '运营商' }),
    //     children: <AccountTree type={OrgTypeEnum.Operator} />,
    //   });
    // }
    return result;
  }, [authorityMap]);

  return (
    <>
      <Tabs className="category-tabs" items={items} tabBarGutter={24} />
    </>
  );
};

export default memo(Account);
