/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-28 17:01:50
 * @LastEditTime: 2023-07-06 15:50:49
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Breadcrumb\index.tsx
 */
import React, { useMemo } from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
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

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const { initialState } = useModel('@@initialState');

  const menus = useMemo(() => {
    return findMenuByKey(initialState?.antMenus || [], location.pathname);
  }, [initialState?.antMenus, location?.pathname]);

  const breadItems = useMemo(() => {
    return menus.map((item, index) => {
      if (index === menus.length - 1) {
        return <AntBreadcrumb.Item key={item.key}>{item.label}</AntBreadcrumb.Item>;
      } else {
        return (
          <AntBreadcrumb.Item href={item.key} key={item.key}>
            {item.label}
          </AntBreadcrumb.Item>
        );
      }
    });
  }, [menus]);

  return (
    <>
      <AntBreadcrumb className={styles.breadcrumb}>{breadItems}</AntBreadcrumb>
    </>
  );
};

export default Breadcrumb;
