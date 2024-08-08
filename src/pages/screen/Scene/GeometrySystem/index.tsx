import {
  getSystemDiagram,
  getSystemPowerDiagram,
} from '@/pages/site-monitor/Overview/EnergyFlow/service';
import { useRequest } from 'umi';
import Cell from '../../components/LayoutCell';
import { getSiteId } from '../helper';
import RealTimeData from './RealTimeData';
import Subject from './Subject';
import styles from './index.less';
import type { UnitType } from '@/models/siteType';
import { useMemo } from 'react';
import { merge } from 'lodash';

type GeometrySystemProps = {
  siteTypeConfig: UnitType;
};

const GeometrySystem = (props: GeometrySystemProps) => {
  const { siteTypeConfig } = props;
  const { data } = useRequest(() => getSystemDiagram(getSiteId() as string));
  const { data: powerData } = useRequest(() => getSystemPowerDiagram(getSiteId() as string), {
    pollingInterval: 15 * 1000,
  });

  const mergedData = useMemo(() => {
    const result = powerData?.list?.reduce?.((res, item) => {
      return {
        ...res,
        [item.type || '']: item,
      };
    }, {});
    return merge({}, data, result);
  }, [data, powerData]);
  return (
    <Cell
      width={972}
      height={576}
      left={474}
      top={305}
      zIndex={0}
      className={styles.wrapper}
      cursor="default"
    >
      <Subject data={mergedData} siteTypeConfig={siteTypeConfig} />
      <RealTimeData data={mergedData} siteTypeConfig={siteTypeConfig} />
    </Cell>
  );
};

export default GeometrySystem;
