/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-07 16:41:03
 * @LastEditTime: 2023-07-07 19:47:31
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\system\UserManage\Account.tsx\index.tsx
 */

import React, { useState, useMemo, useCallback } from 'react';
import { Row, Col } from 'antd';
import OrgTree from '@/components/OrgTree';
import type { TreeNode } from '@/components/OrgTree/type';
import Platform from '@/pages/user-manager/accounts/Platform';
import Customer from '@/pages/user-manager/accounts/Customer';
import styles from '../index.less';
import { isEmpty } from '@/utils';

const Account: React.FC = () => {
  const [selectOrg, setSelectOrg] = useState<TreeNode | null>();

  const selectedKeys = useMemo<string[]>(() => {
    return isEmpty(selectOrg?.id) ? [] : [selectOrg?.id];
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
          {(selectOrg?.id + '').indexOf('service') < 0 ? <Platform /> : <Customer />}
        </div>
      </div>
    </>
  );
};

export default Account;
