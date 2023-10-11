/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-21 16:52:47
 * @LastEditTime: 2023-08-25 17:18:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\SiteLabel\index.tsx
 */
import React, { useEffect } from 'react';
import { useModel } from 'umi';
import { SiteDataType } from '@/services/station';

export type SiteLabelProps = {
  onChange?: (value: SiteDataType) => void;
  className?: string;
};

const SiteLabel: React.FC<SiteLabelProps> = (props) => {
  const { onChange, className, children } = props;

  const { state: siteData } = useModel('site');

  useEffect(() => {
    if (siteData?.isLoad) {
      onChange?.(siteData);
    }
  }, [siteData]);

  return (
    <>
      <div className={`page-label ${className}`}>
        {siteData?.name || '--'}
        {children}
      </div>
    </>
  );
};

export default SiteLabel;
