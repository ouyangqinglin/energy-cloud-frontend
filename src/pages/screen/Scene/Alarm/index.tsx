import { notification } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useRequest } from 'umi';
import Cell from '../../components/LayoutCell';
import styles from './index.less';

const Alarm: FC = () => {
  notification.config({
    getContainer: () => document.querySelector('#screen'),
    maxCount: 1,
  });
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
    api?.open({
      icon: (
        <div className={styles.icon}>
          <span>通知</span>
        </div>
      ),
      className: styles.alarmNotification,
      message: <div className={styles.content}>编号#2#3充电枪线流短1111</div>,
      duration: null,
    });
  };
  return (
    <Cell cursor="default" width={120} height={66} left={1328} top={249}>
      {contextHolder}
      <div className={styles.alarmWrapper}>
        <span onClick={onChange} className={styles.alarmContent}>
          告警: {3}
        </span>
      </div>
    </Cell>
  );
};
export default Alarm;
