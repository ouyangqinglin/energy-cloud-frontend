import { Columns } from './config';
import type { CustomerParam, TransformCustomerUpdateInfo } from '../type';
import { createCustomer, getCustomer, updateCustomer } from '../service';
import { FormUpdate } from '../../components/FormUpdate';
import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { omit } from 'lodash';
import { useCallback, useState } from 'react';

export const Update = (props: FormUpdateBaseProps) => {
  const convertRequestData = async (param: { userId: number }) => {
    const res = await getCustomer(param);
    if (res) {
      const { user, roles } = res.data;
      const rawFormData = omit(
        {
          ...user,
          ...{
            roleIds: user.roles.map((it) => it.roleId),
            rolesMap: roles?.map(({ roleId, roleName }) => ({ label: roleName, value: roleId })),
          },
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
    return {
      ...omit(params, 'serviceProvider', 'sites'),
    } as CustomerParam;
  };

  const getConfig = useCallback(() => Columns(props.operations), [props.operations]);

  return (
    <FormUpdate<TransformCustomerUpdateInfo, CustomerParam>
      titleCreate={`新增账号`}
      titleUpdate={`编辑账号`}
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
