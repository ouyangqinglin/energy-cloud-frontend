import { useCallback } from 'react';
import { deleteMarketPrice, getMarketElectricityPriceList } from './service';
import { columns } from './config';
import { FormUpdateForMarket } from './FormUpdate';
import { FormReadForMarket } from './FormRead';
import type { ActionType } from '@ant-design/pro-table';
import FormTableList from '../components/FormTableList';

const PriceMarketList = (props: { actionRef?: React.Ref<ActionType> }) => {
  const request = useCallback((params) => {
    return getMarketElectricityPriceList({ ...params });
  }, []);

  return (
    <FormTableList
      formReadChild={FormReadForMarket}
      formUpdateChild={FormUpdateForMarket}
      columns={columns}
      request={request}
      onDeleteChange={async (params) => await deleteMarketPrice(params)}
      {...props}
    />
  );
};

export default PriceMarketList;
