/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-05 19:22:37
 * @LastEditTime: 2023-07-14 17:01:10
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\header\Logo.tsx
 */
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const Logo: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  return (
    <>
      <a>
        {initialState?.collapsed
          ? initialState?.currentUser?.systemInfo?.icon && (
              <img className={styles.logo} src={initialState?.currentUser?.systemInfo?.icon} />
            )
          : initialState?.currentUser?.systemInfo?.logo && (
              <img className={styles.logo} src={initialState?.currentUser?.systemInfo?.logo} />
            )}
      </a>
    </>
  );
};

export default Logo;
