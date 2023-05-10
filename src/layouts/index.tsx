/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-27 18:57:33
 * @LastEditTime: 2023-04-27 19:51:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\layouts\index.tsx
 */

import React from 'react';
import { Layout } from 'antd';
import MyHeader from '@/components/header/MyHeader';
import styles from './index.less';
import PageMenu from '@/components/Menu/PageMenu';
import Breadcrumb from '@/components/Breadcrumb';

const MyLayout: React.FC = (props: any) => {
  const { route } = props;
  return (
    <Layout className={styles.myLayout}>
      <Layout.Header className={styles.header}>
        <MyHeader />
      </Layout.Header>
      <Layout id="myLayoutContain">
        {route?.menu == 'sider' && (
          <Layout.Sider className={styles.sider} theme="light">
            <PageMenu />
          </Layout.Sider>
        )}
        <Layout.Content className={styles.content}>
          {route?.menu == 'sider' && <Breadcrumb />}
          {props.children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
