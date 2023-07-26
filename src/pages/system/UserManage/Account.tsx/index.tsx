/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-07 16:41:03
 * @LastEditTime: 2023-07-25 19:13:47
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
      if (isEmpty(selectOrg?.type)) {
        return {
          siteId: id.split('-')[0],
        };
      } else {
        return {
          orgId: id,
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
          {selectOrg?.type === 0 ? (
            <Platform params={searchParams} />
          ) : (
            <Customer params={searchParams} />
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
