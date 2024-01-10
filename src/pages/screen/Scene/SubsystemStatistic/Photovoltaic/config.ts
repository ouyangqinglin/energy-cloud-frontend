import type { DigitalFlipperItemProps } from '@/pages/screen/components/DigitalFlipper/Item';
import { formatMessage } from '@/utils';
export const DEFAULT_REQUEST_INTERVAL = 5 * 60 * 1000;

export const dataSource: DigitalFlipperItemProps[] = [
  {
    title: formatMessage({ id: 'device.pvRevenue', defaultMessage: '光伏收益' }),
    unit: formatMessage({ id: 'common.rmb', defaultMessage: '元' }),
    floatLength: 2,
    field: 'profit',
    numStyle: {
      width: 'auto',
      fontSize: 20,
      fontWeight: 500,
      color: '#FFE04D',
      backgroundImage:
        'linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 221, 155) 82%, rgb(255, 195, 79) 100%)',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
  {
    title: formatMessage({ id: 'screen.generatingCapacity', defaultMessage: '发电量' }),
    unit: 'kWh',
    floatLength: 2,
    field: 'charge',
    numStyle: {
      width: 'auto',
      fontWeight: 500,
      fontSize: 20,
      color: '#4DD6F0',
      background: 'none',
      WebkitTextFillColor: 'inherit',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
  {
    title: formatMessage({
      id: 'siteMonitor.SelfGeneratedElectriConsumption',
      defaultMessage: '自发自用电量',
    }),
    floatLength: 2,
    field: 'selfUse',
    unit: 'kWh',
    numStyle: {
      width: 'auto',
      fontWeight: 500,
      fontSize: 20,
      color: '#4DD6F0',
      background: 'none',
      WebkitTextFillColor: 'inherit',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
  {
    title: formatMessage({ id: 'screen.onGridPower', defaultMessage: '上网电量' }),
    unit: 'kWh',
    floatLength: 2,
    field: 'disCharge',
    numStyle: {
      width: 'auto',
      fontWeight: 500,
      fontSize: 20,
      color: '#4DD6F0',
      background: 'none',
      WebkitTextFillColor: 'inherit',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
];

export const dataSourceRealTime: DigitalFlipperItemProps[] = [
  {
    title: formatMessage({ id: 'screen.timeGeneratingCapacity', defaultMessage: '实时发电功率' }),
    unit: 'kW',
    floatLength: 2,
    field: 'realTimePowerGeneration',
    numStyle: {
      width: 'auto',
      fontSize: 20,
      fontWeight: 500,
      color: '#FFE04D',
      backgroundImage:
        'linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 221, 155) 82%, rgb(255, 195, 79) 100%)',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
  {
    title: formatMessage({ id: 'screen.totalStringCapacity', defaultMessage: '组串总容量' }),
    unit: 'kWp',
    floatLength: 2,
    field: 'totalStringCapacity',
    numStyle: {
      width: 'auto',
      fontWeight: 500,
      fontSize: 20,
      color: '#4DD6F0',
      background: 'none',
      WebkitTextFillColor: 'inherit',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
];
