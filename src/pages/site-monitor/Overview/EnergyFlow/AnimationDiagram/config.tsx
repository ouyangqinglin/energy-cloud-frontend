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
    case '23':
    case '13':
    case '1':
    case '2':
      return [
        {
          id: 'electric-supply',
          path: 'M300.885,158.116 L185.273,158.120 C172.018,158.116 161.273,147.371 161.273,134.116 L161.273,0 L161.273,0',
          duration: 3,
          delay: 0,
          repeat: 5,
          reverse: electricSupply.direction === 1,
          hide: electricSupply?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
        {
          id: 'energy_store',
          duration: 3,
          delay: 1,
          repeat: 5,
          path: 'M7.613,158.394 L116.885,158.395 C130.140,158.394 140.885,147.649 140.885,134.394 L140.885,0.116 L140.885,0.116',
          reverse: energyStore.direction === 1,
          hide: energyStore?.direction === 0,
          style: { top: '32px', left: '-6px' },
        },
      ];
    case '3':
      return [
        {
          id: 'electric-supply',
          path: 'M0,0 L100,0 C113.807119,-2.53632657e-15 125,11.1928813 125,25 L125,124 L125,124',
          duration: 3,
          delay: 0,
          repeat: 5,
          reverse: chargingStation.direction === 1,
          hide: chargingStation?.direction === 0,
          style: { top: '-25px', left: '0' },
        },
        {
          id: 'energy_store',
          duration: 3,
          delay: 1,
          repeat: 5,
          path: 'M269,0 L169.853059,0 C156.04594,2.53632657e-15 144.853059,11.1928813 144.853059,25 L144.853059,124 L144.853059,124',
          reverse: load.direction === 1,
          hide: load?.direction === 0,
          style: { top: '-25px', left: '0' },
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
