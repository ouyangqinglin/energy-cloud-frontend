import { ReactComponent as Cafe } from '@/assets/image/screen/cafe.svg';
import { ReactComponent as HomeEnergyStorage } from '@/assets/image/screen/home_energy_storage.svg';

export const CellList = [
  {
    key: 'Cafe',
    cellStyle: {
      width: 208,
      height: 130,
      left: 991,
      top: 745,
    },
    component: Cafe,
    default: Cafe,
    hover: Cafe,
    active: HomeEnergyStorage,
  },
  {
    key: 'HomeEnergyStorage',
    cellStyle: {
      width: 212,
      height: 150,
      left: 850,
      top: 808,
    },
    component: HomeEnergyStorage,
    default: HomeEnergyStorage,
    hover: HomeEnergyStorage,
    active: HomeEnergyStorage,
  },
];
