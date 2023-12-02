/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 10:39:54
 * @LastEditTime: 2023-11-17 14:42:48
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
  const [params, setParams] = useState<{ siteIds?: string }>();

  const onChange = useCallback((data: SiteDataType) => {
    setParams({
      siteIds: data?.id,
    });
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="px24 pt24">
          <SiteLabel onChange={onChange} />
        </div>
        <div className={`${styles.treeContain}`}>
          <div className={`${styles.content}`}>
            <DeviceList params={params} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Device;
