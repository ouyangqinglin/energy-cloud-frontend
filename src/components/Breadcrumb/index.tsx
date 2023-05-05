/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-28 17:01:50
 * @LastEditTime: 2023-05-04 15:08:23
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Breadcrumb\index.tsx
 */
import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, useModel } from 'umi';
import styles from './index.less';

const findMenuByKey = (menus: any[], key: string, preItems: any[] = []) => {
  let items: any[] = [];
  const length = menus?.length || 0;
  for (let i = 0; i < length; i++) {
    if (menus[i]?.key === key) {
      preItems.push(menus[i]);
      items = [...preItems];
      break;
    } else if (menus[i]?.children && menus[i]?.children?.length) {
      items = findMenuByKey(menus[i]?.children, key, [...preItems, menus[i]]);
      if (items.length) {
        break;
      }
    }
  }
  return items;
};

const MyBreadcrumb: React.FC = () => {
  const location = useLocation();
  const { initialState } = useModel('@@initialState');

  const menus = findMenuByKey(initialState?.antMenus || [], location.pathname);
  const breadItems = menus.map((item, index) => {
    if (index === menus.length - 1) {
      return <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>;
    } else {
      return (
        <Breadcrumb.Item href={item.key} key={item.key}>
          {item.label}
        </Breadcrumb.Item>
      );
    }
  });

  return (
    <>
      <Breadcrumb>{breadItems}</Breadcrumb>
      <div className={styles.title}>{menus[menus.length - 1]?.label}</div>
    </>
  );
};

export default MyBreadcrumb;
