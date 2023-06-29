import { columns } from './config';
import type {
  CustomerInfo,
  CustomerParam,
  CustomerUpdateInfo,
  TransformCustomerUpdateInfo,
} from '../type';
import { createCustomer, getCustomer, updateCustomer } from '../service';
import { FormUpdate } from '../../components/FormUpdate';
import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { omit } from 'lodash';

export const Update = (props: FormUpdateBaseProps) => {
  const convertRequestData = async (param: { userId: number }) => {
    const res = await getCustomer(param);
    if (res) {
      const { user } = res.data;
      return {
        data: { ...user, ...{ serviceProvider: [{ orgId: user.orgId, orgName: user.orgName }] } },
      } as { data: TransformCustomerUpdateInfo };
    }
    return { data: {} } as { data: TransformCustomerUpdateInfo };
  };

  const convertUpdateParams = (params: TransformCustomerUpdateInfo): CustomerParam => {
    const orgId = params.serviceProvider?.[0]?.orgId;
    return { ...omit(params, 'serviceProvider'), ...{ orgId } } as CustomerParam;
  };

  return (
    <FormUpdate<TransformCustomerUpdateInfo, CustomerParam>
      titleCreate={`新增客户账号`}
      titleUpdate={`编辑客户账号`}
      columns={columns}
      onFinishUpdate={(params) => {
        return updateCustomer(convertUpdateParams(params));
      }}
      onFinishCreate={(params) => {
        return createCustomer(convertUpdateParams(params));
      }}
      request={convertRequestData}
      {...props}
    />
  );
};
