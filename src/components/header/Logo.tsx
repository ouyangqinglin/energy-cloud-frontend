/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-05 19:22:37
 * @LastEditTime: 2023-07-05 19:22:37
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\header\Logo.tsx
 */
import React from 'react';
import styles from './index.less';
import logoYt from '@/assets/image/logo-yt.png';

const Logo: React.FC = () => {
  return (
    <>
      <a>
        <img className={styles.logo} src={logoYt} />
      </a>
    </>
  );
};

export default Logo;
