import Alarm from '@/components/ScreenDialog/Alarm';
import { notification } from 'antd';
import { FC, useState } from 'react';
import { useEffect } from 'react';
import { useRequest } from 'umi';
import Cell from '../../components/LayoutCell';
import { getSiteId } from '../helper';
import styles from './index.less';

const AlarmInfo: FC = () => {
  notification.config({
    getContainer: () => document.querySelector('#screen'),
    maxCount: 1,
  });
  const [alarmOpen, setAlarmOpen] = useState(false);
  const switchAlarm = () => {
    setAlarmOpen(!alarmOpen);
  };

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    api?.open({
      icon: (
        <div className={styles.icon}>
          <span>通知</span>
        </div>
      ),
      className: styles.alarmNotification,
      message: <div className={styles.content}>编号#2#3充电枪线流短</div>,
      duration: null,
    });
  }, [api]);

  const onChange = () => {
    switchAlarm();
    // api?.open({
    //   icon: (
    //     <div className={styles.icon}>
    //       <span>通知</span>
    //     </div>
    //   ),
    //   className: styles.alarmNotification,
    //   message: <div className={styles.content}>编号#2#3充电枪线流短1111</div>,
    //   duration: null,
    // });
  };
  return (
    <Cell cursor="default" width={120} height={66} left={1328} top={249} zIndex={99999}>
      {contextHolder}
      <div onClick={onChange} className={styles.alarmWrapper}>
        <span className={styles.alarmContent}>告警: {3}</span>
      </div>
      <Alarm id={getSiteId() as string} open={alarmOpen} onCancel={switchAlarm} model="screen" />
    </Cell>
  );
};
export default AlarmInfo;
