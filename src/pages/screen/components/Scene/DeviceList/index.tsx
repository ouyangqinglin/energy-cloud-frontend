import { flatten, uniqueId } from 'lodash';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useRequest } from 'umi';
import Decoration from '../../Decoration';
import Cell from '../../LayoutCell';
import styles from './index.module.less';
import { DeviceListRes, getDeviceList } from './service';

const DeviceList: FC = () => {
  const [bodyData, setBodyData] = useState([
    ['光伏', ['逆变器', '光伏模组'], ['2', '280']],
    ['储能', ['Smart215-P0100A'], ['1']],
    ['充电桩', ['120kW', '160kW', '600kW'], ['1', '1', '1']],
  ]);
  const tableConfig = {
    header: ['子系统', '设备名称', '数量'],
  };

  // const combineIntoBodyData = (deviceList: DeviceListRes) => {
  //   deviceList.map();
  // };

  const { data: deviceList } = useRequest(getDeviceList);
  if (deviceList) {
  }

  const headerCeils: ReactNode[] = [];
  const renderHeader = () => {
    tableConfig.header.forEach((item) => {
      headerCeils.push(
        <div key={item} className={styles.header}>
          <span>{item}</span>
        </div>,
      );
    });
  };
  renderHeader();

  const bodyCeils: ReactNode[] = [];
  const renderBody = () => {
    console.log(bodyData);
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
  };
  renderBody();

  // useEffect(() => {
  //   renderBody();
  // }, [bodyData]);

  return (
    <Cell width={400} height={300} left={24} top={432}>
      <Decoration title="设备列表">
        <div className={styles.table}>
          {headerCeils}
          {bodyCeils}
        </div>
      </Decoration>
    </Cell>
  );
};
export default DeviceList;
