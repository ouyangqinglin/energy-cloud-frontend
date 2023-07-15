import React, { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { message, Row, Tooltip } from 'antd';
import { useLocation, useRequest } from 'umi';
import styles from './index.less';
import type { LocationType } from '@/utils/dictionary';
import Statistics from './Statistics';
import EnergyFlow from './EnergyFlow';
import SiteDropdown from './SiteDropdown';
import SiteInfo from './SiteInfo';
import Benefit from './Benefits';
import ElectricityChart from './ElectricityChart';
import { ReactComponent as IconScreen } from '@/assets/image/station/overview/icon_全屏可视化.svg';
import { getDefaultPage } from '@/services/station';

type SiteType = {
  siteId?: string;
};

const Index: React.FC = () => {
  const [siteId, setSiteId] = useState<number>();
  const [defaultSiteId, setDefaultSiteId] = useState<number>();
  const location = useLocation();

  const { data: defaultPageData, run } = useRequest(getDefaultPage, {
    manual: true,
  });

  useEffect(() => {
    const { query } = location as LocationType;
    if (query?.id) {
      setDefaultSiteId(query?.id);
    }
  }, [location]);

  useEffect(() => {
    if (siteId) {
      run(siteId + '');
    }
  }, [siteId]);

  const onScreenClick = useCallback(() => {
    if (siteId) {
      window.open(`${defaultPageData?.customPagePath}?id=${siteId}`);
    } else {
      message.success('请选择站点');
    }
  }, [defaultPageData, siteId]);

  return (
    <>
      <div className="bg-white card-wrap p24">
        <div className={styles.stationHeader}>
          <SiteDropdown defaultSiteId={defaultSiteId} onChange={setSiteId} />
          {defaultPageData?.homeType == 1 && defaultPageData?.customPagePath && (
            <Tooltip placement="top" title="大屏页">
              <IconScreen className={styles.screen} onClick={onScreenClick} />
            </Tooltip>
          )}
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
