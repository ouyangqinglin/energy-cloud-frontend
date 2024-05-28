import {
  deletePhotovoltaicPrice,
  getPhotovoltaicElectricityPriceList,
  getMarketDefaultPrice,
  updateStatus,
} from './service';
import { columns } from './config';
import { FormUpdateForCharging } from './FormUpdate';
import { FormReadForCharging } from './FormRead';
import type { ActionType } from '@ant-design/pro-table';
import FormTableList from '../components/FormTableList';
import React from 'react';

type SetType = 0 | 1; //0--光伏 1--储能

type ElectricPriceType = {
  actionRef?: React.Ref<ActionType>;
  priceType?: string;
  inDevice?: boolean;
  setType: SetType;
  siteId?: string;
};

const PricePhotovoltaicList: React.FC<ElectricPriceType> = (props) => {
  return (
    <FormTableList
      formReadChild={FormReadForCharging}
      formUpdateChild={FormUpdateForCharging}
      columns={columns}
      onChangeStatus={updateStatus}
      request={(params) => getPhotovoltaicElectricityPriceList(params)}
      onDeleteChange={async (params) => await deletePhotovoltaicPrice(params)}
      requestDefaultPrice={getMarketDefaultPrice}
      {...props}
    />
  );
};

export default PricePhotovoltaicList;
