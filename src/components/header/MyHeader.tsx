/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-23 14:44:32
 * @LastEditTime: 2023-04-28 15:24:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\header\MyHeader.tsx
 */
import React, { useState, useCallback } from 'react';
import { Drawer } from 'antd';
import RightContent from '@/components/RightContent';
import styles from './index.less';
import logoYt from '@/assets/image/logo-yt.png';
import IconMenu from '@/assets/image/menu.png';
import IconClose from '@/assets/image/menu-close.png';
import MyMenu from '../Menu';

const MyHeader: React.FC = (props) => {
  const [open, setOpen] = useState(false);

  const switchDrawer = useCallback((status) => {
    setOpen(status);
  }, []);

  return (
    <>
      <div className={styles.header}>
        <img
          className={styles.menu + ' mr24'}
          src={open ? IconClose : IconMenu}
          onClick={() => switchDrawer(!open)}
        />
        <a>
          <img className={styles.logo} src={logoYt} />
        </a>
        <RightContent />
      </div>
      <Drawer
        open={open}
        onClose={() => switchDrawer(false)}
        getContainer="#myLayoutContain"
        placement="left"
        style={{ position: 'absolute' }}
        width="200px"
        closable={false}
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: 0 }}
      >
        <MyMenu onClick={() => switchDrawer(false)} />
      </Drawer>
    </>
  );
};

export default MyHeader;
