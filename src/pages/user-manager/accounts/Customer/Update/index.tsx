import { Columns } from './config';
import type { CustomerParam, TransformCustomerUpdateInfo } from '../type';
import { createCustomer, getCustomer, updateCustomer } from '../service';
import { FormUpdate } from '../../components/FormUpdate';
import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { omit } from 'lodash';
import { useCallback, useState } from 'react';

export const Update = (props: FormUpdateBaseProps) => {
  const [orgId, setOrgId] = useState<number>();

  const convertRequestData = async (param: { userId: number }) => {
    const res = await getCustomer(param);
    if (res) {
      const { user } = res.data;
      setOrgId(user.orgId);
      const rawFormData = omit(
        {
          ...user,
          ...{ serviceProvider: [{ orgId: user.orgId, orgName: user.orgName }] },
          ...{ roleIds: user.roles.map((it) => it.roleId) },
        },
        'password',
      ) as TransformCustomerUpdateInfo;
      return {
        data: rawFormData,
      } as { data: TransformCustomerUpdateInfo };
    }
    return { data: {} } as { data: TransformCustomerUpdateInfo };
  };

  const convertUpdateParams = (params: TransformCustomerUpdateInfo): CustomerParam => {
    const siteIds = params.sites?.map((it) => it.id) ?? [];
    return {
      ...omit(params, 'serviceProvider', 'sites'),
      ...{ orgId: params.serviceProvider?.[0]?.orgId, siteIds },
      roleIds: [params.roleId],
    } as CustomerParam;
  };

  const getConfig = useCallback(() => Columns(props.operations, orgId), [props.operations, orgId]);

  return (
    // todo: 创建的时候无法请求到角色
    <FormUpdate<TransformCustomerUpdateInfo, CustomerParam>
      titleCreate={`新增`}
      titleUpdate={`编辑`}
      columns={getConfig()}
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
