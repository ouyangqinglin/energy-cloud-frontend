import { ReactComponent as SVGStatic } from './svg/SVGStatic.svg';
import SVGActive from './SVGActive';
import AnimationDiagram from '../AnimationDiagram';
import styles from './index.less';
import { useRequest } from 'umi';
import { getSystemDiagram } from '../service';
import { useEffect } from 'react';
import { isNil } from 'lodash';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { useWatchingAlarmForSystem } from './useWatchingAlarmForSystem';
const SystemDiagram = ({ siteId }: { siteId: number }) => {
  const { data, run } = useRequest(getSystemDiagram, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const { alarmSubsystemTree } = useWatchingAlarmForSystem(siteId);

  useEffect(() => {
    if (!isNil(siteId)) {
      run(siteId);
    }
  }, [run, siteId]);

  return (
    <>
      <div className={styles.systemDiagram}>
        <SVGStatic style={{ width: 557, height: 332 }} />

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
