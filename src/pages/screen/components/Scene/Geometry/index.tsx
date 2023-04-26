import { FC, PureComponent, useState } from 'react';
import { createElement } from 'react';
import Cell from '../../LayoutCell';
import { CellList } from './config';
export type CellConfigItem = {
  key: string;
  cellStyle: CellStyle;
  component: PureComponent;
  default: PureComponent;
  active: PureComponent;
  hover: PureComponent;
};

export type CellStyle = {
  width: number;
  height: number;
  left: number;
  top: number;
};

const enum EventType {
  CLICK,
  MOUSE_OUT,
  MOUSE_ENTER,
}

const Geometry: FC = () => {
  const [configs, setConfigs] = useState(CellList);

  const handleGeometry = (cell: CellConfigItem, eventType: EventType) => {
    const newCell = { ...cell };
    const newConfigs = [...configs];
    if (eventType === EventType.CLICK) {
      newCell.component = newCell.active;
      newConfigs[configs.indexOf(cell)] = newCell;
      setConfigs(newConfigs);
    }
  };

  return createElement(
    'div',
    {},
    configs.map((cell) => {
      return createElement(
        Cell,
        {
          key: cell.key,
          onClick: () => {
            handleGeometry(cell, EventType.CLICK);
          },
          onMouseOut: () => {
            handleGeometry(cell, EventType.MOUSE_OUT);
          },
          onMouseEnter: () => {
            handleGeometry(cell, EventType.MOUSE_ENTER);
          },
          ...cell.cellStyle,
        },
        createElement(cell.component, { ...cell.cellStyle }),
      );
    }),
  );
};
export default Geometry;
