import { flatten, uniqueId } from 'lodash';
import type { FC, ReactNode } from 'react';
import Decoration from '../../Decoration';
import Cell from '../../LayoutCell';
import styles from './index.module.less';

const DeviceList: FC = () => {
  const tableConfig = {
    header: ['子系统', '设备名称', '数量'],
    body: [
      ['光伏', ['逆变器', '光伏模组'], ['2', '280']],
      ['储能', ['Smart215-P0100A'], ['1']],
      ['充电桩', ['120kW', '160kW', '600kW'], ['1', '1', '1']],
    ],
  };

  const renderGrid: ReactNode[] = [];
  tableConfig.header.forEach((item) => {
    renderGrid.push(
      <div key={item} className={styles.header}>
        <span>{item}</span>
      </div>,
    );
  });
  flatten(tableConfig.body).forEach((item) => {
    const renderGridChild: ReactNode[] = [];
    if (Array.isArray(item)) {
      item.forEach((child) => {
        renderGridChild.push(<div key={uniqueId()}>{child}</div>);
      });
    }
    renderGrid.push(
      <div key={uniqueId()} className={styles.cell}>
        {renderGridChild.length ? renderGridChild : <span>{item}</span>}
      </div>,
    );
  });
  return (
    <Cell width={400} height={300} left={24} top={432}>
      <Decoration title="设备列表">
        <div className={styles.table}>{renderGrid}</div>
      </Decoration>
    </Cell>
  );
};
export default DeviceList;
