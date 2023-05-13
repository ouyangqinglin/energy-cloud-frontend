import type { DigitalFlipperItemProps } from '../../DigitalFlipper/Item';

export const DEFAULT_REQUEST_INTERVAL = 5 * 60 * 1000;

export const digitalFlipperItemConfig: {
  powerGeneration: DigitalFlipperItemProps;
  profit: DigitalFlipperItemProps;
} = {
  powerGeneration: {
    title: '发电量',
    unit: 'kWh',
    num: '--',
    titleStyle: {
      fontWeight: 400,
      fontSize: '14px',
      color: '#D0DEEE',
    },
    unitStyle: {
      fontSize: '12px',
      color: '#28F0EE',
    },
    numStyle: {
      backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, #28F0EE 100%), linear-gradient(180deg, #FFFFFF 0%, rgba(40, 240, 238, 0.6) 67%, #28F0EE 100%)`,
      fontSize: '16px',
      color: '#28F0EE',
      height: 'auto',
      lineHeight: 'inherit',
      fontFamily: 'DIN-Bold, DIN',
      fontWeight: 'bold',
    },
  },
  profit: {
    title: '收益',
    num: '--',
    titleStyle: {
      fontWeight: 400,
      fontSize: '14px',
      color: '#D0DEEE',
    },
    unitStyle: {
      fontSize: '12px',
      color: '#FFE04D',
    },
    numStyle: {
      backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, #FFE04D 100%), linear-gradient(180deg, #FFFFFF 0%, rgba(255, 224, 77, 0.6) 67%, #FFE04D 100%)`,
      fontSize: '16px',
      height: 'auto',
      lineHeight: 'inherit',
      color: '#FFE04D',
      fontFamily: 'DIN-Bold, DIN',
      fontWeight: 'bold',
    },
  },
};
