import { getSystemDiagram } from '@/pages/site-monitor/Overview/EnergyFlow/service';
import { useRequest } from 'umi';
import Cell from '../../components/LayoutCell';
import { getSiteId } from '../helper';
import RealTimeData from './RealTimeData';
import Subject from './Subject';
import styles from './index.less';
import type { UnitType } from '@/models/siteType';

type GeometrySystemProps = {
  siteTypeConfig: UnitType;
};

const GeometrySystem = (props: GeometrySystemProps) => {
  const { siteTypeConfig } = props;
  const { data } = useRequest(() => getSystemDiagram(getSiteId() as string));
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
      <Subject data={data} siteTypeConfig={siteTypeConfig} />
      <RealTimeData data={data} siteTypeConfig={siteTypeConfig} />
    </Cell>
  );
};

export default GeometrySystem;
