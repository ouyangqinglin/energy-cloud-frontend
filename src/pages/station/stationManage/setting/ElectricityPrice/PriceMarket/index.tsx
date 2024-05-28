import React, { useCallback, useMemo } from 'react';
import {
  deleteMarketPrice,
  getMarketElectricityPriceList,
  getMarketDefaultPrice,
  updateStatus,
} from './service';
import { columns } from './config';
import { FormUpdateForMarket } from './FormUpdate';
import { FormReadForMarket } from './FormRead';
import type { ActionType } from '@ant-design/pro-table';
import FormTableList from '../components/FormTableList';

type ElectricPriceType = {
  actionRef?: React.Ref<ActionType>;
  priceType?: string;
  inDevice?: boolean;
  siteId?: string;
};

const PriceMarketList: React.FC<ElectricPriceType> = (props) => {
  const request = useCallback((params) => {
    return getMarketElectricityPriceList({ ...params });
  }, []);

  return (
    <FormTableList
      formReadChild={FormReadForMarket}
      formUpdateChild={FormUpdateForMarket}
      onChangeStatus={updateStatus}
      columns={columns}
      request={request}
      onDeleteChange={async (params) => await deleteMarketPrice(params)}
      requestDefaultPrice={getMarketDefaultPrice}
      {...props}
    />
  );
};

export default PriceMarketList;
