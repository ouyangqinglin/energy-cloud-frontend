/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 10:39:54
 * @LastEditTime: 2023-07-21 17:34:26
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Device\index.tsx
 */

import React, { useCallback, useState } from 'react';
import { Divider } from 'antd';
import DeviceList from './DeviceList';
import styles from './index.less';
import SiteLabel from '@/components/SiteLabel';
import { SiteDataType } from '@/services/station';

const Device: React.FC = () => {
  const [siteId, setSiteId] = useState<string>();

  const onChange = useCallback((data: SiteDataType) => {
    setSiteId(data?.id);
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="px24 pt24">
          <SiteLabel onChange={onChange} />
          <Divider className="my0" />
        </div>
        <div className={`${styles.treeContain}`}>
          <div className={`${styles.content}`}>
            <DeviceList params={{ siteIds: siteId }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Device;
