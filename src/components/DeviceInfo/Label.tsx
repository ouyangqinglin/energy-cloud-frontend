/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:29:03
 * @LastEditTime: 2023-07-13 23:46:19
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceInfo\Label.tsx
 */
import React from 'react';
import { Divider } from 'antd';
import styles from './index.less';

export type LabelProps = {
  title?: string;
  className?: string;
  showLine?: boolean;
};

const Label: React.FC<LabelProps> = (props) => {
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

export default Label;
