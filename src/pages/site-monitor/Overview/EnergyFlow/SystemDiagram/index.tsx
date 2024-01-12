import { ReactComponent as SVGStatic } from './svg/SVGStatic.svg';
import { ReactComponent as SVGStatic23 } from './svg/SVGStatic23.svg';
import { ReactComponent as SVGStatic3 } from './svg/SVGStatic3.svg';
import SVGActive from './SVGActive';
import AnimationDiagram from '../AnimationDiagram';
import styles from './index.less';
import { useRequest } from 'umi';
import { getSystemDiagram } from '../service';
import { useEffect, useState } from 'react';
import { isNil } from 'lodash';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { useWatchingAlarmForSystem } from './useWatchingAlarmForSystem';
const SystemDiagram = ({ siteId, siteType }: { siteId: number; siteType: string }) => {
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
      case '23':
      case '13':
      case '1':
      case '2':
        setSvgLine(() => <SVGStatic23 style={{ width: 289, height: 209, marginLeft: 90 }} />);
        break;
      case '3':
        setSvgLine(() => <SVGStatic3 style={{ width: 261, height: 370, marginLeft: 116 }} />);
        break;
      default:
        setSvgLine(() => <SVGStatic style={{ width: 557, height: 332 }} />);
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
          <AnimationDiagram data={data} />
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
