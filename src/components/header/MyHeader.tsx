/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-23 14:44:32
 * @LastEditTime: 2023-04-24 15:21:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\header\MyHeader.tsx
 */
import React from 'react';
import RightContent from '@/components/RightContent';
import styles from './index.less';
import logoYt from '@/assets/image/logo-yt.png';

const MyHeader: React.FC = (props) => {
  return (
    <div className={styles.header}>
      <a>
        <img className={styles.logo} src={logoYt} />
      </a>
      <RightContent />
    </div>
  );
};

export default MyHeader;
