/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-23 16:55:31
 * @LastEditTime: 2023-05-26 10:24:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\layouts\StationLayout.tsx
 */
import React from 'react';
import { Layout } from 'antd';
import MyHeader from '@/components/header/MyHeader';
import styles from './index.less';

const StationLayout: React.FC = (props) => {
  return (
    <Layout className={styles.myLayout}>
      <Layout.Header className={styles.header}>
        <MyHeader />
      </Layout.Header>
      <div id="myLayoutContain">{props.children}</div>
    </Layout>
  );
};

export default StationLayout;
