import type { ystemDiagram } from '../../EnergyFlow/type';
import { SiteTypeEnum } from '@/utils/dict';
export const paths = (
  electricSupply: ystemDiagram,
  energyStore: ystemDiagram,
  pv: ystemDiagram,
  chargingStation: ystemDiagram,
  load: ystemDiagram,
  siteType: string,
) => {
  switch (siteType) {
    case String(SiteTypeEnum.ES_CS):
    case String(SiteTypeEnum.PV_CS):
    case String(SiteTypeEnum.PV):
      return [
        {
          id: 'electric-supply',
          path: 'M300.885,158.116 L185.273,158.120 C172.018,158.116 161.273,147.371 161.273,134.116 L161.273,0 L161.273,0',
          duration: 3,
          delay: 0,
          repeat: 5,
          reverse: electricSupply.direction === -1,
          hide: electricSupply?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
        {
          id: 'energy_store',
          duration: 3,
          delay: 1,
          repeat: 5,
          path: 'M7.613,158.394 L116.885,158.395 C130.140,158.394 140.885,147.649 140.885,134.394 L140.885,0.116 L140.885,0.116',
          reverse: energyStore.direction === -1,
          hide: energyStore?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
      ];
    case String(SiteTypeEnum.ES):
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
          route: electricSupply.direction === -1 ? 'out' : 'in',
          repeat: 5,
          path: 'M 155 158 L 155 5',
          reverse: load.direction === -1,
          hide: load?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
      ];
    case String(SiteTypeEnum.CS):
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
          path: 'm61.275 21.471 224.849 152.183',
          duration: 3,
          delay: 0,
          repeat: 5,
          reverse: electricSupply.direction === 1,
          hide: electricSupply?.direction === 0,
          style: {},
        },
        {
          id: 'energy_store',
          duration: 3,
          delay: 1,
          repeat: 1,
          path: 'M61.273 21.47c22.689 40.195 26.086 75.704 10.192 106.528C55.571 158.822 31.749 177.666 0 184.528',
          reverse: energyStore.direction === 1,
          hide: energyStore?.direction === 0,
          style: {},
        },
        {
          id: 'pv',
          duration: 3,
          delay: 2,
          repeat: 1,
          path: 'M61.275 21.47C93.922 33.898 131.719 38.4 174.663 34.978 217.607 31.555 252.041 19.896 277.965 0',
          reverse: pv.direction === 1,
          hide: pv?.direction === 0,
          style: {},
        },
      ];
  }
};
