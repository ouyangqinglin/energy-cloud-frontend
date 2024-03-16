import {
  deletePhotovoltaicPrice,
  getPhotovoltaicElectricityPriceList,
  getMarketDefaultPrice,
} from './service';
import { columns } from './config';
import { FormUpdateForCharging } from './FormUpdate';
import { FormReadForCharging } from './FormRead';
import type { ActionType } from '@ant-design/pro-table';
import FormTableList from '../components/FormTableList';

type SetType = 0 | 1; //0--光伏 1--储能

const PricePhotovoltaicList = (props: { actionRef?: React.Ref<ActionType>; setType: SetType }) => {
  return (
    <FormTableList
      formReadChild={FormReadForCharging}
      formUpdateChild={FormUpdateForCharging}
      columns={columns}
      request={(params) => getPhotovoltaicElectricityPriceList(params)}
      onDeleteChange={async (params) => await deletePhotovoltaicPrice(params)}
      requestDefaultPrice={getMarketDefaultPrice}
      {...props}
    />
  );
};

export default PricePhotovoltaicList;
