/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-23 14:44:32
 * @LastEditTime: 2023-10-10 14:46:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\header\MyHeader.tsx
 */
import React, { useState, useCallback, useMemo } from 'react';
import { Drawer, Select } from 'antd';
import { useLocation } from '@/hooks';
import { useModel } from 'umi';
import RightContent from '@/components/header/RightContent';
import styles from './index.less';
import IconMenu from '@/assets/image/menu.png';
import IconMenuRight from '@/assets/image/menu-right.png';
import MyMenu from '../Menu';
import Breadcrumb from '@/components/Breadcrumb';
import SiteSwitch from '@/components/SiteSwitch';

const siteSwitchPath = ['/site-monitor', '/index/station', '/station/station-list'];

const MyHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const location = useLocation();

  const switchDrawer = useCallback((status) => {
    setOpen(status);
  }, []);

  const onSwitchClick = useCallback(() => {
    setInitialState((prevData) => {
      return { ...prevData, collapsed: !prevData?.collapsed };
    });
  }, []);

  const siteStyles = useMemo(() => {
    const pathName = location?.pathname || '';
    const result = siteSwitchPath.find((item) => pathName.indexOf(item) > -1);
    return result ? {} : { display: 'none' };
  }, [location?.pathname]);

  return (
    <>
      <div className={styles.header}>
        <img
          className={styles.menu + ' mr24'}
          src={initialState?.collapsed ? IconMenu : IconMenuRight}
          onClick={onSwitchClick}
        />
        <Breadcrumb />
        {/* 站点删除等变更需要从新刷新组件 todo*/}
        <SiteSwitch className={`${styles.site} mx24`} style={siteStyles} />
        <div className="flex1" />
        <RightContent />
      </div>
    </>
  );
};

export default MyHeader;
