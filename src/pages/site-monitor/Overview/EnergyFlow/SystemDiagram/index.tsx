import { ReactComponent as SVGStaticUp } from './svg/SVGStatic3.svg';
import { ReactComponent as SVGT } from './svg/svgT.svg';
import { ReactComponent as SVGX } from './svg/svgX.svg';
import IconDot25 from './svg/dot2.5.png';
import SVGActive from './SVGActive';
import AnimationDiagram from '../AnimationDiagram';
import styles from './index.less';
import { useRequest } from 'umi';
import { getSystemDiagram } from '../service';
import React, { useEffect, useMemo, useState } from 'react';
import { isNil, merge, mergeWith } from 'lodash';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { useWatchingAlarmForSystem } from './useWatchingAlarmForSystem';
import { SiteTypeStrEnum } from '@/utils/enum';
import { PowerFlowDataType } from '../../typing';

type SystemDiagramType = {
  siteId: number;
  siteType: SiteTypeStrEnum;
  data: PowerFlowDataType;
};

const SystemDiagram: React.FC<SystemDiagramType> = (props) => {
  const { siteId, siteType, data: powerFlowData } = props;

  const { data, run } = useRequest(getSystemDiagram, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const mergedData = useMemo(() => {
    const result = powerFlowData?.list?.reduce?.((res, item) => {
      return {
        ...res,
        [item.type || '']: item,
      };
    }, {});
    return merge({}, data, result);
  }, [data, powerFlowData]);

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
            <img className={styles.dot} src={IconDot25} />
          </>,
        );
        break;
      case SiteTypeStrEnum.CS:
        setSvgLine(
          <>
            <SVGStaticUp style={{ width: 261, height: 370, marginLeft: 116 }} />
            <img className={styles.dot} src={IconDot25} style={{ top: 235, left: 231 }} />
          </>,
        );
        break;
      default:
        setSvgLine(
          <>
            <SVGX style={{ width: 248, height: 179, marginLeft: 102, marginTop: 40 }} />
            <img className={styles.dot} src={IconDot25} style={{ top: 120, left: 211 }} />
          </>,
        );
    }
  }, [siteType]);
  return (
    <>
      <div
        className={styles.systemDiagram}
        style={
          [SiteTypeStrEnum.CS, SiteTypeStrEnum.PV_ES, SiteTypeStrEnum.PV_ES_CS].includes(siteType)
            ? {
                top: '36px',
              }
            : {}
        }
      >
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
          <AnimationDiagram data={mergedData} siteType={siteType} />
        </div>
      </div>
      <SVGActive
        data={mergedData}
        siteType={siteType}
        alarmData={alarmSubsystemTree}
        siteId={siteId}
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
