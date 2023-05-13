import { flatten, uniqueId } from 'lodash';
import type { FC, ReactNode } from 'react';
import { useRequest } from 'umi';
import Decoration from '../../Decoration';
import Cell from '../../LayoutCell';
import { DEFAULT_DATA } from './config';
import styles from './index.module.less';
import type { DeviceListRes } from './type';
import { getDeviceList } from './service';

type BodyDataMap = Map<number, { name: string; children: DeviceListRes }>;
type BodyDataArray = [string, string[], string[]][];

const DeviceList: FC = () => {
  let bodyData = DEFAULT_DATA.bodyData;

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
    bodyData = res;
  }

  const renderHeader = () => {
    const headerCeils: ReactNode[] = [];
    DEFAULT_DATA.header.forEach((item) => {
      headerCeils.push(
        <div key={item} className={styles.header}>
          <span>{item}</span>
        </div>,
      );
    });
    return headerCeils;
  };
  const renderBody = () => {
    // console.log(bodyData);
    const bodyCeils: ReactNode[] = [];
    flatten(bodyData).forEach((item) => {
      const renderGridChild: ReactNode[] = [];
      if (Array.isArray(item)) {
        item.forEach((child) => {
          renderGridChild.push(<div key={uniqueId()}>{child}</div>);
        });
      }
      bodyCeils.push(
        <div key={uniqueId()} className={styles.cell}>
          {renderGridChild.length ? renderGridChild : <span>{item}</span>}
        </div>,
      );
    });
    return bodyCeils;
  };

  return (
    <Cell cursor="default" width={400} height={300} left={24} top={432}>
      <Decoration title="设备列表">
        <div className={styles.table}>
          {renderHeader()}
          {renderBody()}
        </div>
      </Decoration>
    </Cell>
  );
};
export default DeviceList;
