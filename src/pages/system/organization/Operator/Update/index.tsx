import { Columns } from './config';
import type { ServiceParam, ServiceUpdateInfo } from '../type';
import { createService, getService, getServiceId, updateService } from '../service';
import { useCallback, useEffect, useState } from 'react';
import { isCreate } from '@/components/YTModalForm/helper';
import { set, unset } from 'lodash';
import type { PositionSelectType } from '@/components/PositionSelect';
import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { FormUpdate } from '../../components/FormUpdate';
import { formatMessage } from '@/utils';

export const Update = (props: FormUpdateBaseProps) => {
  const [orgId, setOrgId] = useState<number>();

  const convertRequestData = async (param: { orgId: number }) => {
    const res = await getService(param);
    if (res?.data) {
      const { address, longitude, latitude, orgId: rawOrgId } = res.data;

      const addressInfo: PositionSelectType = {
        address,
        point: {
          lng: longitude,
          lat: latitude,
        } as unknown,
      };
      set(res.data, 'addressInfo', addressInfo);

      setOrgId(rawOrgId);
    }
    return res;
  };

  const convertUpdateData = (inputInfo: ServiceUpdateInfo): ServiceParam => {
    const params: ServiceParam = {
      ...inputInfo,
      ...{
        orgEfIds: inputInfo.orgEfs?.map(({ orgId: id }) => id) as number[],
      },
    };
    params.address = inputInfo.addressInfo.address ?? '';
    params.longitude = inputInfo.addressInfo?.point?.lng;
    params.latitude = inputInfo.addressInfo?.point?.lat;
    unset(params, 'addressInfo');
    unset(params, 'orgEfs');
    return params;
  };

  useEffect(() => {
    if (props.visible && isCreate(props.operations)) {
      getServiceId()?.then(({ data }) => {
        setOrgId(data);
      });
    }
  }, [props.visible]);

  const getConfig = useCallback(() => Columns(orgId), [orgId]);
  return (
    <FormUpdate<ServiceUpdateInfo, ServiceParam>
      titleCreate={formatMessage({ id: 'common.newBuilt', defaultMessage: '新建' })}
      titleUpdate={formatMessage({ id: 'common.edit', defaultMessage: '编辑' })}
      columns={getConfig()}
      onFinishUpdate={(params) => {
        return updateService(convertUpdateData(params));
      }}
      orgId={orgId}
      onFinishCreate={(params) => {
        return createService(convertUpdateData(params));
      }}
      request={convertRequestData}
      {...props}
    />
  );
};
