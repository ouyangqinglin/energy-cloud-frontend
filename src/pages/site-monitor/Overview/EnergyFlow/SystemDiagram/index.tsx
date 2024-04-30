import { ReactComponent as SVGStatic } from './svg/SVGStatic.svg';
import { ReactComponent as SVGStatic23 } from './svg/SVGStatic23.svg';
import { ReactComponent as SVGStaticUp } from './svg/SVGStatic3.svg';
import { ReactComponent as SVGT } from './svg/svgT.svg';
import { ReactComponent as SVGX } from './svg/svgX.svg';
import IconDot from './svg/dot.png';
import SVGActive from './SVGActive';
import AnimationDiagram from '../AnimationDiagram';
import styles from './index.less';
import { useRequest } from 'umi';
import { getSystemDiagram } from '../service';
import { useEffect, useState } from 'react';
import { isNil } from 'lodash';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { useWatchingAlarmForSystem } from './useWatchingAlarmForSystem';
import { SiteTypeStrEnum } from '@/utils/dict';
const SystemDiagram = ({ siteId, siteType }: { siteId: number; siteType: SiteTypeStrEnum }) => {
  const { data, run } = useRequest(getSystemDiagram, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const { alarmSubsystemTree } = useWatchingAlarmForSystem(siteId);
  const [svgLine, setSvgLine] = useState(<></>);

  useEffect(() => {
    if (!isNil(siteId)) {
      run(siteId);
    }
  }, [run, siteId]);

  useEffect(() => {
    switch (siteType) {
      case SiteTypeStrEnum.ES_CS:
      case SiteTypeStrEnum.PV_CS:
      case SiteTypeStrEnum.PV:
      case SiteTypeStrEnum.ES:
        setSvgLine(
          <>
            <SVGT style={{ width: 283, height: 209, marginLeft: 90 }} />
            <img className={styles.dot} src={IconDot} />
          </>,
        );
        break;
      case SiteTypeStrEnum.CS:
        setSvgLine(
          <>
            <SVGStaticUp style={{ width: 261, height: 370, marginLeft: 116 }} />
            <img className={styles.dot} src={IconDot} style={{ top: 232, left: 234 }} />
          </>,
        );
        break;
      default:
        setSvgLine(
          <>
            <SVGX style={{ width: 248, height: 179, marginLeft: 102, marginTop: 40 }} />
            <img className={styles.dot} src={IconDot} style={{ top: 117, left: 213 }} />
          </>,
        );
    }
  }, [siteType]);
  return (
    <>
      <div className={styles.systemDiagram}>
        {svgLine}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: 332,
            top: 0,
            left: 0,
          }}
        >
          <AnimationDiagram data={data} siteType={siteType} />
        </div>
      </div>
      <SVGActive
        data={data}
        siteType={siteType}
        alarmData={alarmSubsystemTree}
        style={{
          position: 'absolute',
          width: '100%',
          height: 332,
          top: 0,
          left: 0,
        }}
      />
    </>
  );
};

export default SystemDiagram;
