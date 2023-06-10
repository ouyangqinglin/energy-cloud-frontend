import type { FC } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';
import type { DeviceListRes } from './type';
import { getDeviceList } from './service';
import QueueAnim from 'rc-queue-anim';
import DeviceCard from './component/DeviceCard';
import { config } from './config';

type BodyDataMap = Map<number, { name: string; children: DeviceListRes }>;
type BodyDataArray = [string, string[], string[]][];

const StationDevices: FC = () => {
  let bodyData: BodyDataArray;

  const { data: deviceList } = useRequest(getDeviceList);
  const combineIntoBodyData = (devices: DeviceListRes) => {
    const combineBodyMap: BodyDataMap = new Map();
    devices.reduce((collection, device) => {
      if (!device.display) {
        return collection;
      }

      const cache = collection.get(device.subsystemId);
      if (cache) {
        cache.children.push(device);
      } else {
        collection.set(device.subsystemId, { name: device.subsystemName, children: [device] });
      }
      return collection;
    }, combineBodyMap);

    const result: BodyDataArray = [];

    if (combineBodyMap.size) {
      combineBodyMap.forEach((item) => {
        const names: string[] = [];
        const values: string[] = [];

        const { children } = item;
        if (!children.length) {
          return;
        }

        children.forEach((child) => {
          names.push(child.model);
          values.push(child.number.toString());
        });
        result.push([item.name, names, values]);
      });
    }
    return result;
  };
  if (deviceList) {
    const res = combineIntoBodyData(deviceList);
    bodyData = res.reverse();
  }

  const renderCommonListItem = config.map((item) => {
    return <DeviceCard key={item.title} {...item} />;
  });

  return <div className={styles.deviceWrapper}>{renderCommonListItem}</div>;
};
export default StationDevices;
