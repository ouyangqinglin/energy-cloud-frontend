/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-23 16:55:31
 * @LastEditTime: 2023-04-23 16:55:31
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\layouts\StaionLayout.tsx
 */
import React from 'react';
import MyHeader from '@/components/header/MyHeader';

const StationLayout: React.FC = (props) => {
  return (
    <div>
      <MyHeader />
      {props.children}
    </div>
  );
};

export default StationLayout;
