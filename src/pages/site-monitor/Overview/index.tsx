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
import type { SiteDataType } from '@/services/station';
import { getSiteScreenConfig } from '@/services/station';
import SiteLabel from '@/components/SiteLabel';
import { formatMessage } from '@/utils';
import { getPowerFlow } from './service';

const Index: React.FC = () => {
  const [siteId, setSiteId] = useState<number>();
  const [siteType, setSiteType] = useState<string | undefined>('');

  const { data: screenConfig, run: runGetSiteConfig } = useRequest(getSiteScreenConfig, {
    manual: true,
  });

  const { data: powerFlowData, run } = useRequest(getPowerFlow, {
    manual: true,
    pollingInterval: 16 * 1000,
  });

  const onChange = useCallback((data: SiteDataType) => {
    if (data?.id) {
      setSiteId(Number(data.id));
    }
    setSiteType(data.energyOptions);
  }, []);

  useEffect(() => {
    if (siteId) {
      run({ siteId });
      runGetSiteConfig({ siteId });
    }
  }, [siteId]);

  const onScreenClick = useCallback(() => {
    if (siteId) {
      const screen = screenConfig?.screen?.find?.((item) => item.url);
      window.open(`${screen?.url || '/screen/demo-station'}?id=${siteId}`);
    } else {
      message.success(
        formatMessage({ id: 'siteMonitor.selectSite', defaultMessage: '请选择站点' }),
      );
    }
  }, [siteId, screenConfig]);

  return (
    <>
      <div className="bg-white card-wrap p24">
        <div className={styles.stationHeader}>
          <SiteLabel onChange={onChange} isShowSafeDay={true} />
          {screenConfig?.status == 1 && (
            <>
              <Tooltip
                placement="top"
                title={formatMessage({ id: 'siteMonitor.screen', defaultMessage: '大屏页' })}
              >
                <IconScreen className={styles.screen} onClick={onScreenClick} />
              </Tooltip>
            </>
          )}
        </div>
        <Row gutter={[16, 16]}>
          <Statistics siteId={siteId} siteType={siteType} data={powerFlowData} />
          <EnergyFlow siteId={siteId} siteType={siteType} data={powerFlowData} />
          <Benefit siteId={siteId} />
          <ElectricityChart siteId={siteId} />
          <SiteInfo siteId={siteId} siteType={siteType} />
        </Row>
      </div>
    </>
  );
};

export default Index;
