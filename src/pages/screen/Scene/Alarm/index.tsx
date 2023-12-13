import Alarm from '@/components/ScreenDialog/Alarm';
import { notification } from 'antd';
import { FC, useState } from 'react';
import { useEffect } from 'react';
import Cell from '../../components/LayoutCell';
import { getSiteId } from '../helper';
import styles from './index.less';
import AlarmIcon from '@/assets/image/screen/alarm/告警状态_BG@2x.png';
import AlarmNormalIcon from '@/assets/image/screen/alarm/BG_正常@2x.png';
import { DeviceAlarm } from './type';
import { formatMessage } from '@/utils';

const AlarmInfo = ({
  alarmCount,
  latestAlarm,
}: {
  alarmCount: number;
  latestAlarm?: DeviceAlarm;
}) => {
  const [alarmOpen, setAlarmOpen] = useState(false);
  const switchAlarm = () => {
    setAlarmOpen(!alarmOpen);
  };

  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    notification.config({
      getContainer: () => document.querySelector('#screen'),
      maxCount: 1,
      props: {
        style: {
          zIndex: 999,
        },
      },
    });
  }, []);

  useEffect(() => {
    if (alarmCount) {
      api?.open({
        icon: (
          <div className={styles.icon}>
            <span>{formatMessage({ id: 'common.notice', defaultMessage: '通知' })}</span>
          </div>
        ),
        className: styles.alarmNotification,
        message: <div className={styles.content}>{latestAlarm?.content}</div>,
        duration: null,
      });
    }
  }, [api, alarmCount, latestAlarm]);

  const onChange = () => {
    switchAlarm();
  };

  const shouldAlarm = alarmCount;

  return (
    <Cell cursor="default" width={140} height={66} left={1308} top={249} zIndex={99999}>
      {contextHolder}
      <div
        onClick={onChange}
        className={styles.alarmWrapper}
        style={{
          backgroundImage: `url(${shouldAlarm ? AlarmIcon : AlarmNormalIcon})`,
          width: shouldAlarm ? 138 : 120,
          right: shouldAlarm ? 0 : -20,
        }}
      >
        {shouldAlarm ? (
          <span className={styles.alarmContent}>{formatMessage({ id: 'common.warning', defaultMessage: '告警'})}: {alarmCount}</span>
        ) : (
          <span className={styles.alarmContent} style={{ color: '#01cfa1', paddingLeft: 10 }}>
            {formatMessage({ id: 'common.normal', defaultMessage: '正常'})}
          </span>
        )}
      </div>
      <Alarm id={getSiteId() as string} open={alarmOpen} onCancel={switchAlarm} model="screen" />
    </Cell>
  );
};
export default AlarmInfo;
