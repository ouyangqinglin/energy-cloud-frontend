import { Columns } from './config';
// import type { CustomerParam, TransformCustomerUpdateInfo } from '../type';
import {
  createInstallationWorkOrder,
  getInstallationWorkOrder,
  updateInstallationWorkOrder,
} from '../service';
import { FormUpdate } from '../../components/FormUpdate';
import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { omit } from 'lodash';
import { useCallback, useState } from 'react';
import { InstallOrderUpdateParam } from '../type';

export const Update = (props: FormUpdateBaseProps) => {
  const [orgId, setOrgId] = useState<number>(0);

  // const convertRequestData = async (param: { userId: number }) => {
  //   const res = await getCustomer(param);
  //   if (res) {
  //     const { user } = res.data;
  //     setOrgId(user.orgId);
  //     const rawFormData = omit(
  //       {
  //         ...user,
  //         ...{ serviceProvider: [{ orgId: user.orgId, orgName: user.orgName }] },
  //         ...{ roleIds: user.roles.map((it) => it.roleId) },
  //       },
  //       'password',
  //     ) as TransformCustomerUpdateInfo;
  //     return {
  //       data: rawFormData,
  //     };
  //   }
  //   return { data: {} as TransformCustomerUpdateInfo };
  // };

  // const convertUpdateParams = (params: TransformCustomerUpdateInfo): CustomerParam => {
  //   const siteIds = params.sites?.map((it) => it.id) ?? [];
  //   return {
  //     ...omit(params, 'serviceProvider', 'sites'),
  //     ...{ orgId: params.serviceProvider?.[0]?.orgId, siteIds },
  //     roleIds: [params.roleId],
  //   } as CustomerParam;
  // };

  const getConfig = useCallback(() => Columns(props?.operations, orgId), [props.operations, orgId]);

  return (
    <FormUpdate<any, InstallOrderUpdateParam>
      titleCreate={`创建安装工单`}
      titleUpdate={`编辑安装工单`}
      columns={getConfig()}
      onFinishUpdate={(params) => {
        return updateInstallationWorkOrder(params);
      }}
      onFinishCreate={(params) => {
        return createInstallationWorkOrder(params);
      }}
      request={(params) => getInstallationWorkOrder(params)}
      {...props}
    />
  );
};
