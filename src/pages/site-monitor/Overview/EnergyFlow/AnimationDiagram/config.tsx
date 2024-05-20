import type { ystemDiagram } from '../../EnergyFlow/type';
import { SiteTypeStrEnum } from '@/utils/dict';
export const paths = (
  electricSupply: ystemDiagram,
  energyStore: ystemDiagram,
  pv: ystemDiagram,
  chargingStation: ystemDiagram,
  load: ystemDiagram,
  siteType: string,
) => {
  switch (siteType) {
    case SiteTypeStrEnum.PV_CS:
    case SiteTypeStrEnum.PV:
      return [
        {
          id: 'electric-supply',
          path: 'M 300,158 L 155,158',
          duration: 4,
          route: electricSupply.direction === -1 ? 'in' : 'out',
          repeat: 5,
          reverse: electricSupply.direction === -1,
          hide: electricSupply?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
        {
          id: 'pv',
          duration: 4,
          route: pv.direction === -1 ? 'in' : 'out',
          repeat: 5,
          path: 'M 0,158 L 155,158',
          reverse: pv.direction === -1,
          hide: pv?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
        {
          id: 'load',
          duration: 4,
          route: load.direction === -1 || chargingStation?.direction === 1 ? 'out' : 'in',
          repeat: 5,
          path: 'M 155 158 L 155 5',
          reverse: load.direction === -1 || chargingStation?.direction === 1,
          hide: load?.direction === 0 && chargingStation?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
      ];
    case SiteTypeStrEnum.ES_CS:
    case SiteTypeStrEnum.ES:
      return [
        {
          id: 'electric-supply',
          path: 'M 300,158 L 155,158',
          duration: 4,
          route: electricSupply.direction === -1 ? 'in' : 'out',
          repeat: 5,
          reverse: electricSupply.direction === -1,
          hide: electricSupply?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
        {
          id: 'energy_store',
          duration: 4,
          route: electricSupply.direction === -1 ? 'in' : 'out',
          repeat: 5,
          path: 'M 0,158 L 155,158',
          reverse: energyStore.direction === -1,
          hide: energyStore?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
        {
          id: 'load',
          duration: 4,
          route: load.direction === -1 || chargingStation?.direction === 1 ? 'out' : 'in',
          repeat: 5,
          path: 'M 155 158 L 155 5',
          reverse: load.direction === -1 || chargingStation?.direction === 1,
          hide: load?.direction === 0 && chargingStation?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
      ];
    case SiteTypeStrEnum.CS:
      return [
        {
          id: 'electric-supply',
          path: 'M 140 60 L 140 -58',
          duration: 4,
          route: electricSupply.direction === -1 ? 'in' : 'out',
          repeat: 5,
          reverse: electricSupply.direction === -1,
          hide: electricSupply?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
        {
          id: 'charge',
          path: 'M 270 -58 L 140 -58',
          duration: 4,
          route: chargingStation.direction === 1 ? 'in' : 'out',
          repeat: 5,
          reverse: chargingStation.direction === 1,
          hide: chargingStation?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
        {
          id: 'load',
          path: 'M 10 -58 L 140 -58',
          duration: 4,
          route: load.direction === 1 ? 'in' : 'out',
          repeat: 5,
          reverse: load.direction === 1,
          hide: load?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
      ];
    default:
      return [
        {
          id: 'electric-supply',
          path: 'M 275 160 L 155 90',
          duration: 4,
          repeat: 5,
          route: electricSupply.direction === -1 ? 'in' : 'out',
          reverse: electricSupply.direction === -1,
          hide: electricSupply?.direction === 0,
          style: {
            offsetRotate: '4deg',
            height: '6px',
            borderRadius: '50%',
          },
        },
        {
          id: 'energy_store',
          path: 'M 30 160 L 155 90',
          duration: 4,
          repeat: 5,
          route: energyStore.direction === 1 ? 'in' : 'out',
          reverse: energyStore.direction === -1,
          hide: energyStore?.direction === 0,
          style: {
            offsetRotate: '4deg',
            height: '6px',
            borderRadius: '50%',
          },
        },
        {
          id: 'pv',
          path: 'M 276 18 L 155 90',
          duration: 4,
          repeat: 5,
          route: pv.direction === -1 ? 'in' : 'out',
          reverse: pv.direction === -1,
          hide: pv?.direction === 0,
          style: {
            offsetRotate: '4deg',
            height: '6px',
            borderRadius: '50%',
          },
        },
        {
          id: 'load',
          path: 'M 30 18 L 155 90',
          duration: 4,
          repeat: 5,
          route: load.direction === -1 || chargingStation.direction === 1 ? 'out' : 'in',
          reverse: load.direction === -1 || chargingStation.direction === 1,
          hide: load.direction === 0 && chargingStation.direction === 0,
          style: {
            offsetRotate: '4deg',
            height: '6px',
            borderRadius: '50%',
          },
        },
      ];
  }
};
