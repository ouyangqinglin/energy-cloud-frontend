/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:29:03
 * @LastEditTime: 2024-01-10 14:01:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Detail\LineLabel.tsx
 */
import React from 'react';
import { Divider } from 'antd';
import styles from './LineLabel.less';
import { Size } from '@/utils/dictionary';

export type LineLabelProps = {
  title?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  showLine?: boolean;
  size?: keyof typeof Size;
};

export const LineLabel: React.FC<LineLabelProps> = (props) => {
  const { title, className = '', labelClassName = '', showLine = true, children, size } = props;

  return (
    <>
      <div className={`flex ${className}`}>
        <label className={`flex1 ${styles.label} ${labelClassName} ${size}`}>{title}</label>
        {children}
      </div>
      {showLine && <Divider className="mt12" />}
    </>
  );
};

export default LineLabel;
