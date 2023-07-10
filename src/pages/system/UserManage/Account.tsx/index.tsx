/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-07 16:41:03
 * @LastEditTime: 2023-07-10 11:44:29
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\UserManage\Account.tsx\index.tsx
 */

import React, { useState, useMemo, useCallback } from 'react';
import { Row, Col } from 'antd';
import OrgTree from '@/components/OrgTree';
import { TreeNode, OrgTypeEnum } from '@/components/OrgTree/type';
import Platform from '@/pages/user-manager/accounts/Platform';
import Customer from '@/pages/user-manager/accounts/Customer';
import styles from '../index.less';
import { isEmpty } from '@/utils';
import { PlatformSearchType } from '@/pages/user-manager/accounts/Platform/type';

const Account: React.FC = () => {
  const [selectOrg, setSelectOrg] = useState<TreeNode | null>({ id: 0, key: '0' });

  const selectedKeys = useMemo<string[]>(() => {
    return isEmpty(selectOrg?.id) ? [] : [selectOrg?.id];
  }, [selectOrg]);

  const searchParams = useMemo<PlatformSearchType>(() => {
    if (selectOrg) {
      const id = selectOrg?.id + '';
      if (selectOrg?.type === OrgTypeEnum.Site) {
        return {
          siteId: id.replace(OrgTypeEnum.Site, ''),
        };
      } else {
        return {
          orgId: id.replace(OrgTypeEnum.Service, ''),
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

  return (
    <>
      <div className={styles.contain}>
        <div className={styles.tree}>
          <OrgTree siteId="1" selectedKeys={selectedKeys} onSelect={onSelect} />
        </div>
        <div className={styles.table}>
          {selectOrg?.type === OrgTypeEnum.Service || selectOrg?.type === OrgTypeEnum.Site ? (
            <Customer params={searchParams} />
          ) : (
            <Platform params={searchParams} />
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
