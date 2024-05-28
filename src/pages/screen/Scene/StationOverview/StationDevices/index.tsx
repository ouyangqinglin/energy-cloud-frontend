import { useEffect } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';
import { getDeviceNum } from './service';
import DeviceCard from '../component/DeviceCard';
import type { DeviceConfigItem } from '../component/type';
import type { CombineDeviceRes, SiteInfoRes } from '../type';
import { isEmpty } from 'lodash';

const StationDevices = ({ data, config }: { data: SiteInfoRes; config: DeviceConfigItem[] }) => {
  const { data: deviceListNum, run, cancel } = useRequest(getDeviceNum, { manual: true });
  const combineData = { ...data } as CombineDeviceRes;
  if (!isEmpty(deviceListNum)) {
    Object.assign(combineData, deviceListNum);
  }

  useEffect(() => {
    run();
    return () => {
      cancel();
    };
  }, []);

  const renderCommonListItem = config.map((item) => {
    return <DeviceCard data={combineData} key={item.title} {...item} />;
  });

  return <div className={styles.deviceWrapper}>{renderCommonListItem}</div>;
};
export default StationDevices;
