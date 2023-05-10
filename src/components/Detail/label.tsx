/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 10:42:14
 * @LastEditTime: 2023-05-08 10:42:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Detail\label.tsx
 */

import React from 'react';

export type LabelProps = {
  title: string;
  className?: string;
  operate?: React.ReactNode;
};

const Label: React.FC<LabelProps> = (props) => {
  return (
    <>
      <div className={`flex label ${props.className}`}>
        <span className="labelLine" />
        <span className="flex1">{props.title}</span>
        {props.operate}
      </div>
    </>
  );
};

export default Label;
