import { Tooltip } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import BackgroundImg from '@/assets/image/station/overview/img_home.png';
import RowBox from '../components/RowBox';
import styles from './index.less';
import { useRequest, useHistory } from 'umi';
import { getStationInfo } from './service';
import { isNil } from 'lodash';
import { useEffect, useState } from 'react';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { Carousel } from 'antd';
import { formatMessage } from '@/utils';
import { SiteTypeStrEnum } from '@/utils/enum';

const SiteInfo = ({ siteId, siteType = '' }: { siteId?: number; siteType: string }) => {
  const [photos, setPhotos] = useState(Array);
  const { data, run } = useRequest(getStationInfo, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });
  const history = useHistory();

  const onClick = () => {
    history.push({
      pathname: `/station/setting`,
      search: `?id=${siteId}`,
    });
  };

  useEffect(() => {
    if (!isNil(siteId)) {
      run(siteId);
    }
  }, [run, siteId]);

  useEffect(() => {
    setPhotos(data?.photos?.split?.(',') ?? []);
  }, [data]);

  const getAlarm = (alarmKey?: number) => {
    switch (alarmKey) {
      case 0:
        return formatMessage({ id: 'common.normal', defaultMessage: '正常' });

      case 1:
        return formatMessage({ id: 'common.warning', defaultMessage: '告警' });

      default:
        return '--';
    }
  };

  return (
    <RowBox span={6} className={styles.siteInfo}>
      <ul className={styles.desc}>
        <li>
          <div className={styles.label}>
            {formatMessage({ id: 'siteManage.siteList.siteName', defaultMessage: '站点名称' })}：
          </div>
          <Tooltip placement="topRight" title={data?.name ?? '--'}>
            <div className={styles.value}>{data?.name ?? '--'}</div>
          </Tooltip>
          <Tooltip
            placement="top"
            title={formatMessage({
              id: 'siteManage.siteList.siteConfig',
              defaultMessage: '站点配置',
            })}
          >
            <SettingOutlined className="cl-primary cursor" onClick={onClick} />
          </Tooltip>
        </li>
        <li>
          <div className={styles.label}>
            {formatMessage({ id: 'siteMonitor.address', defaultMessage: '地理位置' })}：
          </div>
          <Tooltip placement="topRight" title={data?.address ?? '--'}>
            <div className={styles.value}>{data?.address ?? '--'}</div>
          </Tooltip>
        </li>
        <li>
          <div className={styles.label}>
            {formatMessage({ id: 'siteManage.set.siteStatus', defaultMessage: '站点状态' })}：
          </div>
          <div className={styles.value}>{getAlarm(data?.siteAlarmStatus)}</div>
        </li>
        {siteType?.includes('1') ? (
          <li>
            <div className={styles.label}>
              {formatMessage({
                id: 'siteManage.siteList.totalPhotovoltaicCapacity',
                defaultMessage: '光伏总容量',
              })}
              ：
            </div>
            <div className={styles.value}>{data?.photovoltaicInstalledCapacity ?? '--'}kWp</div>
          </li>
        ) : (
          ''
        )}
        {[SiteTypeStrEnum.CS].includes(siteType) ? (
          <li>
            <div className={styles.label}>
              {formatMessage({
                id: 'siteManage.siteList.chargingStationCapacity',
                defaultMessage: '充电桩总功率',
              })}
              ：
            </div>
            <div className={styles.value}>{`${data?.chargingStationCapacity ?? '--'}kW`}</div>
          </li>
        ) : (
          <li>
            <div className={styles.label}>
              {formatMessage({
                id: 'siteManage.siteList.totalEnergyStorageCapacity',
                defaultMessage: '储能总容量',
              })}
              ：
            </div>
            <div className={styles.value}>{`${data?.energyStoragePower ?? '--'}kW/ ${
              data?.energyStorageCapacity ?? '--'
            }kWh`}</div>
          </li>
        )}
        <li>
          <div className={styles.label}>
            {formatMessage({ id: 'siteMonitor.gridTime', defaultMessage: '交付时间' })}：
          </div>
          <div className={styles.value}>{data?.deliveryTime ?? '--'}</div>
        </li>
      </ul>

      {photos?.length > 1 ? (
        <Carousel autoplay dotPosition="bottom">
          {photos.map((item: any) => {
            return <img className={styles.innerImg} src={item} />;
          })}
        </Carousel>
      ) : (
        <div className={styles.img}>
          <img className={styles.innerImg} src={photos[0] || BackgroundImg} />
        </div>
      )}
    </RowBox>
  );
};

export default SiteInfo;
