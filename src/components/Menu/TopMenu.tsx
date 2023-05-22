/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-22 15:03:38
 * @LastEditTime: 2023-05-22 16:27:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Menu\TopMenu.tsx
 */
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import styles from './index.less';
import { useLocation, useModel } from 'umi';
import YtIcon from '@/assets/image/icon-yt.png';
import { getStation } from '@/services/station';
import { AnyMapType } from '@/utils/dictionary';

type LocationType = {
  query?: AnyMapType;
};

const menus = [
  {
    key: '/station-manage/operation-monitor',
    label: '运行监控',
  },
  {
    key: '/station-manage/equipment-list',
    label: '设备列表',
  },
  {
    key: '/station-manage/alarm-record',
    label: '告警记录',
  },
  {
    key: '/station-manage/setting',
    label: '站点设置',
  },
  {
    key: '/station-manage/data-query',
    label: '数据查询',
  },
  {
    key: '/station-manage/service-record',
    label: '服务记录',
  },
];

const TopMenu: React.FC = () => {
  const { state, dispatch } = useModel('station');
  const location = useLocation<LocationType>();

  useEffect(() => {
    getStation(location.query?.id).then((res) => {
      dispatch({ type: 'get', payload: res.data || {} });
    });
  }, [location.query?.id]);

  return (
    <>
      <div className={`${styles.topMenu} flex`}>
        <img className={`${styles.icon} mr8`} src={state?.icon || YtIcon} />
        <span className={`${styles.topTitle} flex1`}>{state?.name}</span>
        <Tabs className={styles.tabs} items={menus} activeKey={location.pathname} />
      </div>
    </>
  );
};

export default TopMenu;
