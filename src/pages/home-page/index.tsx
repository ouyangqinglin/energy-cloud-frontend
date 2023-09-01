import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Carousel, Tabs, Tooltip } from 'antd';
import styles from './index.less';
import SliderCard from './components/SliderCard';
import { config } from './config';
import ChartELEC from './components/ChartElec';
import ChartPV from './components/ChartPV';
import ChartES from './components/ChartES';
import ChartCS from './components/ChartCS';
import ChartEI from './components/ChartEI';
import ChartBox from './components/ChartBox';
import { ReactComponent as IconScreen } from '@/assets/image/station/overview/icon_全屏可视化.svg';
import {
  getAlarmMonitoring,
  getEconomicBenefit,
  getElectricStack,
  getEnvironmentalRevenueIndex,
  getEssIndex,
  getPhotovoltaicIndex,
  getPowerStationOverview,
} from './service';
import { assign } from 'lodash';
import { useModel } from 'umi';
import { SiteTypeEnum } from '@/utils/dictionary';
import { TabsProps } from 'rc-tabs';

export const enum SubSystemType {
  PV = 0,
  ES,
  EI,
  CS,
  ELEC,
}

const HomePage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { siteType } = useModel('site', (model) => ({ siteType: model?.state?.siteType }));
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const [statistic, setStatistic] = useState({});

  const getStatisticData = useCallback(
    async (params: { energyOptions?: string }) =>
      await Promise.all([
        getPowerStationOverview(params).then((res) => {
          let originalData: Record<string, any> = {
            pvAndEssAndChargePowerStationCount: '--',
            pvAndEssPowerStationCount: '--',
            essAndChargePowerStationCount: '--',
            pvPowerStationCount: '--',
            essPowerStationCount: '--',
            chargePowerStationCount: '--',
          };
          switch (siteType) {
            case SiteTypeEnum.PV + '':
              originalData.pvPowerStationCount = res?.data?.pvPowerStationCount;
              break;
            case SiteTypeEnum.ES + '':
              originalData.essPowerStationCount = res?.data?.essPowerStationCount;
              break;
            case SiteTypeEnum.CS + '':
              originalData.chargePowerStationCount = res?.data?.chargePowerStationCount;
              break;
            case SiteTypeEnum.ES_CS + '':
              originalData.essAndChargePowerStationCount = res?.data?.essAndChargePowerStationCount;
              break;
            case SiteTypeEnum.PV_ES + '':
              originalData.pvAndEssPowerStationCount = res?.data?.pvAndEssPowerStationCount;
              break;
            case SiteTypeEnum.PV_ES_CS + '':
              originalData.pvAndEssAndChargePowerStationCount =
                res?.data?.pvAndEssAndChargePowerStationCount;
              break;
            default:
              originalData = {};
          }
          res.data = Object.assign({}, res.data, originalData);
          return res;
        }),
        getPhotovoltaicIndex(params),
        getEssIndex(params),
        getAlarmMonitoring(params),
        getEconomicBenefit(params),
        getEnvironmentalRevenueIndex(params),
        getElectricStack(params),
      ]),
    [siteType],
  );

  const onScreenClick = useCallback(() => {
    window.open(`/screen/multi-site`);
  }, []);

  useEffect(() => {
    getStatisticData(siteType ? { energyOptions: siteType } : {}).then((res) => {
      const rawData = {};
      res.forEach(({ data }) => {
        if (!data) {
          return;
        }
        assign(rawData, data);
      });
      setStatistic({ ...rawData });
    });
  }, [getStatisticData, siteType]);

  const items = useMemo(() => {
    const result: React.ReactNode[] = [];
    config.forEach((item) => {
      if (item.field == 'pvGeneratedPower') {
        if (
          [SiteTypeEnum.ES + '', SiteTypeEnum.CS + '', SiteTypeEnum.ES_CS + ''].includes(
            siteType || '',
          )
        ) {
          return;
        }
      } else if (item.field == 'essGeneratedPower') {
        if ([SiteTypeEnum.PV + '', SiteTypeEnum.CS + ''].includes(siteType || '')) {
          return;
        }
      } else if (item.field == 'chargePower') {
        if (
          [SiteTypeEnum.PV + '', SiteTypeEnum.ES + '', SiteTypeEnum.PV_ES + ''].includes(
            siteType || '',
          )
        ) {
          return;
        }
      }
      result.push(
        <div key={item.title} style={styles.sliderItem}>
          <SliderCard data={statistic} config={item} />
        </div>,
      );
    });
    if (4 < result.length && result.length < 8) {
      const nextPageItems = result.slice(4, 8);
      const fillPageItems = result.slice(4 - (4 - nextPageItems.length), 4);
      return [...result.slice(0, 4), ...fillPageItems, ...nextPageItems];
    }
    return result;
  }, [siteType, statistic]);

  const tabsItem = useMemo(() => {
    const result: TabsProps['items'] = [];
    result.push({
      label: `市电`,
      key: '5',
      children: <ChartBox siteType={siteType} type={SubSystemType.ELEC} Chart={ChartELEC} />,
    });
    if (
      ![SiteTypeEnum.ES + '', SiteTypeEnum.CS + '', SiteTypeEnum.ES_CS + ''].includes(
        siteType || '',
      )
    ) {
      result.push({
        label: `光伏`,
        key: '1',
        children: <ChartBox siteType={siteType} type={SubSystemType.PV} Chart={ChartPV} />,
      });
    }
    if (![SiteTypeEnum.PV + '', SiteTypeEnum.CS + ''].includes(siteType || '')) {
      result.push({
        label: `储能`,
        key: '2',
        children: <ChartBox siteType={siteType} type={SubSystemType.ES} Chart={ChartES} />,
      });
    }
    if (
      ![SiteTypeEnum.PV + '', SiteTypeEnum.ES + '', SiteTypeEnum.PV_ES + ''].includes(
        siteType || '',
      )
    ) {
      result.push({
        label: `充电桩`,
        key: '4',
        children: <ChartBox siteType={siteType} type={SubSystemType.CS} Chart={ChartCS} />,
      });
    }
    result.push({
      label: `收益`,
      key: '3',
      children: <ChartBox siteType={siteType} type={SubSystemType.EI} Chart={ChartEI} />,
    });
    return result;
  }, [siteType]);

  return (
    <div ref={ref} className={`bg-white card-wrap p24 ${styles.page}`}>
      <Tooltip placement="top" title="大屏页">
        <IconScreen className={styles.screen} onClick={onScreenClick} />
      </Tooltip>
      <Carousel className={styles.sliderWrapper} slidesPerRow={4} afterChange={onChange}>
        {items}
      </Carousel>
      <Tabs className={styles.chartCard} items={tabsItem} />
    </div>
  );
};

export default HomePage;
