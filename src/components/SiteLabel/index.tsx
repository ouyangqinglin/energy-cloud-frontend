/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-21 16:52:47
 * @LastEditTime: 2023-07-21 17:55:16
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\SiteLabel\index.tsx
 */
import React, { useEffect } from 'react';
import { useModel } from 'umi';
import { SiteDataType } from '@/services/station';
import styles from './index.less';

export type SiteLabelProps = {
  onChange?: (value: SiteDataType) => void;
  className?: string;
};

const SiteLabel: React.FC<SiteLabelProps> = (props) => {
  const { onChange, className } = props;

  const { state: siteData } = useModel('site');

  useEffect(() => {
    if (siteData?.id) {
      onChange?.(siteData);
    }
  }, [siteData]);

  return (
    <>
      <div className={`${styles.label} ${className}`}>{siteData?.name}</div>
    </>
  );
};

export default SiteLabel;
