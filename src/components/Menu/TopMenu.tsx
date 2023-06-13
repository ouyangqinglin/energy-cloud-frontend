/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-22 15:03:38
 * @LastEditTime: 2023-06-05 09:18:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Menu\TopMenu.tsx
 */
import React, { useEffect, useCallback, useMemo } from 'react';
import { Tabs } from 'antd';
import styles from './index.less';
import { useLocation, useModel, useHistory } from 'umi';
import YtIcon from '@/assets/image/icon-yt.png';
import { getStation } from '@/services/station';
import { LocationType } from '@/utils/dictionary';

const menus = [
  {
    key: '/station-manage/operation-monitor',
    label: '概览',
  },
  {
    key: '/station-manage/equipment-list',
    label: '设备',
  },
  {
    key: '/station-manage/alarm-record',
    label: '告警',
  },
  {
    key: '/station-manage/setting',
    label: '设置',
  },
];

const TopMenu: React.FC = () => {
  const { state, dispatch } = useModel('station');
  const location = useLocation<LocationType>();
  const id = useMemo(
    () => (location as LocationType).query?.id,
    [(location as LocationType).query?.id],
  );
  const history = useHistory();

  const onChange = useCallback((key) => {
    history.push({
      pathname: `${key}`,
      search: `id=${id}`,
    });
  }, []);

  useEffect(() => {
    if (id) {
      getStation(id).then(({ data }) => {
        dispatch({ type: 'get', payload: { ...(data || {}), id } });
      });
    }
  }, [id]);

  return (
    <>
      <div className={`${styles.topMenu} flex`}>
        <img className={`${styles.icon} mr8`} src={state?.icon || YtIcon} />
        <span className={`${styles.topTitle} flex1`}>{state?.name}</span>
        <Tabs
          className={styles.tabs}
          items={menus}
          activeKey={location.pathname}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default TopMenu;
