import type { DigitalFlipperItemProps } from '@/pages/screen/components/DigitalFlipper/Item';
import { formatMessage } from '@/utils';
export const DEFAULT_REQUEST_INTERVAL = 5 * 60 * 1000;

export const dataSource: DigitalFlipperItemProps[] = [
  {
    title: formatMessage({ id: 'screen.1013', defaultMessage: '绿电收益' }),
    unit: formatMessage({ id: 'common.rmb', defaultMessage: '元' }),
    floatLength: 2,
    field: 'profit',
    numStyle: {
      width: 'auto',
      fontSize: 20,
      fontWeight: 500,
      color: '#FFD15C',
      WebkitTextFillColor: 'inherit',
      backgroundImage:
        'linear-gradient(90deg, #FFFFFF 0%, #7EC2FF 100%), linear-gradient(90deg, #FFFFFF 0%, #A2D3FF 67%, #4DABFF 100%)',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
  {
    title: formatMessage({ id: 'screen.owerPvGeneration', defaultMessage: '光伏发电量' }),
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
    title: formatMessage({ id: 'screen.1014', defaultMessage: '风机发电量' }),
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
    title: formatMessage({ id: 'screen.1015', defaultMessage: '馈网电量' }),
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
    title: formatMessage({ id: 'screen.1011', defaultMessage: '光伏发电功率' }),
    unit: 'kW',
    floatLength: 2,
    field: 'realTimePowerGeneration',
    numStyle: {
      width: 'auto',
      fontSize: 20,
      fontWeight: 500,
      color: '#4DD6F0',
      WebkitTextFillColor: 'inherit',
      backgroundImage:
        'linear-gradient(90deg, #FFFFFF 0%, #7EC2FF 100%), linear-gradient(90deg, #FFFFFF 0%, #A2D3FF 67%, #4DABFF 100%);',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
  {
    title: formatMessage({ id: 'screen.1012', defaultMessage: '风机发电功率' }),
    unit: 'kW',
    floatLength: 2,
    field: 'totalStringCapacity',
    numStyle: {
      width: 'auto',
      fontWeight: 500,
      fontSize: 20,
      color: '#4DD6F0',
      backgroundImage:
        'linear-gradient(90deg, #FFFFFF 0%, #7EC2FF 100%), linear-gradient(90deg, #FFFFFF 0%, #A2D3FF 67%, #4DABFF 100%);',
      WebkitTextFillColor: 'inherit',
    },
    unitStyle: {
      color: '#ACCCEC',
      fontSize: 12,
    },
  },
];
