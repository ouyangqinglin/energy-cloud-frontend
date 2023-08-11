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
import type { InstallOrderUpdateParam, InstallOrderUpdateInfo } from '../type';

export const Update = (props: FormUpdateBaseProps) => {
  const [orgId, setOrgId] = useState<number>(0);

  const convertRequestData = async (param: { id: number }) => {
    const res = await getInstallationWorkOrder(param);
    if (res) {
      const { service, orgId: rawOrgId, handlerBy, handlerName } = res.data;
      setOrgId(rawOrgId);
      return {
        data: {
          ...res.data,
          ...{ serviceProvider: [{ orgId: rawOrgId, orgName: service }] },
          ...{ handler: [{ handlerBy, handlerName }] },
        } as InstallOrderUpdateInfo,
      };
    }
    return { data: {} as InstallOrderUpdateInfo };
  };

  const convertUpdateParams = (params: InstallOrderUpdateInfo): InstallOrderUpdateParam => {
    const { orgId: rawOrgId, orgName: service } = params.serviceProvider?.[0] ?? {};
    const { handlerBy } = params.handler?.[0] ?? {};

    return {
      ...omit(params, 'serviceProvider', 'handler'),
      ...{ orgId: rawOrgId, service, handlerBy, userId: props.id },
    } as InstallOrderUpdateParam;
  };

  const getConfig = useCallback(() => Columns(props?.operations, orgId), [props.operations, orgId]);

  return (
    <FormUpdate<any, InstallOrderUpdateParam>
      titleCreate={`创建安装工单`}
      titleUpdate={`编辑安装工单`}
      columns={getConfig()}
      onFinishUpdate={(params) => {
        return updateInstallationWorkOrder(convertUpdateParams(params));
      }}
      onFinishCreate={(params) => {
        return createInstallationWorkOrder(convertUpdateParams(params));
      }}
      request={(params) => convertRequestData(params)}
      {...props}
    />
  );
};
