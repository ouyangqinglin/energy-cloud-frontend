/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-23 14:44:32
 * @LastEditTime: 2023-07-06 14:37:32
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\header\MyHeader.tsx
 */
import React, { useState, useCallback } from 'react';
import { Drawer } from 'antd';
import { useModel } from 'umi';
import RightContent from '@/components/header/RightContent';
import styles from './index.less';
import IconMenu from '@/assets/image/menu.png';
import IconMenuRight from '@/assets/image/menu-right.png';
import MyMenu from '../Menu';

const MyHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const switchDrawer = useCallback((status) => {
    setOpen(status);
  }, []);

  const onSwitchClick = useCallback(() => {
    setInitialState((prevData) => {
      return { ...prevData, collapsed: !prevData?.collapsed };
    });
  }, []);

  return (
    <>
      <div className={styles.header}>
        <img
          className={styles.menu + ' mr24'}
          src={initialState?.collapsed ? IconMenu : IconMenuRight}
          onClick={onSwitchClick}
        />
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
