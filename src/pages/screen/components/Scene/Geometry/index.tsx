import type { FC, PureComponent, ReactNode } from 'react';
import { useState } from 'react';
import ChargeDialog from '../../ChargeDialog';
import Cell from '../../LayoutCell';
import { CellList } from './config';
// import { Component as EnergyFlow } from '@/assets/image/screen/scenes/能流图@2x.svg';
export type CellConfigItem = {
  key: string;
  cellStyle: CellStyle;
  component: PureComponent | undefined;
  default: PureComponent;
  active?: PureComponent;
  hover?: PureComponent;
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

  const [isOpen, setIsOpen] = useState(false);
  const [chargeId, setChargeId] = useState('1');

  const showModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleGeometry = (cell: CellConfigItem, eventType: EventType) => {
    // const newCell = { ...cell };
    // const newConfigs = [...configs];
    // if (eventType === EventType.CLICK) {
    //   newCell.component = newCell.active;
    //   newConfigs[configs.indexOf(cell)] = newCell;
    //   setConfigs(newConfigs);
    // }
    console.log('zcg', 'open');

    showModal();
  };

  const ceils: ReactNode[] = [];
  configs.forEach((cell) => {
    ceils.push(
      <Cell
        key={cell.key}
        onClick={() => handleGeometry(cell, EventType.CLICK)}
        // onMouseOut={() => handleGeometry(cell, EventType.MOUSE_OUT)}
        // onMouseEnter={() => handleGeometry(cell, EventType.MOUSE_ENTER)}
        {...cell.cellStyle}
      >
        <div
          style={{
            background: `url(${cell.component})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            ...cell.cellStyle,
          }}
        />
      </Cell>,
    );
  });

  return (
    <div>
      <ChargeDialog id={chargeId} open={isOpen} onCancel={closeModal} />
      {/* <Cell width={}>
        <EnergyFlow />
      </Cell> */}

      {ceils}
    </div>
  );
};

export default Geometry;
