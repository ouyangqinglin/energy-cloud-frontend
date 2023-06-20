/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 17:33:48
 * @LastEditTime: 2023-06-19 17:48:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EmptyPage\index.tsx
 */
import React from 'react';
import { Empty } from 'antd';

const EmptyPage: React.FC = () => {
  return (
    <>
      <div className="flex" style={{ marginTop: '25vh' }}>
        <Empty className="flex1" description="页面开发中，敬请期待..." />
      </div>
    </>
  );
};

export default EmptyPage;
