import { SiteTypeStrEnum } from '@/utils/enum';
import type { ystemDiagram } from '../../EnergyFlow/type';

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
          reverse: electricSupply.direction === -1,
          hide: electricSupply?.direction === 0,
          style: {
            top: '32px',
            left: '-6px',
            borderRadius: '50%',
          },
        },
        {
          id: 'pv',
          path: 'M 10,158 L 155,158',
          reverse: pv.direction === -1,
          hide: pv?.direction === 0,
          style: {
            top: '32px',
            left: '-6px',
            borderRadius: '50%',
          },
        },
        {
          id: 'load',
          path: 'M 155 5 L 155 158',
          reverse: load.direction === -1 || chargingStation?.direction === -1,
          hide: load?.direction === 0 && chargingStation?.direction === 0,
          style: {
            top: '32px',
            left: '-6px',
            borderRadius: '50%',
            offsetRotate: '0deg',
          },
        },
      ];
    case SiteTypeStrEnum.ES_CS:
    case SiteTypeStrEnum.ES:
      return [
        {
          id: 'electric-supply',
          path: 'M 300,158 L 155,158',
          reverse: electricSupply.direction === -1,
          hide: electricSupply?.direction === 0,
          style: {
            top: '32px',
            left: '-6px',
            borderRadius: '50%',
          },
        },
        {
          id: 'energy_store',
          path: 'M 10,158 L 155,158',
          reverse: energyStore.direction === -1,
          hide: energyStore?.direction === 0,
          style: {
            top: '32px',
            left: '-6px',
            borderRadius: '50%',
          },
        },
        {
          id: 'load',
          path: 'M 155 5 L 155 158',
          reverse: load.direction === -1 || chargingStation?.direction === -1,
          hide: load?.direction === 0 && chargingStation?.direction === 0,
          style: {
            top: '32px',
            left: '-6px',
            borderRadius: '50%',
            offsetRotate: '0deg',
          },
        },
      ];
    case SiteTypeStrEnum.CS:
      return [
        {
          id: 'electric-supply',
          path: 'M 140 60 L 140 -58',
          reverse: electricSupply.direction === -1,
          hide: electricSupply?.direction === 0,
          style: {
            top: '32px',
            left: '-6px',
            borderRadius: '50%',
            offsetRotate: '0deg',
          },
        },
        {
          id: 'charge',
          path: 'M 270 -58 L 140 -58',
          reverse: chargingStation.direction === -1,
          hide: chargingStation?.direction === 0,
          style: {
            top: '32px',
            left: '-6px',
            borderRadius: '50%',
          },
        },
        {
          id: 'load',
          path: 'M 10 -58 L 140 -58',
          reverse: load.direction === -1,
          hide: load?.direction === 0,
          style: {
            top: '32px',
            left: '-6px',
            borderRadius: '50%',
          },
        },
      ];
    default:
      return [
        {
          id: 'electric-supply',
          path: 'M 275 160 L 155 90',
          reverse: electricSupply.direction === -1,
          hide: electricSupply?.direction === 0,
          style: {
            offsetRotate: '4deg',
            borderRadius: '50%',
          },
        },
        {
          id: 'energy_store',
          path: 'M 30 160 L 155 90',
          reverse: energyStore.direction === -1,
          hide: energyStore?.direction === 0,
          style: {
            offsetRotate: '4deg',
            borderRadius: '50%',
          },
        },
        {
          id: 'pv',
          path: 'M 276 18 L 155 90',
          reverse: pv.direction === -1,
          hide: pv?.direction === 0,
          style: {
            offsetRotate: '4deg',
            borderRadius: '50%',
          },
        },
        {
          id: 'load',
          path: 'M 30 18 L 155 90',
          reverse: load.direction === -1 || chargingStation.direction === -1,
          hide: load.direction === 0 && chargingStation.direction === 0,
          style: {
            offsetRotate: '4deg',
            borderRadius: '50%',
          },
        },
      ];
  }
};
