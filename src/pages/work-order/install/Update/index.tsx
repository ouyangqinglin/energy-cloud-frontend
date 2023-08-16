import { Columns } from './config';
// import type { CustomerParam, TransformCustomerUpdateInfo } from '../type';
import {
  createInstallationWorkOrder,
  getInstallationWorkOrder,
  updateInstallationWorkOrder,
} from '../service';
import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import type { AnyKindOfDictionary } from 'lodash';
import { omit } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import type { InstallListType, InstallOrderUpdateParam, InstallOrderUpdateInfo } from '../type';
import { isCreate } from '@/components/YTModalForm/helper';
import { useToggle } from 'ahooks';
import type { TABLESELECTVALUETYPE } from '@/components/TableSelect';
import { FormTypeEnum } from '@/utils/dictionary';
import { SchemaFormProvider } from '@/components/SchemaForm';

export const Update = (props: FormUpdateBaseProps<InstallListType>) => {
  // const [orgId, setOrgId] = useState<number>(props?.initialValues?.siteId);
  const [modalVisible, { set }] = useToggle(false);

  const convertRequestData = (res: InstallOrderUpdateInfo) => {
    if (res) {
      const { orgId, orgName, handlerBy, handlerName, userId, userName } = res;
      // setOrgId(rawOrgId);
      return {
        ...res,
        ...{ serviceProvider: [{ orgId, orgName }] },
        ...{ handler: [{ handlerBy, handlerName }] },
        ...{ customer: [{ userId, userName }] },
      } as InstallOrderUpdateInfo;
    }
    return {} as InstallOrderUpdateInfo;
  };

  const convertUpdateParams = (params: InstallOrderUpdateInfo) => {
    const { orgId, orgName } = params.serviceProvider?.[0] ?? {};
    const { handlerBy } = params.handler?.[0] ?? {};
    const { userId, userName } = params.customer?.[0] ?? {};

    return {
      ...omit(params, 'serviceProvider', 'handler', 'customer', 'status'),
      ...{ orgId, orgName, handlerBy, userId, userName },
    } as InstallOrderUpdateParam;
  };

  const getConfig = useCallback(() => Columns(props?.operations), [props.operations]);
  return (
    <SchemaFormProvider<InstallOrderUpdateInfo, TABLESELECTVALUETYPE, InstallOrderUpdateParam>
      width="900px"
      id={props.id}
      type={isCreate(props.operations) ? FormTypeEnum.Add : FormTypeEnum.Edit}
      columns={getConfig()}
      open={props.visible}
      onOpenChange={props.onVisibleChange}
      addData={createInstallationWorkOrder}
      editData={updateInstallationWorkOrder}
      getData={getInstallationWorkOrder}
      beforeSubmit={convertUpdateParams}
      afterRequest={convertRequestData}
      // extraData={{ siteId }}
      onSuccess={props?.onSuccess}
      grid={true}
      colProps={{
        span: 8,
      }}
      initialValues={props?.initialValues}
    />
  );
};
