import { useCallback } from 'react';
import { deleteMarketPrice, getMarketElectricityPriceList } from './service';
import { columns } from './config';
import type { ActionType } from '@ant-design/pro-table';
import FormTableList from '../components/FormTableList';

const ElectricityStatistic = (props: { actionRef?: React.Ref<ActionType> }) => {
  const request = useCallback((params) => {
    return getMarketElectricityPriceList({ ...params });
  }, []);

  return <FormTableList columns={columns} request={request} {...props} />;
};

export default ElectricityStatistic;
