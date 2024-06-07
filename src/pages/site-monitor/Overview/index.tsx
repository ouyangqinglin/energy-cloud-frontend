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
import { formatMessage } from '@/utils';
import RealTimePower from './RealTimePower';
import ElectricityStatistics from './ElectricityStatistics';
import { SiteTypeStrEnum } from '@/utils/enum';

const Index: React.FC = () => {
  const [siteId, setSiteId] = useState<number>();
  const [siteType, setSiteType] = useState<string | undefined>('');

  const { data: screenConfig, run } = useRequest(getSiteScreenConfig, {
    manual: true,
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
    }
  }, [siteId]);

  const onScreenClick = useCallback(() => {
    if (siteId) {
      // if (screenConfig && screenConfig.screen) {
      //   let screenArr = screenConfig.screen;
      //   let url = screenArr[0].url;
      //   let screenUrl = `${url}?id=${siteId}`;
      //   window.open(screenUrl);
      // }
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
          {/* {screenConfig?.status != 1 && (
            <>
            <Tooltip placement="top" title="定制大屏页">
              <IconScreen className={styles.screen} onClick={onScreenClick} />
            </Tooltip>
            </>
          )} */}
        </div>
        <Row gutter={[16, 16]}>
          <Statistics siteId={siteId} siteType={siteType} />
          <EnergyFlow siteId={siteId} siteType={siteType} />
          {[SiteTypeStrEnum.CS].includes(siteType) ? (
            <>
              <RealTimePower siteId={siteId} />
              <ElectricityStatistics siteId={siteId} />
            </>
          ) : (
            <>
              <Benefit siteId={siteId} />
              <ElectricityChart siteId={siteId} />
            </>
          )}
          <SiteInfo siteId={siteId} siteType={siteType} />
        </Row>
      </div>
    </>
  );
};

export default Index;
