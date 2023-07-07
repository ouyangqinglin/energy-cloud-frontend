/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-05 19:22:37
 * @LastEditTime: 2023-07-06 19:17:54
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\header\Logo.tsx
 */
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';
import YtShuNeng from '@/assets/image/logo-yt.png';
import Yt from '@/assets/image/icon-yt.png';

const Logo: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  return (
    <>
      <a>
        <img className={styles.logo} src={initialState?.collapsed ? Yt : YtShuNeng} />
      </a>
    </>
  );
};

export default Logo;
