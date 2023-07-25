import { Columns } from './config';
import type { ServiceParam, ServiceUpdateInfo } from '../type';
import { createService, getService, getServiceId, updateService } from '../service';
import { FormUpdate } from '../components/FormUpdate';
import type { FormUpdateBaseProps } from '../components/FormUpdate/type';
import { useCallback, useEffect, useState } from 'react';
import { isCreate } from '@/components/YTModalForm/helper';

export const Update = (props: FormUpdateBaseProps) => {
  const [orgId, setOrgId] = useState<number>();

  const convertRequestData = async (param: { orgId: number }) => {
    const res = await getService(param);
    if (res) {
      const { orgId: rawOrgId } = res.data;
      setOrgId(rawOrgId);
    }
    return res;
  };

  useEffect(() => {
    if (props.visible && isCreate(props.operations)) {
      getServiceId()?.then(({ data }) => {
        setOrgId(data);
      });
    }
  }, [props.visible]);

  const getConfig = useCallback(() => Columns(props.operations, orgId), [props.operations, orgId]);

  return (
    <FormUpdate<ServiceUpdateInfo, ServiceParam>
      titleCreate={`新建`}
      titleUpdate={`编辑`}
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
