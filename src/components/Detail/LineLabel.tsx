/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:29:03
 * @LastEditTime: 2023-07-19 10:06:31
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Detail\LineLabel.tsx
 */
import React from 'react';
import { Divider } from 'antd';
import styles from './LineLabel.less';

export type LineLabelProps = {
  title?: string;
  className?: string;
  labelClassName?: string;
  showLine?: boolean;
};

export const LineLabel: React.FC<LineLabelProps> = (props) => {
  const { title, className = '', labelClassName = '', showLine = true, children } = props;

  return (
    <>
      <div className={`flex ${className}`}>
        <label className={`flex1 ${styles.label} ${labelClassName}`}>{title}</label>
        {children}
      </div>
      {showLine && <Divider className="mt12" />}
    </>
  );
};

export default LineLabel;
