import { Columns } from './config';
// import type { CustomerParam, TransformCustomerUpdateInfo } from '../type';
import {
  createMaintenanceWorkOrder,
  getMaintenanceWorkOrder,
  updateMaintenanceWorkOrder,
} from '../service';
import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import type { AnyKindOfDictionary } from 'lodash';
import { omit } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import type {
  MaintenanceOrderUpdateParam,
  MaintenanceOrderUpdateInfo,
  SiteInfo,
  MaintenanceListType,
} from '../type';
import SelectSiteModal from '../SelectSite';
import { FormTypeEnum, SchemaFormProvider } from '@/components/SchemaForm';
import { isCreate } from '@/components/YTModalForm/helper';
import { useToggle } from 'ahooks';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';

export const MaintenanceUpdate = (
  props: FormUpdateBaseProps<MaintenanceListType> & { siteId: number },
) => {
  const convertRequestData = (res: MaintenanceOrderUpdateInfo) => {
    if (res) {
      const { orgId, orgName, handlerBy, handlerName, userId, userName } = res;
      // setOrgId(rawOrgId);
      return {
        ...res,
        ...{ serviceProvider: [{ orgId, orgName }] },
        ...{ handler: [{ handlerBy, handlerName }] },
        ...{ customer: [{ userId, userName }] },
      } as MaintenanceOrderUpdateInfo;
    }
    return {} as MaintenanceOrderUpdateInfo;
  };

  const convertUpdateParams = (params: MaintenanceOrderUpdateInfo) => {
    const { orgId, orgName } = params.serviceProvider?.[0] ?? {};
    const { handlerBy } = params.handler?.[0] ?? {};
    const { userId, userName } = params.customer?.[0] ?? {};

    return {
      ...omit(params, 'serviceProvider', 'handler', 'customer', 'status'),
      ...{ orgId, orgName, handlerBy, userId, userName },
    } as MaintenanceOrderUpdateParam;
  };

  const getConfig = useCallback(
    () => Columns(props?.operations, props.siteId),
    [props.operations, props.siteId],
  );

  return (
    <SchemaFormProvider<
      MaintenanceOrderUpdateInfo,
      TABLESELECTVALUETYPE,
      MaintenanceOrderUpdateParam
    >
      width="900px"
      id={props.id}
      type={isCreate(props.operations) ? FormTypeEnum.Add : FormTypeEnum.Edit}
      columns={getConfig()}
      open={props.visible}
      onOpenChange={props.onVisibleChange}
      addData={createMaintenanceWorkOrder}
      editData={updateMaintenanceWorkOrder}
      getData={getMaintenanceWorkOrder}
      beforeSubmit={convertUpdateParams}
      afterRequest={convertRequestData}
      extraData={{ siteId: props.siteId }}
      onSuccess={props?.onSuccess}
      grid={true}
      colProps={{
        span: 8,
      }}
      initialValues={props?.initialValues}
    />
  );
};
