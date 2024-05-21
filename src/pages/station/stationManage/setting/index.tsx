import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import styles from './index.less';
import StationInfo from '../info/stationInfo';
import System from './System';
import ElectricityPrice from './ElectricityPrice';
import Record from './Record';
import ParamsSetting from './ParamsSetting';
import Device from './Device';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';
import { useCallback, useMemo, useState } from 'react';
import { StationType } from '../../stationList/data';

const Setting = () => {
  const [siteInfo, setSiteInfo] = useState<StationType>();
  const { authorityMap } = useAuthority([
    'siteManage:siteConfig:baseInfo',
    'iot:siteManage:siteConfig:deviceManage',
    'siteManage:siteConfig:runManage',
    'siteManage:siteConfig:systemParamsSetting',
    'siteManage:siteConfig:electricPriceManage',
    'siteManage:siteConfig:configRecord',
    'iot:siteManage:siteConfig:deviceManage:page',
  ]);

  const onSiteChange = useCallback((data: StationType) => {
    setSiteInfo(data);
  }, []);

  const items = useMemo(() => {
    const result: TabsProps['items'] = [];
    if (authorityMap.get('siteManage:siteConfig:baseInfo')) {
      result.push({
        key: '1',
        label: formatMessage({ id: 'siteManage.set.baseInfo', defaultMessage: '基础信息' }),
        children: <StationInfo onSiteChange={onSiteChange} />,
      });
    }
    if (
      authorityMap.get('iot:siteManage:siteConfig:deviceManage') &&
      authorityMap.get('iot:siteManage:siteConfig:deviceManage:page')
    ) {
      result.push({
        key: '2',
        label: formatMessage({ id: 'siteManage.set.deviceManage', defaultMessage: '设备管理' }),
        children: <Device />,
      });
    }
    if (authorityMap.get('siteManage:siteConfig:runManage')) {
      result.push({
        key: '3',
        label: formatMessage({
          id: 'siteManage.set.operateManagement',
          defaultMessage: '运行管理',
        }),
        children: <System />,
      });
    }
    if (authorityMap.get('siteManage:siteConfig:systemParamsSetting')) {
      result.push({
        key: '4',
        label: formatMessage({
          id: 'siteManage.set.systemParameterSet',
          defaultMessage: '系统参数设置',
        }),
        children: <ParamsSetting />,
      });
    }
    if (authorityMap.get('siteManage:siteConfig:electricPriceManage')) {
      result.push({
        key: '5',
        label: formatMessage({
          id: 'siteManage.set.electricPriceManagement',
          defaultMessage: '电价管理',
        }),
        children: <ElectricityPrice siteType={siteInfo?.energyOptions} />,
      });
    }
    if (authorityMap.get('siteManage:siteConfig:configRecord')) {
      result.push({
        key: '6',
        label: formatMessage({ id: 'siteManage.set.configLog', defaultMessage: '配置日志' }),
        children: <Record />,
      });
    }
    return result;
  }, [authorityMap, siteInfo]);

  return (
    <>
      <div className="px24 pt24">
        <label className={styles.label}>{siteInfo?.name}</label>
      </div>
      <Tabs
        className={`${styles.tabsWrapper}`}
        tabBarGutter={34}
        defaultActiveKey="1"
        items={items}
      />
    </>
  );
};

export default Setting;
