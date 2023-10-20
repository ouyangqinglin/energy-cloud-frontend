import React, { useCallback, useState, useEffect } from 'react';
import { message, Row, Tooltip } from 'antd';
import { useRequest } from 'umi';
import styles from './index.less';
import Statistics from './Statistics';
import EnergyFlow from './EnergyFlow';
import SiteInfo from './SiteInfo';
import Benefit from './Benefits';
import ElectricityChart from './ElectricityChart';
import { ReactComponent as IconScreen } from '@/assets/image/station/overview/icon_全屏可视化.svg';
import { SiteDataType, getSiteScreenConfig } from '@/services/station';
import SiteLabel from '@/components/SiteLabel';

const Index: React.FC = () => {
  const [siteId, setSiteId] = useState<number>();

  const { data: screenConfig, run } = useRequest(getSiteScreenConfig, {
    manual: true,
  });

  const onChange = useCallback((data: SiteDataType) => {
    if (data?.id) {
      setSiteId(Number(data.id));
    }
  }, []);

  useEffect(() => {
    if (siteId) {
      run({ siteId });
    }
  }, [siteId]);

  const onScreenClick = useCallback(() => {
    if (siteId) {
      window.open(`/screen/demo-station?id=${siteId}`);
    } else {
      message.success('请选择站点');
    }
  }, [siteId]);

 const onCustomScreenClick = useCallback(() => {
  if (siteId) {
    window.open(`/screen/jiecheng?id=${siteId}`);
  } else {
    message.success('请选择站点');
  }
}, [siteId]);

  return (
    <>
      <div className="bg-white card-wrap p24">
        <div className={styles.stationHeader}>
          <SiteLabel onChange={onChange} />
          {screenConfig?.status == 1 && (
            <>
            <Tooltip placement="top" title="大屏页">
              <IconScreen className={styles.screen} onClick={onScreenClick} />
            </Tooltip>
            <Tooltip placement="top" title="定制大屏页">
              <IconScreen className={styles.screen} onClick={onCustomScreenClick} />
            </Tooltip>
            </>
          )}
          {/* {screenConfig?.status != 1 && (
            <>
            <Tooltip placement="top" title="定制大屏页">
              <IconScreen className={styles.screen} onClick={onScreenClick} />
            </Tooltip>
            </>
          )} */}
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
