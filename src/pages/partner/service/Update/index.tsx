import { Columns } from './config';
import type { ServiceParam, ServiceUpdateInfo } from '../type';
import { createService, getService, updateService } from '../service';
import { FormUpdate } from '../components/FormUpdate';
import type { FormUpdateBaseProps } from '../components/FormUpdate/type';
import { useCallback, useState } from 'react';

export const Update = (props: FormUpdateBaseProps) => {
  const [orgId, setOrgId] = useState<number>();

  const convertRequestData = async (param: { orgId: number }) => {
    const res = await getService(param);
    if (res) {
      const { orgId: rawOrgId } = res.data;
      setOrgId(rawOrgId);
      return res;
    }
    return { data: {} };
  };

  const getConfig = useCallback(() => Columns(props.operations, orgId), [props.operations, orgId]);

  return (
    <FormUpdate<ServiceUpdateInfo, ServiceParam>
      titleCreate={`新增客户账号`}
      titleUpdate={`编辑客户账号`}
      columns={getConfig()}
      onFinishUpdate={(params) => {
        return updateService(params);
      }}
      onFinishCreate={(params) => {
        return createService(params);
      }}
      request={convertRequestData}
      {...props}
    />
  );
};
