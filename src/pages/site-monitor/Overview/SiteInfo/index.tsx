import { Tooltip } from 'antd';
import BackgroundImg from '@/assets/image/station/overview/img_home.png';
import RowBox from '../components/RowBox';
import styles from './index.less';
import { useRequest } from 'umi';
import { getStationInfo } from './service';
import { isNil } from 'lodash';
import { useEffect } from 'react';

const SiteInfo = ({ siteId }: { siteId?: number }) => {
  const { data, run } = useRequest(getStationInfo, {
    manual: true,
  });

  useEffect(() => {
    if (!isNil(siteId)) {
      run(siteId);
    }
  }, [run, siteId]);

  const getAlarm = (alarmKey?: number) => {
    switch (alarmKey) {
      case 0:
        return '正常';

      case 1:
        return '告警';

      default:
        return '--';
    }
  };

  return (
    <RowBox span={6} className={styles.siteInfo}>
      <ul className={styles.desc}>
        <li>
          <div className={styles.label}>电站名称：</div>
          <div className={styles.value}>{data?.name ?? '--'}</div>
        </li>
        <li>
          <div className={styles.label}>地理位置：</div>
          <Tooltip placement="topRight" title={'广东省深圳市龙华区观盛五路永泰科技园'}>
            <div className={styles.value}>{data?.address ?? '--'}</div>
          </Tooltip>
        </li>
        <li>
          <div className={styles.label}>电站状态：</div>
          <div className={styles.value}>{getAlarm(data?.siteAlarmStatus)}</div>
        </li>
        <li>
          <div className={styles.label}>组件总容量：</div>
          <div className={styles.value}>{data?.photovoltaicInstalledCapacity ?? '--'}kWp</div>
        </li>
        <li>
          <div className={styles.label}>储能容量：</div>
          <div className={styles.value}>{`${data?.energyStoragePower ?? '--'}kW/ ${
            data?.energyStorageCapacity ?? '--'
          }kWh`}</div>
        </li>
        <li>
          <div className={styles.label}>并网时间：</div>
          <div className={styles.value}>{data?.createTime ?? '--'}</div>
        </li>
      </ul>
      <div className={styles.img}>
        <img className={styles.innerImg} src={BackgroundImg} />
      </div>
    </RowBox>
  );
};

export default SiteInfo;
