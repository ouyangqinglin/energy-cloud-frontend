import React, { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { message, Row } from 'antd';
import { useLocation } from 'umi';
import { FundProjectionScreenOutlined } from '@ant-design/icons';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import SchemaForm from '@/components/SchamaForm';
import EmptyPage from '@/components/EmptyPage';
import { useSiteColumn } from '@/hooks';
import styles from './index.less';
import type { LocationType } from '@/utils/dictionary';
import Statistics from './Statistics';
import CardDecoration from './components/CardDecoration';
import EnergyFlow from './EnergyFlow';
import SiteDropdown from './SiteDropdown';
import SiteInfo from './SiteInfo';
import Benefit from './Benefits';
import ElectricityChart from './ElectricityChart';
import { ReactComponent as IconScreen } from '@/assets/image/station/overview/icon_全屏可视化.svg';

type SiteType = {
  siteId?: string;
};

const Index: React.FC = () => {
  const [siteId, setSiteId] = useState<number>();
  const [defaultSiteId, setDefaultSiteId] = useState<number>();
  const location = useLocation();

  useEffect(() => {
    const { query } = location as LocationType;
    if (query?.id) {
      setDefaultSiteId(query?.id);
    }
  }, [location]);

  const onScreenClick = () => {
    if (siteId) {
      window.open(`/screen/demo-station?id=${siteId}`);
    } else {
      message.success('请选择站点');
    }
  };

  return (
    <>
      <div className="bg-white card-wrap p24">
        <div className={styles.stationHeader}>
          <SiteDropdown defaultSiteId={defaultSiteId} onChange={setSiteId} />
          <IconScreen className={styles.screen} onClick={onScreenClick} />
        </div>
        <Row gutter={[16, 16]}>
          <Statistics siteId={siteId} />
          <EnergyFlow siteId={siteId} />
          <Benefit siteId={siteId} />
          <ElectricityChart siteId={siteId} />
          <SiteInfo siteId={siteId} />
        </Row>
      </div>
    </>
  );
};

export default Index;
