/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:29:03
 * @LastEditTime: 2023-07-18 14:08:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceInfo\LineLabel.tsx
 */
import React from 'react';
import { Divider } from 'antd';
import styles from './LineLabel.less';

export type LineLabelProps = {
  title?: string;
  className?: string;
  showLine?: boolean;
};

const LineLabel: React.FC<LineLabelProps> = (props) => {
  const { title, className, showLine = true, children } = props;

  return (
    <>
      <div className={`flex ${className}`}>
        <label className={`flex1 ${styles.label}`}>{title}</label>
        {children}
      </div>
      {showLine && <Divider className="mt12" />}
    </>
  );
};

export default LineLabel;
