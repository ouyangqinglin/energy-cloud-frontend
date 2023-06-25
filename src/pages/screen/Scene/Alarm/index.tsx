import Alarm from '@/components/ScreenDialog/Alarm';
import { notification } from 'antd';
import { FC, useState } from 'react';
import { useEffect } from 'react';
import { useRequest } from 'umi';
import Cell from '../../components/LayoutCell';
import { getSiteId } from '../helper';
import styles from './index.less';
import useSubscribe from './useSubscribe';
import AlarmIcon from '@/assets/image/screen/alarm/告警状态_BG@2x.png';
import AlarmNormalIcon from '@/assets/image/screen/alarm/BG_正常@2x.png';

const AlarmInfo: FC = () => {
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

  const data = useSubscribe();
  useEffect(() => {
    const { length: alarmNum } = data;
    if (alarmNum) {
      const latestAlarm = data[alarmNum - 1];
      api?.open({
        icon: (
          <div className={styles.icon}>
            <span>通知</span>
          </div>
        ),
        className: styles.alarmNotification,
        message: <div className={styles.content}>{latestAlarm.content}</div>,
        duration: null,
      });
    }
  }, [api, data]);

  const onChange = () => {
    switchAlarm();
  };

  const shouldAlarm = data.length;

  return (
    <Cell cursor="default" width={140} height={66} left={1308} top={249} zIndex={99999}>
      {contextHolder}
      <div
        onClick={onChange}
        className={styles.alarmWrapper}
        style={{ backgroundImage: `url(${shouldAlarm ? AlarmIcon : AlarmNormalIcon})` }}
      >
        {shouldAlarm ? (
          <span className={styles.alarmContent}>告警: {data.length}</span>
        ) : (
          <span className={styles.alarmContent} style={{ color: '#01cfa1', paddingLeft: 10 }}>
            正常
          </span>
        )}
      </div>
      <Alarm id={getSiteId() as string} open={alarmOpen} onCancel={switchAlarm} model="screen" />
    </Cell>
  );
};
export default AlarmInfo;
