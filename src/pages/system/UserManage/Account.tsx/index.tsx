/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-07 16:41:03
 * @LastEditTime: 2023-07-27 11:58:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\UserManage\Account.tsx\index.tsx
 */

import React, { useState, useMemo, useCallback } from 'react';
import OrgTree from '@/components/OrgTree';
import { OrgTypeEnum, TreeNode } from '@/components/OrgTree/type';
import styles from '../index.less';
import { isEmpty } from '@/utils';
import { AccountDataType } from './config';
import { default as UserAccount } from './Account';

const Account: React.FC = () => {
  const [selectOrg, setSelectOrg] = useState<TreeNode | null>({ id: 100, key: '100', type: 0 });

  const selectedKeys = useMemo<string[]>(() => {
    return isEmpty(selectOrg?.id) ? [] : [selectOrg?.id as string];
  }, [selectOrg]);

  const searchParams = useMemo<AccountDataType>(() => {
    if (selectOrg) {
      if (!isEmpty(selectOrg?.siteId)) {
        return {
          orgTypes:
            selectOrg.type == OrgTypeEnum.Install
              ? [OrgTypeEnum.Install, OrgTypeEnum.Operator, OrgTypeEnum.Owner]
              : [selectOrg.type],
          orgId: selectOrg?.parentId,
          siteId: selectOrg?.siteId,
          siteName: selectOrg?.siteName,
          parentId: selectOrg.parentId,
        };
      } else {
        return {
          orgTypes:
            selectOrg.type == OrgTypeEnum.Install
              ? [OrgTypeEnum.Install, OrgTypeEnum.Operator, OrgTypeEnum.Owner]
              : [selectOrg.type],
          orgId: selectOrg?.id as string,
          parentId: selectOrg.parentId,
        };
      }
    } else {
      return {};
    }
  }, [selectOrg]);

  const onSelect = useCallback((_, { selected, node }: { selected: boolean; node: TreeNode }) => {
    if (selected) {
      setSelectOrg(node);
    }
  }, []);

  const afterRequest = useCallback((data) => {
    setSelectOrg(data[0]);
  }, []);

  return (
    <>
      <div className={styles.contain}>
        <div className={styles.tree}>
          <OrgTree selectedKeys={selectedKeys} onSelect={onSelect} afterRequest={afterRequest} />
        </div>
        <div className={styles.table}>
          <UserAccount params={searchParams} />
        </div>
      </div>
    </>
  );
};

export default Account;
